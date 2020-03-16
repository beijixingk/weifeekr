// pages/home/columnnew/columnnew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    news:'',
    hot:'',
    newPage:1,
    hotPage:1,
    kind:'new',
    flag:0
  },
  // 方法：
  changeTab:function(e){
    if (this.data.kind !== e.currentTarget.dataset.kind){
      this.setData({
        kind: e.currentTarget.dataset.kind,
        flag: 1
      })
      this.selectComponent('#list').getNewList()
      this.setData({
        flag: 0
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    // wx.setStorageSync('columnid',options.id)
    // wx.setStorage({
    //   key: 'columnid',
    //   data: options.id,
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: `https://wapi.feekr.com/selection/detail?columnId=${this.data.id}&order=new&page=1`,
      success:(res)=>{
        this.setData({
          news:res.data.result.info
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
    this.selectComponent('#list').getNewList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})