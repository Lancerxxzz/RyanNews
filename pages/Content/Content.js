// pages/Content/Content.js
const app =getApp()

import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    NewsList:'',
    show:false,
    loading: true,
    plNum:'',
    bgc:'#8dc63f',
    pinglunList:'',
    num:'',
    message :'',
    show1:false,
    code:'',
    userInfo:'',
    Userid:'',
    newsid:'',
    nodes:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    wx.showLoading({
      title: '正在努力加载中...',
      mask:true
    })
    that.setData({
      newsid:option.newsid,
      Userid:wx.getStorageSync('openId')
    });

      wx.request({
        url: app.globalData.url+'/wx/NewsContent',
        method:'GET',
        header:{"Content-Type":"application/json"},
        data:{
          newsid:that.data.newsid
        },
        success:res=>{
          var Num=res.data[1].length;
          var h5text=res.data[0][0].content.replace(/\<img/gi, '<img class="img"')
          that.setData({
          NewsList:res.data[0][0],
          nodes:h5text,
           pinglunList:res.data[1],
           plNum:`评论区(${Num}条评论)`
          })
          wx.hideLoading({})
        }
       
    })
  },

  good(){
    if(this.data.Userid!=''){
    wx.request({
      url: app.globalData.url+'/wx/feelgood',
      method:"POST",
      data:{
        newsid:this.data.newsid
      },
      header:{"Content-Type":"application/x-www-form-urlencoded"},
      success:res=>{
        console.log(res.data); 
        Notify({ type: 'success', message: '真不错鸭' });
        this.setData({
          NewsList:res.data
        })
      }
    })
  }
  else{
    Notify({ type: 'danger', message: '请先登录再点赞' });
  }
  },

  talk(){
    console.log("talk");
    this.setData({
      show:true
    })
    if(this.data.Userid==''){
      Notify({ type: 'danger', message: '请先登录再进行评论' });
    }
  },
  onClose(){
    if(this.data.show==true&&this.data.show1==true){
      this.setData({
        show1:false
      })
    }
    else{
      this.setData({
        show:false
      })
    }
  },
  submit(){
    if(this.data.Userid!=''){
      this.setData({
        show1:true
      })
    }else{
      Notify({ type: 'danger', message: '请先登录' });
    }
  },
  submitcomment(){
    var that=this;
    if(that.data.message==''||that.data.Userid==''){
      Notify({ type: 'danger', message: '请先登录或评论内容不能为空' });
    }
    else{
      that.setData({
        userInfo:wx.getStorageSync('userInfo')
      })
      wx.request({
        url: app.globalData.url+'/wx/submitComment',
        method:'POST',
        data:{
            nickname:that.data.userInfo.nickName,
            avatarUrl:that.data.userInfo.avatarUrl,
            newsid:that.data.newsid,
            content:that.data.message,
            userid:wx.getStorageSync('openId')
        },
        header:{"Content-Type":"application/x-www-form-urlencoded"},
        success:res=>{
          Notify({ type: 'success', message: '发表评论成功' });
          that.setData({
              show1:false,
              pinglunList:res.data,
              message:'',
              plNum:`评论区(${res.data.length}条评论)`
          })
        }
      })
    }
  },

  colleciton(){
    var that=this;
    if(that.data.Userid==''){
      Notify({ type: 'danger', message: '请先登录后再收藏' });
    }else{
      wx.request({
        url: app.globalData.url+'/wx/collection',
        method:"POST",
        data:{
          newsid:that.data.newsid,
          userid:that.data.Userid
        },
        header:{"Content-Type":"application/x-www-form-urlencoded"},
        success:res=>{
            console.log(res);
            if(res.data!=""){
              Notify({ type: 'success', message: '收藏成功' });
            }else{
              Notify({ type: 'warning', message: '已收藏勿重复收藏' });
            }
        }
      })
   }
  },

  share(){
    if(this.data.Userid==''){
      Notify({ type: 'danger', message: '请先登录' });
    }else{
    console.log("share");
    wx.showShareMenu({
      withShareTicket: true,
      menus:['shareAppMessage', 'shareTimeline'],
      success(){
        Notify({ type: 'success', message: '转发成功' });
      }
    })
    }
  },
  onReady() {
    this.setData({
      loading: false,
    });
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
                 duration: 2000,
                 timingFunc: 'easeIn'
                }
              })
      
      }
    })
  }
})
