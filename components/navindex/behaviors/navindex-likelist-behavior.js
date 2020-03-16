
let behavior = Behavior({
  properties: {
    title: String
  },
  data: {
    likelist: []
  },
  attached: function () {
    var that = this
    wx.request({
      url: 'https://wapi.feekr.com/shop/home/guess_like?page=1&shopid=FK',
      success(res) {
        // res.data.result.list.slice(0,3)
        that.setData({
          likelist: res.data.result.list,
        })
        console.log(res)
      }
    })
  },

})

module.exports = behavior