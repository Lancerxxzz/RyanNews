//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
   userInfo:'',
   show:false
  },
  onLoad: function () {
    wx.getSetting({
      success:res=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res=> {
              //console.log(res.userInfo)
              this.setData({
                userInfo:res.userInfo
              })
              console.log(this.data.userInfo);
            }
          })
        }
      }
    }) 
  },
  onShow(){
    wx.getStorage({
      key: 'bgc',
      success:res=>{
        console.log(res.data); 
      wx.setNavigationBarColor({
                frontColor: '#ffffff', 
                backgroundColor: `${res.data}`, 
                animation: { 
                 duration: 2000,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
  },
  change() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
})
