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
    videoDetail:"/pages/partySchool/miniClass/course/detail/video/videoui",
    documentUrl: "/pages/partySchool/document/document",//文档详情路径
    mustLearnDocumentList:[],//必学文档集合
    mustLearnVedioList:[],//必学视频集合
    isEncode: false,//编码标识符
    docIsHaveMore: true,//是否加载更多
    videoIsHaveMore: true,//是否加载更多
    docCurrentPage: 1,//当前页码
    pageNum: 15,//请求长度
    learningCount:0,//未学视频数量
    learnedCount:0,//已学视频数量
    learningHeight:0,//未学视频高度
    learnedHeight:0,//已学视频高度
    downIcon:"/images/partySchool_icon/arrow.png",
    nullIcon:"/images/partySchool_icon/null.png",
    requiredIcon:"/images/partySchool_icon/required.png",

    videosPage:{
      pageNum:1,
      pageSize:15,
      userId:''
    },
    docPage:{
      pageNum:1,
      pageSize:15,
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
    console.log(data);
    commonUtils.ajaxRequest(url,data,1,0).then(that.getTheDataList);
  },
  getTheDataList: function(res) {
     var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      // 总页数
      var totalPage = result.totalPage;
      //当前页数
      var nowPageNum = that.data.videosPage.pageNum;
      var canReqMore = true;
      if (totalPage <= nowPageNum) {
        canReqMore = false;
      }
     
      var list = result.list;
      var oldData = that.data.mustLearnVedioList;
      var resdata = commonUtils.commonArrayAdd(oldData, list);
      that.setData({
        mustLearnVedioList: resdata,
        videoIsHaveMore: canReqMore
      });
      //待解决已学在学未学。
      var learningCount = 0, learnedCount = 0;
      var localList = that.data.mustLearnVedioList
      // for (var i = 0; i < localList.length; i++) {
      //   if (localList[i].schedule < 100)
      //     learningCount++;
      //   else
      //     learnedCount++;
      // }
      learningCount = localList.length;
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
    console.log(data);
    commonUtils.ajaxRequest(url, data, 1, 1).then(that.getTheDocumentList);
  },
  getTheDocumentList: function (res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      // 总页数
      var totalPage = result.totalPage;
      //当前页数
      var nowPageNum = that.data.docPage.pageNum;
      var canReqMore = true;
      if (totalPage <= nowPageNum) {
        canReqMore = false;
      }
      var list = result.list;
      var oldData = that.data.mustLearnDocumentList;
      var resdata = commonUtils.commonArrayAdd(oldData, list);
      that.setData({
        docIsHaveMore: canReqMore,
        mustLearnDocumentList: resdata
      });
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
    var currentTab = that.data.currentTab;
    //判断是否加载跟多
    if(currentTab ==0){
      if (that.data.videoIsHaveMore) {
          var videoParam = that.data.videosPage;
          videoParam.pageNum += 1;
          that.setData({
            videosPage: videoParam
          }); 
         that.getMustLearnVideoList();
      }
    }else{
      if (that.data.docIsHaveMore) {
        var docParam = that.data.docPage;
        docParam.pageNum +=1;
        that.setData({
          docPage: docParam
        });
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
  },
  toDetails:function(e){
    var that = this;
    console.log(e);
    var index = e.target.dataset.index;
    var vid = that.data.mustLearnVedioList[index].videoId;
    pahelper.navigateTo(that.data.videoDetail + "?id=" + vid);
  }

})