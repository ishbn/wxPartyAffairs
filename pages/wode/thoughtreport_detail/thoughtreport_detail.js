// pages/wode/thoughtreport_detail/thoughtreport_detail.js
var commonUtils = require("../../../utils/commonUtil.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:{
      report_id: null,
      title: '',
      content: '',
      date: ''
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var report_id = options.report_id;
    var url = 'report/detail/' + report_id;
    commonUtils.commonAjax(url, "", 1).then(that.getTheDetailData);
  },
  getTheDetailData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //设置数据
      that.setData({
        article: res.data.data
      });
      //进行富文本解析
      WxParse.wxParse('article.content', 'html', that.data.article.content, that);
    }else{
      commonUtils.commonTips(res.statusCode);
    }
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