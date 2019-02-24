// pages/organization/eventAlbum/eventAlbum.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foldimg: "/images/icon_function/preFold.png",
      foldIcon:"/images/icon_function/fold.png",
      preFoldIcon:"/images/icon_function/preFold.png",
      targeturl : "/pages/organization/albumDetails/albumDetails",
    isShow: "none",
    species: [{
        id:1,
        btnName: "全部",
        targetword: "all"
      },
      {
        id: 2,
        btnName: "党委",
        targetword: "party"
      },
      {
        id: 3,
        btnName: "工会",
        targetword: "union"
      },
      {
        id: 4,
        btnName: "团委",
        targetword: "league"
      }
    ],
    contents: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.askforalbumlist(options.branchid);
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

  // 菜单折叠
  foldclick: function(e) {
    var preShow = e.currentTarget.dataset.show;
    var nowShow = (preShow == "flex" ? "none" : "flex");
    this.setData({
      isShow: nowShow
    });
    if (nowShow == "flex")
      this.setData({
        foldimg:that.data.flodIcon
      });
    if (nowShow == "none")
      this.setData({
        foldimg: that.data.preFold
      });
  },

  // 选择分类
  selectspecies: function() {

  },

  // 进入对应的详情页
  targetToDetails: function(e) {
    var that = this;
    var targeturl = that.data.targeturl;
    var id = e.currentTarget.dataset.detailsid;
    var num = e.currentTarget.dataset.num;
    var url = targeturl + "?id=" + id + "&num=" + num;
    pahelper.navigateTo(url);
  },

  //发起网络请求
  askforalbumlist: function(branchID)
  {
    var that = this;
    var url = 'partyalbum/' + branchID;
    commonUtils.commonAjax(url, "", 1).then(that.getTheData);
  },
  getTheData: function (res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 &&res.data.status == 0 ) {
      var list = paValidUtil.patchImg(4,res.data.data);
      that.setData({
        contents: res.data.data
      })
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  }

})