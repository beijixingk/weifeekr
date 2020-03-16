// pages/profile/profile.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  bindsubmit(e) {
    let username = e.detail.value.username
    let password = e.detail.value.psw
    if (username) {
      let userlist = app.globalData.users
      let result = userlist.filter((value) => {
        return value.username === username
      })
      if (result.length) {
        if (password === result[0].psw) {
          wx.setStorage({
            key:"username",
            data:username,
            success(){
              wx.navigateTo({
                url: '/pages/profile/profile',
              })
            }
          })
          
        } else {
          wx.showToast({
            title: '用户名或密码不正确',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '该用户未注册',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请填写登录名',
        icon: 'none'
      })
    }
  }
})