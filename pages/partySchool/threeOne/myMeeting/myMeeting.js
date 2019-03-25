// pages/partySchool/threeOne/myMeeting/myMeeting.js
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisPageUrl: "/pages/partySchool/threeOne/myMeeting/myMeeting",
    detailUrl: "/pages/partySchool/threeOne/meetingdetail/meetingdetail",
    endedIcon: "/images/partySchool_icon/null.png",
    pageNum: 0,
    more: true,
    pageLength: 10,
    totalPageNum: 1,
    willMeetings: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (!paValidUtil.checkLogin(that.data.thisPageUrl, 1)) {
      return;
    }
    that.doRequestData();
  },

  doRequestData: function() {
    var that = this;
    var url = "meetingMenu_1/" + (that.data.pageNum + 1) + "/" + that.data.pageLength;
    commonUtils.commonAjax(url, "", 1).then(that.processData);
  },
  processData: function(res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var list = paValidUtil.checkImgPath(res.data.data.list);
      var canmore = true;
      var nowPage = res.data.data.pageNum;
      var totelPage = res.data.data.pageNum;
      if (nowPage >= totelPage){
        canmore=false;
      }
      that.setData({
        willMeetings: list,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum,
        more: canmore
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
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
    var that = this;
    that.setData({
      pageNum: 0,
      more: true
    });
    that.doRequestData();
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
      that.doRequestData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }


})