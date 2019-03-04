// pages/wode/feedback/feedback_home/feedback_home.js
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    more: true,
    feedback_type_index: 0,
    feedback_type: [],
    feedback: {
      feedbackType: '',
      title: '',
      content: '',
      userId:''
    },
    maxlength: 1024,
    feedback_list: [],
    pageNum:1,
    num:10,
    reqMore:true,
    localUrl:"/pages/wode/feedback/feedback_home/feedback_home",
    feedbackDetailUrl:"/pages/wode/feedback/feedback_detail/feedback_detail"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var thisUrl = that.data.localUrl;
    if (!paValidUtil.checkLogin(thisUrl , 2)) {
      return;
    }

    var userId = app.globalData.userInfo.userId;
    var fb = that.data.feedback;
    fb.userId = userId;
    that.setData({
      feedback: fb
    });

    var url = "/feedback/getFeedbackType";
    //获取反馈类型
    commonUtils.ajaxRequest(url,"",0,1).then(that.getFeebBackType);
  },
  getFeebBackType:function(res){
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      that.setData({
        feedback_type: result
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
    var that = this;
      var tag =that.data.currentTab;
      var canMore = that.data.reqMore;
    if (tag == 1 && canMore ){
        var nextpageNum = that.data.pageNum+1;
        that.setData({
          pageNum: nextpageNum
        });
      that.getFeedbackList();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**点击提交 */
  dosubmit: function () {
    var that = this;
    //检查输入项
    var error = that.docheck();
    // console.log(error);
    if (error) {
      return;
    }
    console.log(that.data.feedback);
    var url ="/feedback/insertFeedback";
    var data=that.data.feedback;
    commonUtils.ajaxRequest(url,data,2,0).then(that.subResult);
  },
  subResult:function(res){
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data;
      pahelper.showToast(result.msg);
      that.setData({
        feedback:{}
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  
  getFeedbackList: function () {
    var that =this;
    var pageNum = that.data.pageNum;
    var num = that.data.num;
    var canReqMore = that.data.reqMore;
    if (canReqMore){
      var url = "/feedback/getMyFeedbackList/" + pageNum + "/" + num;
      commonUtils.ajaxRequest(url, {}, 1, 0).then(that.getfeedbackList);
    }
  },
  getfeedbackList:function(res){
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      var canMore =true;
      var nowPage = that.data.pageNum;
      var totalPage = result.totalPageNum;
      if (nowPage >= totalPage){
        canMore=false;
      }
      var oldData = that.data.feedback_list;
      var proData = commonUtils.commonArrayAdd(oldData, result.list);
      that.setData({
        reqMore:canMore,
        feedback_list: proData
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  bindPickerChange: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    var feed = that.data.feedback;
    var type_f = that.data.feedback_type[e.detail.value].typeId;
    feed.feedbackType = type_f;
    this.setData({
      feedback_type_index: e.detail.value,
      feedback: feed
    });
  },
  /*更新选中的tab的值 */
  swichNav: function (e) {
    //sconsole.log(e);
    var that = this;
    var index = e.target.dataset.current;
    if (that.data.currentTab == index) {
      return false;
    } else {
      that.setData({
        currentTab: index
      });
      if (index == 1) {
        that.setData({
          feedback_list: [],
          pageNum:1,
          reqMore: true
        });
        // 请求反馈列表
        that.getFeedbackList();
      }
    }

  },

  /**标题输入处理 */
  titleInput: function (e) {
    // console.log(e)
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.title = data;
    that.setData({
      feedback: fb
    })
  },
  /**内容输入赋值 */
  contentInput: function (e) {
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.content = data;
    that.setData({
      feedback: fb
    })
  },
  docheck: function () {
    var that = this;
    var data = that.data.feedback;
    if (data.feedbackType === '') {
      that.showError('类型不能为空');
      return true;
    }
    if (data.title === '') {
      that.showError('标题不能为空');
      return true;
    }
    if (data.content === '') {
      that.showError('内容不能为空');
      return true;
    }
    return false;
  },
  showError: function (e) {
    wx.showToast({
      title: e,
      icon: 'none'
    })
  }
})