// pages/home/morecolumn/morecolumn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnlist:[]
  },
  columnnewTap: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id
    wx.setStorage({
      key: 'columnid',
      data: id,
    })
    wx.navigateTo({
      url: `../columnnew/columnnew?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'https://wapi.feekr.com/editor/column',
      success:(res)=>{
        this.setData({
          columnlist:res.data.result.list
        })
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