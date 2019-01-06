// pages/organization/activity/activity.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowPageUrl: "/pages/organization/activity/activity",
    detailPageUrl:"/pages/organization/activityDetails/activityDetails",
    // 关于页数的变量
    pageNum: 1,
    totalInfoNum: 3,
    totalActiveNum: 3,
    totalPageNum: 1,
    requestNum:15,
    //关于wiper的定位变量
    currentTab: 0,

    //列表数据
    events_list: null,

    //已报名列表
    registered: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!paValidUtil.checkLogin(that.data.nowPageUrl, 1)){
      return;
    }
    var pageNum = that.data.pageNum;
    var reqNum = that.data.requestNum;
    that.askForServer(pageNum, reqNum);
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
    this.askForApplyInfo();
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
  /*更新选中的tab的值 */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  /*监听点击tab事件 */
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
  targetToDetail: function(e){
    var this_id = e.currentTarget.dataset.id;
    var this_state = e.currentTarget.dataset.state;
    var deletenum = e.currentTarget.dataset.deletenum;
    var targetUrl = this.data.detailPageUrl;
    var url = targetUrl+'?id=' + this_id + '&state=' + this_state + '&deletenum=' + deletenum;
    pahelper.navigateTo(url);
  },

  //向服务器请求数据
  askForServer: function(pagenum,num){
    var that = this;
    var url = 'partyActivity/menu/' + pagenum + '/' + num;
    commonUtils.commonAjax(url, "", 2).then(that.getTheListData);
  },
  getTheListData: function (res) {
    var that = this;
    console.log(res);
    if (res.data.status == 0 && res.statusCode == 200) {
      that.setData({
        pageNum: res.data.data.pageNum,
        totalInfoNum: res.data.data.totalInfoNum,
        totalActiveNum: res.data.data.totalActiveNum,
        totalPageNum: res.data.data.totalPageNum,
        events_list: res.data.data.list
      })
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  //请求报名状态的信息
  askForApplyInfo: function () {
    var that = this;
    var url = 'partyActivity/applyAllInfo';
    commonUtils.commonAjax(url, "", 1).then(that.getTheApplyList);
  },
  getTheApplyList: function (res) {
    var that = this;
    console.log(res);
    if (res.data.status == 0 && res.statusCode == 200) {
      that.setData({
        registered: res.data.data
      })
    }
  }

})