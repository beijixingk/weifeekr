// components/guide/area-item/area-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    areaCon:{
      type:Object,
      observer: function (newVal, oldVal) {
        this.data.areaCon = newVal
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    areaCon:{}
  },
  lifetimes:{
    attached(){
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail: function (e) {
      wx.navigateTo({
        url: '/pages/detail-guide/detail-guide?id=' + e.currentTarget.id,
      })
    }
  }
})
