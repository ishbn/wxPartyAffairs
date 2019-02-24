var app = getApp();
var commonUtils = require("../../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../../utils/paValidUtil.js");
var pahelper = require("../../../../../utils/pahelper.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//中间轮播图的编号
    count:0, //必学课程数
    classTargetUrl:"/pages/partySchool/miniClass/course/courseClassify/courseClassify",//课程跳转地址
    look: "/images/partySchool_icon/look.png", //浏览图标
    localUrl:'/pages/partySchool/miniClass/course/coursePush/coursePush',//本地路径
    turnToWay:'navigateTo',//跳转方式
    allVedioList:[],//所有视频
    mustVedioList:[],//必学视频
    videoDetailUrl:"/pages/partySchool/miniClass/course/detail/video/videoui",
    newListPage:'/pages/partySchool/miniClass/course/courseClassify/courseClassify'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!paValidUtil.checkLogin(that.data.localUrl, 2)) {
      return;
    }
    that.getMustVedioList();
    //获取最新视频
    that.getAllVedioList();
  },
  //获取必学视频
  getMustVedioList:function(){
    var that = this;
    var url = "study/get_study_videos_must.do";
    var param = {
      page: '1',
      pageNum: '15'
      };
    commonUtils.ajaxRequest(url, param,2,1).then(that.processData);
  },
  processData:function(res){
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        mustVedioList: res.data.data.list,
        count: res.data.data.list.length
      })
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  //获取所有视频
  getAllVedioList:function(){
    var that = this;
    var url = 'study/get_study_videos.do';
    var param = {
      page: '1',
      pageNum: '10'
    };
    commonUtils.ajaxRequest(url, param, 2, 1).then(that.processAllData);
  },
  processAllData:function(res){
    var that = this;
    console.log(res);
  if (res.statusCode == 200 && res.data.status == 0) {
    that.setData({
      allVedioList: res.data.data.list
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
  //轮播图中间图片的编号
  swiperChange(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  //全部视频
  targetTo: function (e) {
    var url = e.target.dataset.targeturl;
    wx.navigateTo({
      url: url
    })
  },
  //跳转详情页
  toDetails: function (e) {
    var that = this;
    var data = that.data.mustVedioList;
    var index = e.target.dataset.index;
    data = JSON.stringify(data);
    wx.navigateTo({
      url: '/pages/partySchool/miniClass/course/detail/video/video?data=' + data + '&index=' + index,
    })
  }
})