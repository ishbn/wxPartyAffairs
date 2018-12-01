// pages/organization/partyUserInfo/partyUserInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisPage: "/pages/organization/partyUserInfo/partyUserInfo",
    userinfo: null,
    serverurl: app.globalData.serverAddress,
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //检测登陆
    app.checkLogin(that.data.thisPage, "redirectTo");

    //用户头像
    try {
      var userinfo = wx.getStorageSync('userInfo');
      that.setData({
        userinfo: userinfo
      })
    } catch (e) {
      console.log(e);
    }


    //向服务器请求数据
    wx.request({
      url: that.data.serverurl + 'userInfo/partyInfo',
      method: 'GET',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.status == 0 && res.statusCode == 200) {
          console.log(res.data.data);
          that.setData({
            content: res.data
          })
        } else {

        }
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