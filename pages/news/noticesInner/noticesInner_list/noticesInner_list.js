// pages/news/noticesInner/noticesInner_list/noticesInner_list.js
var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localUrl:'/pages/news/noticesInner/noticesInner_list/noticesInner_list',
    notices_list: null,
    canShow: false,
    pageNum: 1,     //当前页数
    totalPageNum: '',//总页数
    notices_length: 6,   //一页的条数
    more: true,
    currentTab: 0,//中间轮播图的编号
    broadcast: [],
    innnerDetailUrl:"/pages/news/noticesInner/noticeInner_detail/noticeInner_detail"

  },
  //轮播图中间图片的编号
  swiperChange(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //检查登录
    paValidUtil.checkLogin(that.data.localUrl,2);

    // 发起数据刷新网络请求
    that.getNoticesList();
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
    var that = this;
    that.getNoticesList();
    commonUtils.commonPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 是否达到最大页数，是则显示没有更多，否则继续请求数据
    if (that.data.pageNum >= that.data.totalPageNum) {
      that.setData({
        more: false
      });
    } else {
      that.getMoreNotices();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getNoticesList: function () {
    var that = this;
    // 刷新恢复第一页
    that.setData({
      pageNum: 1
    });
    //显示条数
    var notices_length = that.data.notices_length;
    //页数
    var noticesPage = that.data.pageNum;
    var url = 'noticesMenu/party/' + noticesPage + '/' + notices_length;
    commonUtils.commonAjax(url, "", 1).then(that.getTheListData);
  },
  getTheListData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //获取到的数据
      var list = paValidUtil.checkImgPath(res.data.data.list);
      //更新滑块的数据
      that.setBroadcast(list);

      // 更新数据
      that.setData({
        canShow: true,
        notices_list: list,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum
      });
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  /**更新滑块部分的数据 */
  setBroadcast: function (array) {
    var that = this;
    //原来的数组
    var borad = [];
    // 取四条数据或者更小
    var maxLength = (array.length < 4) ? array.length : 4;
    //压进原来的数组
    for (var i = 0; i < maxLength; i++) {
      borad.push(array[i]);
    }
    // 更新数据
    that.setData({
      broadcast: borad
    });
  },
  /**加载更多数据 */
  getMoreNotices() {
    var that = this;
    //显示新闻条数
    var notices_length = that.data.notices_length;
    // 新闻页数
    var noticesPage = that.data.pageNum + 1;
    var url = 'noticesMenu/party/' + noticesPage + '/' + notices_length;
    commonUtils.commonAjax(url,"",1).then(that.getTheMoreData);
  },
  getTheMoreData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //获取到的数据,图片处理
      var list = paValidUtil.checkImgPath(res.data.data.list);
      var array = commonUtils.commonArrayAdd(that.data.notices_list, list);
      // 更新数据
      that.setData({
        notices_list: array,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum
      });
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  toNoticeDetail: function (res) {
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/noticesInner/noticeInner_detail/noticeInner_detail?notice_id=' + id,
      fail: function (res) {
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none'
        })
      }
    })
  }



})