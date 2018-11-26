// pages/news/notices/notice_detail.js
//引入wxparse进行富文本解析
var WxParse = require('../../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverAdress: null,
    notice_id:null,
    article: null,
    icon_click:'/images/partySchool_icon/look.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var notice_id = options.notice_id;
    var addr = app.globalData.serverAddress;
    that.setData({
      serverAddress: addr,
      notice_id: notice_id
    });
    //请求数据
    that.getTheNoticeData();
    
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
  getTheNoticeData:function(){
    var that = this;
    var addr = that.data.serverAddress;
    var notice_id = that.data.notice_id;
    wx.request({
      url: addr + 'notices/public/' + notice_id,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          //设置数据
          that.setData({
            article: res.data.data
          });
          //进行富文本解析
          WxParse.wxParse('article.content', 'html', that.data.article.content, that);
        }
      },
      fail:function(res){
        wx.showToast({
          title: '加载出错，请稍后再试',
          icon:'none'
        })
      }
    })
  }
})