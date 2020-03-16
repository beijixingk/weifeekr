// component/homeComponents/selectedlist/selectedlist.js
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
    selectedlist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: `/pages/home/newdetail/newdetail?id=${id}`
      })
    }
  },
  lifetimes: {
    attached: function () {
      wx.request({
        url: 'https://wapi.feekr.com/editor/selected',
        success: (res) => {
          this.setData({
            selectedlist: res.data.result.list
          })
        }
      })
    }
  }
})
