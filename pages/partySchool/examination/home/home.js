var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
var app = getApp();
Page({

  data: {
    currentTab: 0, //预设当前项的值
    examing:[],//待考
    examed: [],//已考
    loadLength:60,//加载区域高度值
    localUrl:'/pages/partySchool/examination/home/home',//当前文件所在地址
    turnToWay:'navigateTo',//跳转方式
    examDescUrl:'/pages/partySchool/examination/content/content', //考试说明地址
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var localUrl = that.data.localUrl;
    if (!paValidUtil.checkLogin(localUrl,1)){
      return;
    }else{
      //加载待考考试集合
      that.getExamingList();
      //加载完待考，加载已考
      that.getExamedList();
    }
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  
  //获取待考考试数据集合
  getExamingList: function(){
    var that = this;
    var url = 'examlist/unfinish';
    commonUtils.commonAjax(url, "", 1).then(that.getTheUnfinish);
  },
  getTheUnfinish: function (res) {
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        examed: res.data.data
      })
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  //获取已考考试数据集合
  getExamedList: function(){
    var that = this;
    var url = 'examlist/finish';
    commonUtils.commonAjax(url, "", 1).then(that.getTheFinish);
  },
  getTheFinish: function (res) {
    var that = this;
    console.log(res);

    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        examed: res.data.data
      })
    } else {
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
    
  },
  //页面跳转
  menuTargetTo: function (e) {
    var that = this;
    var url = e.target.dataset.targeturl;
    var examId = e.target.dataset.examid;
    var targetUrl = url + '?examId=' + examId;
    pahelper.navigateTo(url);
  }
})