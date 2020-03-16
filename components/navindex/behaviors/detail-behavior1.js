var app = getApp()
let behavior = Behavior({
  properties: {
    title: String
  },
  data: {
    productThumblist: [], 
    productThumblistlen:0,
    detailheader:{},
    group:[],
    userinfo:{}
  },
  ready: function () {
    // let id = app.globalData.detailId
    let id = wx.getStorageSync("id")
    var that = this
    wx.request({
      url: `https://wapi.feekr.com/shop/product/detail?productId=${id}&pvFrom=wap_index_new&shopid=FK`,
      success(res) {
        let { productDesc, productName, productPrice, productUnit, productUnitCount, productThumb, group, user, head, recom} = res.data.result
        that.setData({
          productThumblist:productThumb,
          productThumblistlen:productThumb.length,
          detailheader:{
            productDesc,
            productName,
            productPrice,
            productUnit,
            productUnitCount,
          },
          group,
          userinfo:{
            head,
            user,
            recom
          }
        })
        // console.log(res)
      }
    })
  },
  test(){
    console.log(2)
  }
})

module.exports = behavior