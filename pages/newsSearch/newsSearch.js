// pages/newsSearch/newsSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywordList:[],
    searchList:[],
    recentSearchList:[]
  },

  submitSearch:function(e){
    var list = wx.getStorageSync('guideRecentSearch')
    if (list) {
      if (list.indexOf(e.detail.value) == -1) {
        wx.setStorageSync('guideRecentSearch', [...list, e.detail.value])
      }
    } else {
      wx.setStorageSync('guideRecentSearch', [e.detail.value])
    }
    console.log(wx.getStorageSync('guideRecentSearch'))
    wx.request({
      url: 'https://wapi.feekr.com/guide/searchlist?keyword='+e.detail.value+'&count=8',
      success: result =>{
        this.setData({
          searchList: result.data.result.list
        })
      }
    })
    console.log(this.data.searchList)
    if(this.data.searchList.length == 0){
      wx.navigateTo({
        url: '/pages/newsSearchRes/newsSearchRes',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      method: 'POST',
      data: {id: 6170, keyword:'上海',disableLazyInit: 1},
      url: 'https://wapi.feekr.com/guide/search',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: result=>{
        console.log(result.data)
      }
    })
    wx.request({
      url: 'https://wapi.feekr.com/guide/keywordlist',
      success: result => {
        this.setData({
          keywordList: result.data.result.list
        })
      }
    })
    this.setData({
      searchHistory: wx.getStorageSync('search-history-labels')
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