import WxParse from '../../../pages/assets/wxParse/wxParse.js'
var app = getApp()
let behavior = Behavior({
  properties: {
    title: String
  },
  data: {
    productThumblist: [],
    productThumblistlen: 0,
    detailheader: {},
    group: [],
    userinfo:{},
    prodesc:{},
    group2:[],
    sum:0
  },
  ready: function () {
    let id = wx.getStorageSync("id")
    // let id =app.globalData.detailId
    // console.log(app.globalData.detailId)
    var that = this
    wx.request({
      url: `https://wapi.feekr.com/shop/product/detail?productId=${id}&pvFrom=wap_index_new&shopid=FK`,
      success(res) {
        let { productDesc, productName, productPrice, productUnit, productUnitCount, productThumb, group, user, head, recom, productContain, productDetail, usage, rule } = res.data.result
        // console.log(productDetail)
        that.setData({
          productThumblist: productThumb,
          productThumblistlen: productThumb.length,
          detailheader: {
            productDesc,
            productName,
            productPrice,
            productUnit,
            productUnitCount,
          },
          group,
          group2:group.slice(1),
          userinfo: {
            head,
            user,
            recom
          },
          prodesc:{
            productContain,
            productDetail: WxParse.wxParse('productDetail', 'html', productDetail, that),
            usage,
            rule
          },
          sum:group[0].groupPrice
        })
        // console.log(that.data.prodesc.productDetail)
      }
    })
  },
  test() {
    console.log(2)
  }
})

module.exports = behavior