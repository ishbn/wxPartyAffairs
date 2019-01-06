// pages/organization/detailsActivity/detailsActivity.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    state: null,
    deletenum: null,
    phonenum: null,
    details: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      state: options.state,
      deletenum: options.deletenum
    });

    //请求这个ID对应的活动详情
    this.askForDetails(options.id)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  cancel: function() {
    //向服务器发送状态改变，取消报名
    var that = this;
    var id = that.data.details.activityId;
    var url = 'partyActivity/deletApply/' + id;
    commonUtils.commonAjax(url, "", 2).then(that.getTheDetailData);
  },
  getTheCancelReult: function(res) {
    if (res.statusCode == 200 && res.data.status == 0) {
      pahelper.showToast('取消成功');
      // 返回活动界面
      pahelper.navigateBack(3);
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  confirm: function() {
    //报名，获得该活动id发到后台进行用户与该活动的关联
    console.log("用户报名id为：" + this.data.details.activityId + "的活动")
    var that = this;
    var id = that.data.details.activityId;
    var url = 'partyActivity/applyInfo/' + id;
    //请求报名，后台返回是否可以进行报名
    commonUtils.commonAjax(url, "", 2).then(that.getTheDetailData);
  },
  confirnResult: function(res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //可报名
      console.log(res.data.msg)
      //跳转到报名表单
      that.showDialogBtn()
    } else if (res.data.status == 1) {
      //已报名，等待审核
      console.log(res.data.msg)
      //不进行操作
      pahelper.showToast('请等待审核');
    }
  },
  //向服务器请求活动详情
  askForDetails: function(id) {
    var that = this;
    var url = 'partyActivity/info/' + id;
    commonUtils.commonAjax(url, "", 2).then(that.getTheDetailData);
  },
  getTheDetailData: function(res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        details: res.data.data
      });
      //富文本
      WxParse.wxParse('details.content', 'html', that.data.details.content, that, 5);
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  //模态框响应事件
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    //提交表单信息到服务器进行报名
    this.signup(this.data.details.activityId, this.data.phonenum)
    this.hideModal();
    // 返回活动界面
    pahelper.navigateBack(1);

  },

  /**
   * 获得输入的电话号码
   */
  inputChange: function(e) {
    this.setData({
      phonenum: e.detail.value
    })
  },

  /**
   * 报名
   */
  signup: function(activityId, phonenum) {
    var that = this;
    var url = 'partyActivity/apply?activityId=' + activityId + "&phoneNum=" + phonenum;
    commonUtils.commonAjax(url, "", 2).then(res=>{
      if (res.statusCode == 200 && res.data.status == 0) {
        pahelper.showToast('报名成功');
      }else{
        commonUtils.commonTips(res.statusCode);
      }
    });
    // wx.request({
    //   url: that.data.serverurl + 'partyActivity/apply',
    //   data: "activityId=" + activityId + "&phoneNum=" + phonenum,
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     Cookie: app.globalData.header.Cookie
    //   },
    //   success: function(res) {
    //     console.log("报名后", res)
    //     pahelper.showToast('报名成功');
    //   }
    // })
  }

})