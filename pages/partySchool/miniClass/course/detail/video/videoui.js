import * as video from '../../../../../../utils/video';
var commonUtils = require("../../../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../../../utils/paValidUtil.js");
var pahelper = require("../../../../../../utils/pahelper.js");
var WxParse = require('../../../../../../utils/wxParse/wxParse.js');

var timeBreak = 0;
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localUrl:'/pages/partySchool/miniClass/course/detail/video/videoui',
    videos:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if (!paValidUtil.checkLogin(that.data.localUrl + "?id=" + id, 2)) {
      return;
    }
    //获取视频详情
    var url = "study/get_study_video_details.do";
    var data = { video_id: id };
    commonUtils.commonAjax(url, data, 1).then(that.processResult);
    //设置该视频为学习状态
    var url2 = "study/set_study_video_already/"+id;
    commonUtils.ajaxRequest(url2, "", 2, 0).then(that.getResultStatus);
  },
  processResult: function (res) {
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        videos: res.data.data,
      });
      //进行富文本解析
      WxParse.wxParse('article.content', 'html', that.data.videos.videoIntroduction, that);

    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  getResultStatus:function(res){
    var that = this;
    if (res.statusCode != 200) {
      commonUtils.commonTips(res.statusCode);
    }
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
  },
  timeupdate:function(e){
    var that = this;
    console.log(e);
    var vlength = e.detail.duration;
    var t = e.detail.currentTime;
    var diffTime = t - timeBreak;

    if (t >=vlength){
      that.recordtheSchdule(t);
      timeBreak = t;
      return;
    }
    if (diffTime >= 10){
      that.recordtheSchdule(t);
      timeBreak = t;
    }
  },
  endOfVideo:function(res){
    console.log(res);
  },
  recordtheSchdule:function(time){
    var that = this;
    var url = 'study/video_record.do';
    var vid = that.data.videos.videoId;
    var data={
      videoId: vid,
      schedule:time
    };
    commonUtils.ajaxRequest(url, data, 1, 0).then(that.getResult);
  },
  getResult:function(res){
    var that = this;
   console.log(res);
  }
})