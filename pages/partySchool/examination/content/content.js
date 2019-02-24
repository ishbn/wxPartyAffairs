var app = getApp();
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:100,//总分
    desc: "在规定时间内完成考试考试期间，个人认真答题，切勿作弊。",//考试说明
    exam: {},//一场考试信息
    localUrl: '/pages/partySchool/examination/content/content',
    targetUrl: '/pages/partySchool/examination/exampaper/exampaper',//考试详情页地址
    turnToWay:'navigateTo'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!paValidUtil.checkLogin(that.data.localUrl,1)){
      return;
    }

    var id = options.examId;
    if (id == null || id == undefined || id == ""){
      return;
    }
     //获取待考考试数据集合
    that.getExamingObject(id);
  },
 
  //获取待考考试对象
  getExamingObject: function(id){
    var that = this;
    var url = 'examlist/' + id;
    commonUtils.commonAjax(url,"",1).then(that.callback);
  },
  callback: function (res) {
    var that = this;
    console.log(res.data.data);
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        exam: res.data.data,
      });
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  //跳转考试界面
  targetTo: function(){
    var that = this;
    var examID = that.data.exam.examId;
    var targetUrl = that.data.targetUrl;
    var singleScore = that.data.exam.singleScore;
    var multipleScore = that.data.exam.multipleScore;
    wx.navigateTo({
      url: targetUrl + '?examID=' + examID + '&singleScore=' + singleScore + '&multipleScore=' + multipleScore,
    })
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
})