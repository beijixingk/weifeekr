// pages/home/morenew/morenew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    morenewlist:[],
    page:1,
    count:0,
    defaultImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getMoreNewList:function(){
    wx.request({
      url: `https://wapi.feekr.com/news/lists?id=&count=10&page=${this.data.page}`,
      success: (res) => {
        // console.log(this.data.page)
        if(this.data.page==2){
          console.log(this.data.page)
          var list = res.data.result.list.splice(1, 1)
        }
        this.setData({
          morenewlist: [
            ...this.data.morenewlist,
            ...res.data.result.list
          ],
          count:Math.ceil(res.data.result.totalCount/10)
        })
      }
    })
    this.data.page++
  },
  //图片加载出错，则地址设为默认地址，需要在image标签设置 属性，记录index 
  imgError:function(e){
    var errorIndex = parseInt(e.target.dataset.imgindex)
    // console.log(errorIndex)
    var imglist = this.data.morenewlist
    imglist[errorIndex].cover = this.data.defaultImg
    this.setData({
      morenewlist:imglist
    })
  },
  handleTap:function(e){
    // console.log(e.currentTarget.dataset.itemid)
    var id = e.currentTarget.dataset.itemid
    wx.navigateTo({
      url: `../newdetail/newdetail?id=${id}`,
    })
  },
  onReady: function () {
    this.getMoreNewList()
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
    if(this.data.page < this.data.count){
      this.getMoreNewList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})