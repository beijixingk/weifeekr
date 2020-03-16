let behavior = Behavior({
  properties: {
    title: String
  },
  data: {
    list: []
  },
  attached: function () {
    var that = this
    wx.request({
      url: 'https://wapi.feekr.com/news/lists?shopid=FK',
      success(res) {
        // res.data.result.list.slice(0,3)
        that.setData({
          list: res.data.result.list.slice(0,3),
        })
        // console.log(res)
      }
    })
  },
})

module.exports = behavior