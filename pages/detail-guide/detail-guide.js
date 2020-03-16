// pages/detail-guide/detail-guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:{},
    guidecategoryList:[],
    themeList: [],
    pathList: [],
    articleList:[],
    shopList:[],
    nearbyCityList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    wx.request({
      url: 'https://wapi.feekr.com/guide/detail?id='+id,
      success: result=>{
        this.setData({
          city: result.data.result
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/guidecategory?id='+id,
      success: result => {
        this.setData({
          guidecategoryList: result.data.result.list
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/themelist?id='+id+'&count=3&recommend=1',
      success: result => {
        this.setData({
          themeList: result.data.result.list
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/pathlist?id='+id+'&count=2&recommend=1',
      success: result => {
        this.setData({
          pathList: result.data.result.list
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/articlelist?id='+id+'&count=2&recommend=1',
      success: result => {
        this.setData({
          articleList: result.data.result.list
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/shoplist?id='+id+'&count=2&recommend=1',
      success: result => {
        this.setData({
          shopList: result.data.result.list
        })
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/nearby?cityId='+id,
      success: result => {
        this.setData({
          nearbyCityList: result.data.result.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})