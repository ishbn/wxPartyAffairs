// pages/wode/thoughtreport_detail/thoughtreport_detail.js
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
    // console.log(options);
    var report_id = options.report_id;
    var that = this;
    var addr = app.globalData.serverAddress;
    that.setData({
      serverAddress: addr,
      report_id: report_id
    });
    // 检查网络并进行数据查询请求
    that.checkNetWork();


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
  checkNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == 'none') {
          // 提示网络出错
          wx.showToast({
            title: '加载失败，请检查网络',
            icon: 'none'
          });
        } else {
            // 请求查询思想报告列表
            that.getReportDetail();
          }
      }
    })
  },
  getReportDetail:function(){
    var that = this;
    var addr = that.data.serverAddress;
    var report_id = that.data.report_id;
    wx.request({
      url: addr + 'report/detail/' + report_id,
      header: {
        Cookie: app.globalData.header.Cookie,
        'Content-type': 'application/json'
      },
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
      fail: function (res) {
        wx.showToast({
          title: '加载出错，请稍后再试',
          icon: 'none'
        })
      }
    })
  }
})