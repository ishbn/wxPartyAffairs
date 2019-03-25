// pages/partySchool/threeOne/meetingdetail/meetingdetail.js
import * as video from '../../../../utils/video';
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localUrl: '/pages/partySchool/threeOne/meetingdetail/meetingdetail',
    videos: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!paValidUtil.checkLogin(that.data.localUrl, 1)) {
      return;
    }
    var id = options.id;
    var url = "/meeting/"+id;
    commonUtils.commonAjax(url, "", 1).then(that.processData);

  },
  processData: function (res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      that.setData({
        videos: result
      });
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
  //主题封面点击-播放视频
  bindplay(e) {
    video.bindplay(this, e)
  },
  //监听视频播放
  bindplay_video(e) {
    video.bindplay_video(this, e)
  },
  //跳转到全屏播放页面  
  startOnPlay(ev) {
    wx.navigateTo({
      url: '/pages/partySchool/miniClass/detail/videoFull/videoFull?src=' + ev.currentTarget.dataset.src,
    })
  }
})