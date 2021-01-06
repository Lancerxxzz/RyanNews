// pages/Theme/Theme.js
const app=getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    ColorList: app.globalData.ColorList,
    backgroundColor:'',
    color: "#fadbd9",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeBackgroungcolor:function(e){
    const id = e.currentTarget.dataset.index;
    this.setData({
      backgroundColor: app.globalData.ColorList[id].color
    })
    Notify({  color: '#fff', message: '换肤成功' ,background: `${this.data.backgroundColor}`,duration: 1000,});
    console.log(id)
    wx.setStorage({
      data: this.data.backgroundColor,
      key: 'bgc',
    })
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
                 duration: 1000,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
  }

})