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
      wx.navigateTo({
        url: `../../pages/Content/Content?newsid=${e.currentTarget.id}`,
      })
    },
  }
})
