// pages/organization/detailsAibum/detailsAlbum.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nothing: false,
    imgurl: 'http://172.21.95.5:19091/',
    serverurl: app.globalData.serverAddress,
    coverimg: "https://www.zqu.edu.cn/_mediafile/zquwww/2018/07/13/2d09sy3ajl.jpg",
    title: "肇庆学院智慧党建系统",
    description: "肇庆学院智慧党建系统建设完成",
    num: 4,
    photowalls: {

    },
    photos: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    //设置标题，描述以及照片数量
    this.setData({
      num: options.num
    });

    // 向服务器请求该id的详情与所有照片
    this.getDetails(options.id)

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

  /**
   * 照片预览与放大
   */
  seeme: function(e) {
    var currentimg = e.currentTarget.dataset.src;
    var imgs = this.data.photos;
    wx.previewImage({
      current: currentimg, //http链接才有效，否则无法加载
      urls: imgs
    })
  },


  /**
   * 请求对应ID的相册详情
   */
  getDetails: function(albumID) {
    var that = this;
    var url = 'partyalbum/picture/' + albumID;
    commonUtils.commonAjax(url, "", 1).then(that.getTheData);
  },
  getTheData: function(res) {
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      if (res.data.data.pictures.length == 0) {
        that.setData({
          nothing: true
        })
      }

      that.setData({
        photowalls: res.data.data
      });
      /**
       * 将照片单独集合成一个数组，供图片预览用
       */
      for (var i = 0; i < that.data.photowalls.pictures.length; i++) {
        var imgurl = that.data.imgurl + that.data.photowalls.pictures[i].image;
        that.data.photos.push(imgurl)
      }
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  }
})