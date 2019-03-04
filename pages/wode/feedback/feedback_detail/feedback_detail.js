// pages/wode/feedback/mysubmit/mysubmit.js
//引入wxparse进行富文本解析
var WxParse = require('../../../../utils/wxParse/wxParse.js');
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if(pahelper.isEmpty(id)){
      return;
    }
    that.requestData(id);
   
  },
  requestData:function(id){
    var that = this;
    var url = "/feedback/getFeedbackById";
    var data = { feedbackId:id};
    commonUtils.ajaxRequest(url,data,1,1).then(that.resultData);
  },
  resultData:function(res){
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      that.setData({
        feedback: result
      });
      // 解析反馈内容
      WxParse.wxParse('content', 'html', that.data.feedback.content, that);
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
  
  }
})