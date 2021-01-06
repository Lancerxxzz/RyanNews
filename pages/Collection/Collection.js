// pages/Collection/Collection.js
const app =getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine_collection:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datashow()
  
  },
  datashow(){
    wx.getStorage({
      key: 'openId',
      success:res=>{
        wx.request({
          url: app.globalData.url+'/wx/mine',
          method:"GET",
          data:{
            userid:res.data
          },
          header:{"Content-Type":"application/json"},
          success:res=>{
            console.log(res.data);
            this.setData({
              mine_collection:res.data
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },



    add(){
      wx.switchTab({
        url: '/pages/Find/Find',
      })
  }, 
  onClose(event) {
    console.log(event);
    
    const { position, instance } = event.detail;
    console.log(event.detail);
    
    console.log(event.currentTarget.id);
    switch (position) {
      case 'right':
        wx.request({
          url: app.globalData.url+'/wx/cancelCollection',
          method:"GET",
          header:{"Content-Type":"application/json"},
          data:{
            newsid:event.currentTarget.id
          },
          success:res=>{
            console.log(res.data);
            this.setData({
              mine_collection:res.data
            })
            Notify({ type: 'success', message: '成功取消收藏' });
          }
        })
        instance.close();
        break;
      case 'left':
      case 'cell':
        instance.close();
        break;
    }
  },

onShow(){
  this.datashow()
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
navigator(e){
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