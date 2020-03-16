// component/homeComponents/citylist/citylist.js
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
    citylist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      wx.request({
        url: 'https://wapi.feekr.com/guide/cityrecommend',
        success: (res) => {
          this.setData({
            citylist: res.data.result.list.slice(0,4)
          })
        }
      })
    }
  }
})
