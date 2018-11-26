// pages/news/news/new_detail/new_detail.js
//引入wxparse进行富文本解析
var WxParse = require('../../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverAdress: null,
    article: null,
    icon_priaze: '/images/partySchool_icon/look.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var addr = app.globalData.serverAddress;
    // console.log(options);
    var newsId = options.news_id;
    that.setData({
      serverAddress: addr
    });
    //请求新闻详情
    wx.request({
      url: addr + 'news/' + newsId,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          // 去掉不必要的时分秒
          res.data.data.date = (res.data.data.date).substring(0, 10);
          //设置数据
          that.setData({
            article: res.data.data
          });
          //进行富文本解析
          WxParse.wxParse('article.content', 'html', that.data.article.content, that);
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