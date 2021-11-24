const app =getApp()
Page({
  data: {
    NewsList:[],
    swiper:[],
    videoList:[],
    otherList:[],
    height:'',
    index:1,
    page:'',
    videoIndex:1,
    classifty:'',
    OtherIndex:1,
    pageName:'',
    show:false,
    show1:false,
    ad:""
  },
  onLoad(){
    this.pageshow()
  },
pageshow(){
  var that=this;
  wx.request({
    url: app.globalData.url+'/wx/index',
    method:'GET',
    dataType:'json',
    header:{"Content-Type":"application/json"},
    success:res=>{
      console.log(res.data);
      that.setData({
            NewsList:res.data[0],
            swiper:res.data[1],
            //videoList:res.data[2],
            ad:res.data[2].content
        })
    }
  })
},
  //上拉触底刷新
  onReachBottom(){
    var  that=this;
      if(that.data.page==0){
        wx.request({
          url: app.globalData.url+'/wx/indexmore',
          method:'GET',
          data:{
            index:that.data.index
          },
          dataType:'json',
          header:{"Content-Type":"application/json"},
          success:res=>{
            console.log(res);
            if(res.data[0].length==0){
              wx.showToast({
                title: '全部加载完啦！',
                icon:"success"
              })
              that.setData({
                show:true
              })
            }else{
              wx.showToast({
                title: '正在努力加载...',
                icon:"loading"
              })
              var List=that.data.NewsList.concat(res.data[0])
              that.setData({
                NewsList:List,
                index:that.data.index+1
              })
            }
          }
        })
      }
      else{
        wx.request({
          url: app.globalData.url+'/wx/otherMore',
          method:'GET',
          data:{
            OtherIndex:that.data.index,
            classifty:that.data.classifty
          },
          // dataType:'json',
          // header:{"Content-Type":"application/json"},
          success:res=>{
            console.log(res);
            if(res.data[0].length==0){
              wx.showToast({
                title: '全部加载完啦！',
                icon:"success"
              })
              that.setData({
                show1:true
              })
            }else{
              wx.showToast({
                title: '正在努力加载...',
                icon:"loading"
              })
              var List=that.data.NewsList.concat(res.data[0])
              that.setData({
                NewsList:List,
                index:that.data.index+1
              })
            }
          }
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
                 duration: 2000,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
  },
  onChange(e){
    this.setData({
      page:e.detail.index,
      OtherIndex:1,
      classifty:e.detail.title
    })
    var classifty=e.detail.title
    console.log(classifty);
    wx.request({
      url: app.globalData.url+'/wx/TagChange',
      method:"POST",
      data:{
        tabTag:e.detail.title
      },
      success:res=>{
        this.setData({
          otherList:res.data
        })
      } 
    })
  }
})