// pages/partySchool/testPage/testPage.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doc: {},//文档
    localUrl: '/pages/partySchool/testPage/testPage',
    dlBtn:"下载",
    dlStatus:0  //0-提示下载 1-取消下载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var document_id = options.id;
    var thisUrl = that.data.localUrl;
    if (!paValidUtil.checkLogin(thisUrl + "?id=" + document_id, 2)) {
      return;
    }
    var reqUrl = "study/get_study_document_details.do";
    var data = {
      document_id: document_id
    }
    commonUtils.commonAjax(reqUrl, data, 1).then(that.getTheDetail);    
  },
  getTheDetail: function (res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var detail = res.data.data;
      detail.coverImg = paValidUtil.checkSingleImgPath(detail.coverImg);
      that.setData({
        doc: detail
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
  clickDownload:function(res){
    var that= this;
    var status = 0,dlText="";
    var dlStatus = that.data.dlStatus;
    if (dlStatus == 0){
      status = 1;
      dlText ="取消下载";
      that.setData({
        dlBtn: dlText,
        dlStatus: status
      });
      var filePath = "";
      var url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521176852694&di=b94e169374fa2f6a62bffd6f2ebe2563&imgtype=0&src=http%3A%2F%2Fs8.rr.itc.cn%2Fr%2FwapChange%2F20166_1_11%2Fa04n260322701725855.jpg";
      pahelper.downloadFile(url, filePath);
    } else {
      status = 0;
      dlText = "下载";
      that.setData({
        dlBtn: dlText,
        dlStatus: status
      });
      // pahelper.cancelDownload();
    }
    // pahelper.downloadFile(that.data.filePath);
  }
})