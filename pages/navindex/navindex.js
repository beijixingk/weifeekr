// pages/navindex/navindex.js
Page({
  data: {
    title: ['新品&独家','本周特卖'],
    page:1,
    likelist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  handleToLower(){
    this.setData({
      page:this.data.page+1
    })
    var that = this
    wx.request({
      url: `https://wapi.feekr.com/shop/home/guess_like?page=${that.data.page}&shopid=FK`,
      success(res){
        if(res.data.result.list){
          that.setData({
            likelist:that.data.likelist.concat(res.data.result.list)
          })
        }else{
          wx.showToast({
            title: '没有啦',
            icon:'loading'
          })
        }
      }
    })
  },
})