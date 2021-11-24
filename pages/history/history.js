// pages/history/history.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:false,
      History:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userid=wx.getStorageSync('openId');
    wx.request({
      url: app.globalData.url+'/wx/getHistory',
      method:"GET",
      header:{"Content-Type":"application/json"},
      data:{
        userid:userid
      },
      success:res=>{
        let list=  res.data.map((value,index)=>{
          return value[0];
      })
        that.setData({
          History:list
        })
        console.log(that.data.History)
      }
    })
  },
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
  },
  navigate(e){
    wx.navigateTo({
      url: `/pages/Content/Content?newsid=${e.currentTarget.id}`,
    })
  }
})