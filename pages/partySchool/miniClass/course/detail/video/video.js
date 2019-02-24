var app = getApp();
var commonUtils = require("../../../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../../../utils/paValidUtil.js");
var pahelper = require("../../../../../../utils/pahelper.js");
var start;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colShow: true,//收藏出现效果
    colCancelShow: true,//取消收藏效果
    clickCol: true,//收藏是否可点击
    collect: "/images/partySchool_icon/collect.png",//收藏图标
    videoDetail: {},//视频
    num: '',//当前视频的数组下标
    pre: '',//上一个索引
    next: '',//下一个索引
    localUrl: '/pages/partySchool/miniClass/course/detail/video/video',//当前文件所在地址
    currentTime: 0,//当前视频播放位置
    post_content: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if (!paValidUtil.checkLogin(that.data.localUrl +"?id="+id, 2)) {
      return;
    }
   
    var url = "study/get_study_video_details.do";
    var data = {video_id:id};
    commonUtils.commonAjax(url,data,1).then(that.processResult);
  },
  processResult:function(res){
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        videoDetail: res.data.data,
      })
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  // videoTimeUpdate:function(e){
  //   var that = this;
  //   var currentTime = e.detail.currentTime;
  //   if (currentTime - that.data.currentTime>3){
  //     e.detail.currentTime = that.data.currentTime
  //     that.setData({
  //       currentTime: e.detail.currentTime
  //     })
  //   }else{

  //   }

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo');
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
  play: function () {
    if (this.data.isPlay) {
      this.videoCtx.pause();
    } else {
      this.videoCtx.play()
    }
  },
  bindPlay() {
    this.setData({
      isPlay: true
    })
  },
  bindPause() {
    this.setData({
      isPlay: false
    })
  },
  ended() {
    this.videoCtx.seek(0);  //重新播放
  },
  // 下面主要模仿滑动事件
  touchstart: function (e) {
    start = e.changedTouches[0];
    // console.log("touchstart ", e.changedTouches[0])
  },

  touchmove: function (e) {
    // console.log("touchmove ", e.changedTouches[0])
  },

  touchend: function (e) {
    // console.log("touchend ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  touchcancel: function (e) {
    // console.log("touchcancel ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  // 计算滑动方向
  getDirect(start, end) {
    var X = end.pageX - start.pageX,
      Y = end.pageY - start.pageY;
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      console.log("right");
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      console.log("left");
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      console.log("bottom");
      this.pre();
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      console.log("top");
      this.next()
    }
  },
  // 视频播放时间更新
  timeupdate: function (e) {
    var val = e.detail.currentTime;
    var max = e.detail.duration;
    var percent = Math.round(val / max * 10000) / 100;
    this.setData({
      percent: percent
    })
  },
})