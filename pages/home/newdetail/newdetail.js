// pages/home/newdetail/newdetail.js
var WxParse = require('../../assets/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detailOthers:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id:options.id+'=='
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: `https://wapi.feekr.com/article/detail?id=${this.data.id}`,
      // url:`https://wapi.feekr.com/share?id=${this.data.id}&type=article`,
      success: (res) => {
        var detail = res.data.result.content.content
        this.setData({
          detailOthers:res.data.result.content
        })
        WxParse.wxParse('detail', 'html', detail, that, 5);
      }
    })
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