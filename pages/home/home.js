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
    classify:'',
    OtherIndex:1,
    pageName:'',
    show:false,
    show1:false,
    notice:"技术是开发它的人的共同灵魂。技术是开发它的人的共同灵魂。技术是开发它的人的共同灵魂。"
  },
  onLoad(){
    this.pageshow()
  },
pageshow(){
  wx.request({
    
    url: app.globalData.url+'/wx/index',
    method:'GET',
    dataType:'json',
    header:{"Content-Type":"application/json"},
    success:res=>{
      console.log(res.data);
        this.setData({
            NewsList:res.data[0],
            swiper:res.data[1],
            videoList:res.data[2]
        })
    }
  })
},
  //上拉触底刷新
  onReachBottom(){
      if(this.data.page==0){
        wx.request({
          url: app.globalData.url+'/wx/indexmore',
          method:'GET',
          data:{
            index:this.data.index
          },
          dataType:'json',
          header:{"Content-Type":"application/json"},
          success:res=>{
            console.log(res.data);
            var List=this.data.NewsList.concat(res.data)
              this.setData({
              NewsList:List,
              index:this.data.index+1
              })
              console.log(this.data.index);
              
              if((this.data.index-1)*5<=this.data.NewsList.length){
                wx.showToast({ //如果全部加载完成了也弹一个框
                  title: '加载中',
                  icon: 'loading',
                  duration: 500
                });
              }
              else{
                wx.showToast({ //如果全部加载完成了也弹一个框
                  title: '一滴都没有啦',
                  icon: 'success',
                  duration: 500
                });
                this.setData({
                  show:true
                })
              }
          }
        })
      }
      else{
        console.log(this.data.pageName);
          wx.request({
            url: app.globalData.url+'/wx/moreIn'+this.data.pageName,
            method:"GET",
            data:{
              classify:this.data.classify,
              OtherIndex:this.data.OtherIndex
            },
            success:res=>{
              console.log(res.data);
              var List=this.data.otherList.concat(res.data)
              this.setData({
                otherList:List,
                OtherIndex:this.data.OtherIndex+1
                })
                
              if(res.data!=''){
                wx.showToast({ //如果全部加载完成了也弹一个框
                  title: '加载中',
                  icon: 'loading',
                  duration: 500
                });
              }
              else{
                wx.showToast({ //如果全部加载完成了也弹一个框
                  title: '一滴都没有啦',
                  icon: 'success',
                  duration: 500
                });
                this.setData({
                  show1:true
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
      classify:e.detail.title
    })
    var classify=e.detail.title
    console.log(classify);
    wx.request({
      url: app.globalData.url+'/wx/TagChange',
      method:"POST",
      data:{
        tagIndex:e.detail.index
      },
      success:res=>{
        this.setData({
          pageName:res.data
        })
        if(e.detail.index>0){
          wx.request({
            url: app.globalData.url+'/wx/TagChange/'+res.data,
            method:'POST',
            dataType:'json',
            header:{ 'content-type':'application/x-www-form-urlencoded',},
            data:{
              classify:classify
            },
            success:res=>{
              console.log(res.data);
                this.setData({
                  otherList:res.data,
                  })
              }
          })
        }
        else{
          this.pageshow();
        }
      } 
    })
  }
})