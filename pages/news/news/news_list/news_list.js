// pages/news/news/news_list/news_list.js
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverAddress: '',
    broadcast: [],
    list_news: [],
    pageNum: 1,     //当前页数
    totalPageNum: '',//总页数
    news_length: 8,   //一页的条数
    more: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.doRequestData();
  },
  /**请求数据 */
  doRequestData: function () {
    var that = this;
    // 发起数据刷新网络请求
    that.getNewsList();
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
    var that = this;
    // 是否达到最大页数，是则显示没有更多，否则继续请求数据
    if (that.data.pageNum >= that.data.totalPageNum) {
      that.setData({
        more: false
      });
    } else {
    // 发起加载更多网络请求
    that.getMoreNews();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getNewsList: function() {
    var that = this;
    // 刷新恢复第一页
    that.setData({
      pageNum:1
    });
    //显示新闻条数
    var news_length = that.data.news_length;
    // 新闻页数
    var newsPage = that.data.pageNum;
    var url = 'newsMenu/' + newsPage + '/' + news_length;
    commonUtils.commonAjax(url, "", 1).then(that.getTheListSuccess);
  },
  getTheListSuccess: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //获取到的数据，处理封面为空
      var list = paValidUtil.checkImgPath(res.data.data.list);
      // var list = res.data.data.list;
      //更新滑块的数据
      that.setBroadcast(list);
      // 更新数据
      that.setData({
        list_news: list,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum,
        more: true
      });
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },

  /**更新滑块部分的数据 */
  setBroadcast: function(array) {
    var that = this;
    //原来的数组
    var borad = [];
    // 取四条数据或者更小
    var maxLength = (array.length < 4) ? array.length : 4;
    //压进原来的数组
    for (var i = 0; i < maxLength; i++) {
      borad.push(array[i]);
    }
    // 更新数据
    that.setData({
      broadcast: borad
    });
  },
  /**加载更多数据 */
  getMoreNews(){
    var that = this;
    //显示新闻条数
    var news_length = that.data.news_length;
    // 新闻页数
    var newsPage = that.data.pageNum+1;
    var url = 'newsMenu/' + newsPage + '/' + news_length;
    commonUtils.commonAjax(url, "", 1).then(that.getTheReturnNews);
  },
  getTheReturnNews:function(res) {
    var that = this;
    // console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      //获取到的数据，进行图片路径处理
      var list = paValidUtil.checkImgPath(res.data.data.list);
      //追加到原来的数组
      var array = commonUtils.commonArrayAdd(that.data.list_news, list) ;
      // 更新数据
      that.setData({
        list_news: array,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  }
})