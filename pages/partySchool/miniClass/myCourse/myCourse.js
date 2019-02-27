var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    rotate:true,//未学下拉箭头状态
    rotate1: false,//已学下拉箭头状态
    localUrl: '/pages/partySchool/miniClass/myCourse/myCourse',//当前文件所在地址
    documentUrl: "/pages/partySchool/document/document",//文档详情路径
    mustLearnDocumentList:[],//必学文档集合
    mustLearnVedioList:[],//必学视频集合
    isEncode: false,//编码标识符
    docIsHaveMore: true,//是否加载更多
    docCurrentPage: 1,//当前页码
    pageNum: 15,//请求长度
    learningCount:0,//未学视频数量
    learnedCount:0,//已学视频数量
    learningHeight:0,//未学视频高度
    learnedHeight:0,//已学视频高度
    downIcon:"/images/partySchool_icon/arrow.png",
    nullIcon:"/images/partySchool_icon/null.png",
    requiredIcon:"/images/partySchool_icon/required.png",
    docFirstOrMore:1,

    videosPage:{
      pageNum:1,
      pageSize:15,
      totalPage:0,
      userId:''
    },
    docPage:{
      pageNum:1,
      pageSize:15,
      totalPage:0,
      userId: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var localUrl = that.data.localUrl;
    if (!paValidUtil.checkLogin(localUrl,1)){
      return;
    }
    var userInfo = app.globalData.userInfo;
    var userId = userInfo.userId;
    var videoParam = that.data.videosPage;
    var docParam = that.data.docPage;
    videoParam.userId = userId;
    docParam.userId = userId;
    that.setData({
      videosPage: videoParam,
      docPage: docParam
    });
      that.getMustLearnVideoList();
     that.getMustLearnDocumentList();
  },
 
  //获取必学视频
  getMustLearnVideoList: function () {
    var that = this;
    var url = 'study/get_study_video_must_byUserId.do';
    var data = that.data.videosPage;
    commonUtils.ajaxRequest(url,data,1,0).then(that.getTheDataList);
  },
  getTheDataList: function(res) {
     var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        mustLearnVedioList: res.data.data.list
      })
      var learningCount = 0, learnedCount = 0;
      var list = that.data.mustLearnVedioList
      for (var i = 0; i < list.length; i++) {
        if (list[i].schedule < 100)
          learningCount++;
        else
          learnedCount++;
      }
      that.setData({
        learningCount: learningCount,
        learnedCount: learnedCount,
        learningHeight: (learningCount ? learningCount : 1) * 150,
        learnedHeight: (learnedCount ? learnedCount : 1) * 150
      })
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  //获取文档集合
  getMustLearnDocumentList: function () {
    var that = this;
    var url = 'study/get_study_documents_must_byUserId.do';
    var data = that.data.docPage;
    commonUtils.ajaxRequest(url, data, 1, 1).then(that.getTheDocumentList);
  },
  getTheDocumentList: function (res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var canReqMore = true;
      if (res.data.data.totalPage <= that.data.docCurrentPage) {
        canReqMore = false;
      }
      //1--首次请求 2--追加
      if (that.data.docFirstOrMore == 1){
        that.setData({
          docIsHaveMore: canReqMore,
          mustLearnDocumentList: res.data.data.list
        });
      }else{
        that.setData({
          docIsHaveMore: canReqMore,
          mustLearnDocumentList: that.data.mustLearnDocumentList.concat(res.data.data.list)
        });
      }
      
    }else{
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
    var that = this;
    //判断是否加载跟多
    if(currentTab ==1){
      console.log("我的视频学习待完善");
      that.getMustLearnVideoList();
    }else{
      if (that.data.docIsHaveMore) {
        that.setData({
          docFirstOrMore: 2,
          docCurrentPage: that.data.docCurrentPage + 1
        })
        that.getMustLearnDocumentList();
      }
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    var tabId = e.target.dataset.current;
    that.setData({
      currentTab: tabId
    });
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //展示未学下拉列表
  showContent: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    if (that.data.rotate) {
      animation.height(0).step()
    } else {
      animation.height(that.data.learningHeight + 'rpx').step()
    }
    that.setData({
      rotate: !that.data.rotate,
      learningAnimation: animation.export(),
    })
  },
  //展示已学下拉列表
  showContent1: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    if (that.data.rotate1) {
      animation.height(0).step()
    } else {
      animation.height(that.data.learnedHeight + 'rpx').step()
    }
    that.setData({
      rotate1: !that.data.rotate1,
      learnedAnimation: animation.export(),
    })
  }

})