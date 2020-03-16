var app = getApp()
let behavior = Behavior({
  properties: {
    title: String
  },
  data: {
    likelist:[]
  },
  ready: function () {
    // let id = wx.getStorageSync("id")
    // let id = "25954"
    let id = app.globalData.detailId
    var that = this
    wx.request({
      url: `https://wapi.feekr.com/shop/product/like?productCategoryId=16&count=4&shopid=FK`,
      success(res) {
        that.setData({
          likelist:res.data.result.list
        })
      }
    })
  }
})

module.exports = behavior