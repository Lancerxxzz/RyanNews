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
              //console.log(this.data.userInfo);
            }
          })
        }
      }
    }) 

    wx.showLoading({
      title: '正在努力加载中...',
      mask:true
    })
    var that=this
    //console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log("新闻id:"+data.data)
      that.setData({
        newsid:data.data
      })
      wx.request({
        url: app.globalData.url+'/wx/NewsContent',
        method:'GET',
        header:{"Content-Type":"application/json"},
        data:{
          newsid:that.data.newsid
        },
        success:res=>{
          console.log(res.data);
          var Num=res.data[1].length;
         // console.log(res.data[0][0].content);
          var h5text=res.data[0][0].content.replace(/\<img/gi, '<img class="img"')
          that.setData({
          NewsList:res.data[0],
          nodes:h5text,
           pinglunList:res.data[1],
           plNum:`评论区(${Num}条评论)`
          })
          wx.hideLoading({})
        }
       
      })
    })
  },

  good(){
    if(this.data.userInfo!=''){
      
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
    if(this.data.userInfo==''){
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
    if(this.data.userInfo!=''){
      this.setData({
        show1:true
      })
    }else{
      Notify({ type: 'danger', message: '请先登录' });
    }
  },
  submitcomment(){
    if(this.data.message==''||this.data.userInfo==''){
      Notify({ type: 'danger', message: '请先登录或评论内容不能为空' });
    }
    else{
      wx.request({
        url: app.globalData.url+'/wx/submitComment',
        method:'POST',
        data:{
            nickname:this.data.userInfo.nickName,
            avatarUrl:this.data.userInfo.avatarUrl,
            newsid:this.data.newsid,
            content:this.data.message
        },
        header:{"Content-Type":"application/x-www-form-urlencoded"},
        success:res=>{
          //console.log(res.data);
          console.log(this.data.userInfo.nickName);
          console.log(this.data.userInfo.avatarUrl);
          console.log(this.data.message);
          
          Notify({ type: 'success', message: '发表评论成功' });
          this.setData({
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
    if(this.data.userInfo==''){
      Notify({ type: 'danger', message: '请先登录后再收藏' });
    }else{
    //console.log(this.data.NewsList[0].id);
    wx.getStorage({
      key: 'openId',
      success:res=>{
        var userid=res.data
        wx.request({
          url: app.globalData.url+'/wx/confirmCollection',
          method:'GET',
          data:{
            userid:userid,
            newsid:this.data.newsid
          },
          success:res=>{
            if(res.data==''){
              wx.request({
                url: app.globalData.url+'/wx/collection',
                method:"POST",
                data:{
                  newsid:this.data.newsid,
                  userid:userid
                },
                header:{"Content-Type":"application/x-www-form-urlencoded"},
                success:res=>{
                    console.log(res.data);
                    Notify({ type: 'success', message: '收藏成功' });
                }
              })
            }
            else{
              Notify({ type: 'warning', message: '已收藏，请勿重复收藏' });
            }
          }
        })
      }
    })
   }
  },

  share(){
    if(this.data.userInfo==''){
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
