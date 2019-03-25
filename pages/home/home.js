// pages/home/home.js
var commonUtils = require("../../utils/commonUtil.js");
var paValidUtil = require("../../utils/paValidUtil.js");
var pahelper = require("../../utils/pahelper.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canShow: false,
    menu: [{
        // imgUrls: '/images/icon_function/file.png',
        imgUrls: '/images/icon/档案 (1).png',
        descs: '党员档案',
        target_page: '/pages/organization/partyUserInfo/partyUserInfo'
      },
      {
        imgUrls: '/images/icon/课程r.png',
        descs: '微党课',
        target_page: "/pages/partySchool/partyClass/class/class_home/class_home"
      },
      {

        imgUrls: '/images/icon/文章.png',
        descs: '三会一课',
        target_page: '/pages/partySchool/threeOne/home/home'
      },
      {

        imgUrls: '/images/icon/教育.png',
        descs: '专题教育',
        target_page: '/pages/partySchool/education/home/home'
      },
      {
        imgUrls: '/images/icon/公告2.png',
        descs: '通知公示',
        target_page: '/pages/news/notices/notices_list/notices_list'
      },
      {
        imgUrls: '/images/icon/新闻 (1).png',
        descs: '党建要闻',
        target_page: '/pages/news/news/news_list/news_list'
      },
      {
        imgUrls: '/images/icon/考试 (1).png',
        descs: 'e起考试',
        target_page: '/pages/partySchool/examination/home/home'
      },
      {

        imgUrls: '/images/icon/档案推送r.png',
        descs: '思想汇报',
        target_page: '/pages/wode/thoughtreport/thoughtreport'
      },
      {

        imgUrls: '/images/icon/相册r.png',
        descs: '活动相册',
        target_page: '/pages/organization/partybranchList/partybranchList'
      },
      {

        imgUrls: '/images/icon/消息 (4).png',
        descs: '我的消息',
        target_page: '/pages/test/test'
      }

    ],
    newsLength: 4,
    list_news: [],
    noticesLength: 4,
    list_notices: [],
    // 前端跳转使用
    newsListUrl: "/pages/news/news/news_list/news_list",
    newDetailUrl: "/pages/news/news/new_detail/new_detail",
    noticeListUrl: "/pages/news/notices/notices_list/notices_list",
    noticeDetailUrl: "/pages/news/notices/notice_detail/notice_detail"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //如果存在缓存，自动登录
    that.autoLogin();
    that.doRequestData();

  },
  /**请求数据 */
  doRequestData: function() {
    var that = this;
    var length = that.data.newsLength;
    // 请求新闻
    var newsUrl = 'homelist/newslist/' + length;
    commonUtils.commonAjax(newsUrl, "", 1).then(that.newsDataCallback);
    // 请求通知公告
    var noticeUrl = 'homelist/noticeslist/public/' + length;
    commonUtils.commonAjax(noticeUrl, "", 1).then(that.noticecallback);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.doRequestData();
    commonUtils.commonPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  newsDataCallback: function(res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      var list = paValidUtil.checkImgPath(res.data.data);
      if (list) {
        that.setData({
          list_news: list
        });
        //显示内容
        that.showContent();
      }
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  noticecallback: function(res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      var list = paValidUtil.checkImgPath(res.data.data);
      if (list) {
        that.setData({
          list_notices: list
        });
        //显示内容
        that.showContent();
      }
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  showContent: function() {
    var that = this;
    that.setData({
      canShow: true
    });
  },
  autoLogin: function() {
    var that = this;
    var userInfo = "";
    // 缓存
    try {
      userInfo = wx.getStorageSync('userLogin');
    } catch (e) {
      // Do something when catch error
    }
    if (JSON.stringify(userInfo)!="{}") {
      var url = "login";
      if (pahelper.isEmpty(userInfo.userId) || pahelper.isEmpty(userInfo.password)){
        return;
      }
      console.log(userInfo)

      var data = {
        userId: userInfo.userId,
        password: userInfo.password
      };
      commonUtils.ajaxRequest(url, data, 2, 1).then(that.autoLoginResult);
    } else {
      return;
    }
  },
  autoLoginResult: function(res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      // 保存本地，方便下次登录
      that.saveUserInfo(res);
      //标志更改为已登录并记住sessionId
      app.globalData.hadLogin = true;
      app.globalData.header.Cookie = res.header['Set-Cookie'];
      app.globalData.userInfo = res.data.data;
    }
  },
  /**保存缓存 */
  saveUserInfo: function(res) {
    var that = this;
    var userlogin = {
      userId: that.data.userId,
      password: that.data.password
    }
    wx.setStorage({
      key: "userLogin",
      data: userlogin
    });
    wx.setStorage({
      key: "userInfo",
      data: res.data.data
    });
  }
})