// pages/history/history.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:false,
      History:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'bgc',
      success:res=>{
        console.log(res.data);
      wx.setNavigationBarColor({
                frontColor: '#ffffff', // 必写项
                backgroundColor: `${res.data}`, // 传递的颜色值
                animation: { // 可选项，加上这项会有个显示的动画效果
                 duration: 2000,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
    var that=this
    wx.getStorage({
      key: 'openId',
      success:res=>{
        console.log(res.data);
        var userid=res.data
        wx.request({
          url: app.globalData.url+'/wx/getHistory',
          method:"GET",
          header:{"Content-Type":"application/json"},
          data:{
            userid:userid
          },
          success:res=>{
            console.log(res.data);
            that.setData({
              History:res.data
            })
          }
        })
      }
    })
    
  },
  navigate(e){
    console.log(e.currentTarget.id);
    console.log(e);
    wx.navigateTo({
      url: '/pages/Content/Content',
      success:res=>{
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: `${e.currentTarget.id}` })
      }
    })
  }
})