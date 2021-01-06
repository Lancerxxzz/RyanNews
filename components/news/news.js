// components/news.js
const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     NewsList:{
       type:[]
     },
     swiper:{
       type:[]
     },
     otherList:{
      type:[]
    },
    notice:{
      type:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    },

  /**
   * 组件的方法列表
   */
  methods: {
    navigate(e){
      console.log(this.data.NewsList);
      wx.navigateTo({
        url: '/pages/Content/Content',
        success:res=>{
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: `${e.currentTarget.id}` })
        }
      })
      console.log("111");
      
      console.log(e.currentTarget.id);
      wx.getStorage({
        key: 'openId',
        success:res=>{
          console.log(res);
          var userid=res.data
          wx.request({
            url: app.globalData.url+'/wx/confirmHistory',
            method:"GET",
            data:{
              newsid:e.currentTarget.id,
              userid:userid
            },
            success:res=>{
              console.log(res.data);
              if(res.data==""||res.data==null){
                wx.request({
                  url: app.globalData.url+'/wx/history',
                  method:"POST",
                  data:{
                    newsid:e.currentTarget.id,
                    userid:userid,
                  },
                  success:res=>{
                    console.log("浏览已记录");
                  }
                })
              }else{
                console.log("浏览已存在");
              } 
            }
          })
        }
      })
    },
  },

})
