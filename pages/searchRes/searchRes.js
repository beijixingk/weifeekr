// pages/searchRes/searchRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[],
    styleId: 0,
    cityId: '',
    sortId: 2,
    keyword: '',
    totalCount: 0,
    page: 1
  },
  getKeyword:function(e){
    this.setData({
      keyword:e.detail.keyword
    })
    this.getData()
  },
  getProData:function(e){
    this.setData({
      styleId: e.detail.styleId || this.data.styleId,
      cityId: e.detail.cityId || this.data.cityId,
      sortId: e.detail.sortId || this.data.sortId,
    })
    this.getData()
  },
  getData() {
    wx.request({
      url: `https://wapi.feekr.com/shop/product/search?style[]=${this.data.styleId}&city[]=${this.data.cityId}&sort=${this.data.sortId}&keyword=${this.data.keyword}&productType[]=1&paymentType=1&page=${this.data.page}&shopid=FK`,
      success: (result) => {
        this.setData({
          proList: result.data.result.list,
          totalCount: result.data.result.totalCount
        })
      }
    })
  },
  getAddData(){
    wx.request({
      url: `https://wapi.feekr.com/shop/product/search?style[]=${this.data.styleId}&city[]=${this.data.cityId}&sort=${this.data.sortId}&keyword=${this.data.keyword}&productType[]=1&paymentType=1&page=${this.data.page}&shopid=FK`,
      success: (result) => {
        this.setData({
          proList: [...this.data.proList, ...result.data.result.list],
          totalCount: result.data.result.totalCount
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.keyword){
      this.setData({
        keyword:options.keyword
      })
    }
    this.getData()
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
    if(!this.loading && this.data.totalCount/20 >= this.data.page){
      this.setData({
        page: this.data.page+1
      })
      this.getAddData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})