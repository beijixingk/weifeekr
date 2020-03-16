// components/guide/guide-recommend/guide-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cityRecommendList:[]
  },

  lifetimes:{
    attached(){
      wx.request({
        url: 'https://wapi.feekr.com/guide/cityrecommend',
        success: result =>{
          this.setData({
            cityRecommendList:result.data.result.list.slice(0,4)
          })
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail:function(e){
      wx.navigateTo({
        url: '/pages/detail-guide/detail-guide?id='+e.currentTarget.id,
      })
    }
  }
})
