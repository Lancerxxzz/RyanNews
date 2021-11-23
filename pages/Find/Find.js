// pages/Find/Find.js
const app =getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  data: {
    value: '',
    active:"1",
    replayid:1,
    result0:[],
    result1:[],
    result2:[],
    HistoryList:[],
    id:'',
    show:true,
    show1:false
 
  },
  onLoad(){
    this.datashow()
  },
  datashow(){
    wx.request({
      url: app.globalData.url+'/wx/find',
      method:"POST",
      data:{
        id:1
      },
      success:res=>{
      console.log(res.data);
        this.setData({
          result1:res.data
        })
      }
    })
  },
  onShow(){
    this.datashow()
  },



  onFocus(){
    this.setData({
      show:false,
      show1:true,
      result0:''
    })
  //console.log(this.data.result0);

  },

  onChange(e) {
    if(this.data.result0!=''){
      this.setData({
          show1:false
      })
    }
    this.setData({
      value: e.detail,
    });
   //console.log(this.data.value);
    if(this.data.value!=''){
      wx.request({
        url: app.globalData.url+'/wx/search',
        method:'POST',
        data:{
          simpletitle:this.data.value
        },
        header:{"Content-Type":"application/x-www-form-urlencoded"},
        success:res=>{
          console.log(res.data);
         // this.data.HistoryList.push(`${e.detail}`)
            this.setData({
              result0:res.data
            })
        }
      })
    }
  },

  onCancel() {
    this.setData({
      show:true,
      value:'',
      result0:''
    })

  },

  onBlur(){
    this.setData({
      show:true,
      value:'',
      show1:false
    })
  },
  onSearch(e){
    console.log(e.detail);
    var history=this.data.HistoryList.concat(e.detail)
    this.setData({
      HistoryList:history
    })
    console.log(this.data.HistoryList);
    
  },

  tabschange(e){
    this.setData({
      replayid:e.detail.name
    })
    //console.log(e.detail.name);
    wx.request({
      url: app.globalData.url+'/wx/find',
      method:"POST",
      data:{
          id:e.detail.name
      },
      success:res=>{
        //console.log(res.data);
        this.setData({
          result2:res.data
        })
        console.log(this.data.result2);
        
      }
    })
  },





  refresh(){
   // console.log(this.data.replayid);
    if(this.data.replayid==1){
      wx.request({
        url: app.globalData.url+'/wx/find',
        method:"POST",
        data:{
            id:this.data.replayid
        },
        success:res=>{
        //  console.log(res.data);
          this.setData({
            result1:res.data
          })
        Notify({ type: 'success', message: '刷新成功' });
        },
        fail:res=>{
          Notify({ type: 'danger', message: '刷新失败' });
        }
      })
    }
    else{
      wx.request({
        url: app.globalData.url+'/wx/find',
        method:"POST",
        data:{
            id:this.data.replayid
        },
        success:res=>{
         // console.log(res.data);
          this.setData({
            result2:res.data
          })
          Notify({ type: 'success', message: '刷新成功' });
        },
        fail:res=>{
          Notify({ type: 'danger', message: '刷新失败' });
        }
      })
    }

  },

  navigatorTocontent(e){
    wx.navigateTo({
      url: `/pages/Content/Content?newsid=${e.currentTarget.id}`,

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
                 duration: 2000,
                 timingFunc: 'easeIn'
                }
              })
      }
    })
  }
})