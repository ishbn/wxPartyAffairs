// pages/wode/thoughtreport/thoughtreport.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var app =getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    local: '/pages/wode/thoughtreport/thoughtreport',
    havedata:false,
    maxlength:4000,
    currentTab: 0,
    report: {
      title: '',
      content: '',
      date:''
    },
    myreports:[],
    pageNum: 1,     //当前页数
    totalPageNum: '',//总页数
    num: 10,   //一页的条数
    more: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 验证登录
    if (!paValidUtil.checkLogin(that.data.local, 2)) {
      return;
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
    var that = this;
    //如果在编辑栏，禁止刷新
    if(that.data.currentTab == 0){
      wx.stopPullDownRefresh();
      return;
    }
    // 请求查询思想报告列表
    that.getReportData();
    commonUtils.commonPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //如果在编辑栏，禁止刷新
    if (that.data.currentTab == 0) {
      return;
    }
    // 是否达到最大页数，是则显示没有更多，否则继续请求数据
    if (that.data.pageNum >= that.data.totalPageNum) {
      that.setData({
        more: false
      });
    } else {
      // 发起加载更多网络请求
      that.getMoreReportData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /*更新选中的tab的值 */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      if(that.data.currentTab == 1){
        that.getReportData();
      }
    }

  },

  /**标题输入处理 */
  titleInput: function (e) {
    var that = this;
    var fb = that.data.report;
    var data = e.detail.value;
    fb.title = data;
    that.setData({
      report: fb
    })
  },
  /**内容输入赋值 */
  contentInput: function (e) {
    var that = this;
    var fb = that.data.report;
    var data = e.detail.value;
    fb.content = data;
    that.setData({
      report: fb
    })
  },
  /**检查提交内容是否为空 */
  docheck: function () {
    var that = this;
    var data = that.data.report;
    if (data.title === '') {
      that.showCannotNull('标题');
      return true;
    }
    if (data.content === '') {
      that.showCannotNull('内容');
      return true;
    }
    //return false;
  },
  /**提交思想报告 */
  dosubmit:function(){
    var that = this;
    //检查输入项
    var error = that.docheck();
    var chdata = that.data.report;
    //设置提交时间
    chdata.date = new Date();
    that.setData({
      report: chdata
    });
    if (error) {
      return;
    }
    console.log(that.data.report);
    var url = 'report/insertReport/';
    commonUtils.commonAjax(url, that.data.report, 2).then(that.doReqSubmitResult);
  },
  doReqSubmitResult: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      // 提示提交成功
      that.showSuccessfull();
      var rep = {
        title: '',
        content: '',
        date: ''
      };
      // 清空输入框
      that.setData({
        report: rep
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  showCannotNull: function (e) {
    wx.showToast({
      title: e + '不能为空',
      icon: 'none'
    })
  },
  toDetail:function(e){
    var report_id = e.currentTarget.dataset.report_id;
    wx.navigateTo({
      url: '/pages/wode/thoughtreport_detail/thoughtreport_detail?report_id='+report_id,
    })
  },
  showSuccessfull:function(){
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 500,
      mask: true
    })
  },
  showError:function(tips){
    wx.showToast({
      title: tips,
      icon: 'none',
      duration: 500,
      mask: true
    })
  },
  
  getReportData: function () {
    var that = this;
    // 刷新恢复第一页
    that.setData({
      pageNum: 1
    });
    var page = that.data.pageNum;
    var num = that.data.num;
    var url = 'report/myReports/' + page + '/' + num;
    commonUtils.commonAjax(url, "", 2).then(that.getTheListData);
  },
  getTheListData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      var data = res.data.data.list;
      var flag = true;
      if (data.length < that.data.num) {
        flag = false;
      }
      that.setData({
        myreports: data,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum,
        more: flag,
        havedata: true
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  getMoreReportData:function(){
    var that = this;
    //显示新闻条数
    var length = that.data.num;
    // 新闻页数
    var page = that.data.pageNum + 1;
    var url = 'report/myReports/' + page + '/' + length;
    commonUtils.commonAjax(url, "", 2).then(that.getTheMoreData);
  },
  getTheMoreData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //获取到的数据
      var list = res.data.data.list;
      //合并数据
      var array = commonUtils.commonArrayAdd(that.data.myreports, list);
      // 更新数据
      that.setData({
        myreports: array,
        pageNum: res.data.data.pageNum,
        totalPageNum: res.data.data.totalPageNum
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  }
})