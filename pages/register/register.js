// pages/register/register.js
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
  formSubmit(e){
    console.log(e.detail.value)
    let username = e.detail.value.username
    let psw = e.detail.value.psw
    let isPhone =  /^1[0-9]{10}$/.test(username)
    if(isPhone){
      let userlist = app.globalData.users
      let userIsExist = userlist.filter((value) => {
        return value.username === username
      })
      if (userIsExist.length) {
        wx.showToast({
          title: '该用户已注册',
          icon: 'none'
        })
      } else {
        if(psw.length <= 6){
          wx.showToast({
            title: '密码过于简单',
            icon: 'none'
          })
        }else{
          app.globalData.users[app.globalData.users.length] = e.detail.value
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            success() {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          })
        }
      }
    }else{
      wx.showToast({
        title: '输入不合法',
        icon: 'none'
      })
    }
    
    console.log(app.globalData)
  }
})