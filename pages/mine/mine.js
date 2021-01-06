// pages/mine/mine.js
const app =getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName:'',
    avatarUrl:'',
    mine_collection:[],
    bgc:'',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  getUserInfo: function(e) {
    console.log('gafasf');
    
    console.log(e)
    var that=this
    app.globalData.userInfo = e.detail.userInfo
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: res => {
        console.log(res);
        wx.request({
          url: app.globalData.url+"/wx/onLogin", //set in config .js  //2.后台API
          method: "POST",
          data: {
            js_code: res.code,
          }, success(res) {
            var openId = res.data.openid
          console.log(res)
          wx.setStorage({
            data: openId,
            key: 'openId',
          })
          wx.getSetting({
            success:res=>{
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: res=> {
                    console.log(res.userInfo)
                    that.setData({
                        nickName:res.userInfo.nickName,
                        avatarUrl:res.userInfo.avatarUrl,
                        show:true
                    })
                  }
                })
              }
            }
          }) 
          }
        })
      }
    })
  },

  theme(){
    wx.navigateTo({
      url: '/pages/Theme/Theme',
    })
  },
  settings(){
    if(this.data.show==false){
      Notify({ type: 'danger', message: '请先登录' });
    }
    else{
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }
  },
  collection(){
    if(this.data.show==false){
      Notify({ type: 'danger', message: '请先登录' });
    }
    else{
      wx.navigateTo({
        url: '/pages/Collection/Collection',
      })
    }
 
  },
  history(){
    if(this.data.show==false){
      Notify({ type: 'danger', message: '请先登录' });
    }
    else{
      wx.navigateTo({
        url: '/pages/history/history',
      })
    }
  },
  onShow(){

    wx.getStorage({
      key: 'bgc',
      success:res=>{
        console.log(res.data);
      wx.setNavigationBarColor({
                frontColor: '#ffffff', // 必写项
                backgroundColor: `${res.data}`, // 传递的颜色值
                animation: { // 可选项，加上这项会有个显示的动画效果
                 duration: 1500,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
  },
  onHide(){
    this.getUserInfo()
  }
})