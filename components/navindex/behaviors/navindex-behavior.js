let behavior = Behavior({
  properties: {
    title:String
  },
  data: {
    swiperlist:[],
    stylelist:[],
    newProductlist:[],
    specialsProductlist:[],
    themelist:[]
  },
  attached: function () { 
    var that = this
    wx.request({
      url: 'https://wapi.feekr.com/shop/home/index?shopid=FK',
      success(res){
        that.setData({
          swiperlist:res.data.result.slider,
          stylelist:res.data.result.style,
          newProductlist: res.data.result.newProduct,
          specialsProductlist: res.data.result.specialsProduct,
          themelist:res.data.result.theme
        })
          // console.log(res)
      }
    })
  },

})

module.exports = behavior