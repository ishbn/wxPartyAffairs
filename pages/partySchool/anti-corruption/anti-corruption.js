var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clear: true, //清除icon的状态
    first_click: false, //第一次点击
    inputVal: '', //输入框的值
    menu: "/images/partySchool_icon/menu.png", //菜单图标
    menuIcon: "/images/partySchool_icon/menu.png",
    menuIcon1: "/images/partySchool_icon/menu1.png",
    nullIcon:"/images/partySchool_icon/null.png",
    documentUrl: "/pages/partySchool/document/document", //文档详情路径
    open: false, //下拉框的状态
    labelList: [], //所有标签
    docList: [], //所有文档
    isEncode: false, //编码标识符
    labelId: '3', //文档标签的id
    isHaveMore: true, //是否加载更多
    currentPage: 1 //当前页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //加载文档集合
    that.getDocumentList(that.data.labelId);
  },

  //获取文档集合
  getDocumentList: function(labelId) {
    var that = this;
    var url = 'study/get_study_documents_by_label_id.do';
    var reqData = {
      label_id: [labelId],
      page: that.data.currentPage, //当前页码
      pageNum: 10 //每页显示8条记录
    };
    commonUtils.ajaxRequest(url, reqData, 2, 2).then(that.processResult);
  },
  processResult: function(res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      var result = res.data.data;
      var producedata = that.changeFormat(result.list);
      //判断是否显示‘加载更多’
      var totalPage = result.totalPage;
      var nowPage = that.data.currentPage;
      var canReq = true;
      if (nowPage >= totalPage) {
        canReq = false;
      } 
      var oldData = that.data.docList;
      var resData = commonUtils.commonArrayAdd(oldData, producedata);
      that.setData({
        isHaveMore: canReq,
        docList: resData
      });
      //加载完文档，加载标签集合
      that.getLabelList();
    } else {
      commonUtils.commonTips(res.statusCode);
    }

  },
  //获取标签集合
  getLabelList: function () {
    var that = this;
    var url = 'study/get_labels.do';
    commonUtils.commonAjax(url, "", 2).then(that.processLabelResult);
  },
  processLabelResult: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        labelList: res.data.data
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  //点击蒙层恢复
  hiddenShadow: function() {
    this.setData({
      open: !this.data.open
    });
    if (this.data.menu === that.data.menuIcon) {
      this.setData({
        menu: that.data.menuIcon1
      })
    } else {
      this.setData({
        menu: that.data.menuIcon
      })
    }
  },
  //转换时间格式
  changeFormat: function(data) {
    for (var i = 0; i < data.length; i++) {
      var time = data[i].updateTime;
      var arr = time.split('-');
      arr[1] = arr[1] + '/';
      arr[1] = arr[1] + arr[2];
      data[i].updateTime = arr;
    }
    return data;
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
    var that = this;
    //判断是否加载跟多
    if (that.data.isHaveMore) {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
      //加载文档集合
      that.getDocumentList(that.data.labelId);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //禁止滑动
  banSlide: function () { },
  //输入框显示清除按键
  showClear: function (e) {
    var value = e.detail.value;
    if (value != '') {
      this.setData({
        inputVal: value,
        clear: false
      })
    } else {
      this.setData({
        clear: true
      })
    }
  },
  //清除输入框中的内容
  clearVal: function () {
    this.setData({
      inputVal: '',
      clear: true
    })
  },
  //显示下拉框
  showitem: function () {
    var that = this;
    // 第一次点击菜单
    if (!that.data.first_click) {
      that.setData({
        first_click: true
      });
    }
    that.setData({
      open: !that.data.open,
    });
    if (that.data.menu === that.data.menuIcon) {
      that.setData({
        menu: that.data.menuIcon1
      })
    } else {
      that.setData({
        menu: that.data.menuIcon
      })
    }

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    //判断是否隐藏蒙层
    if (that.data.open)
      that.hiddenShadow();

    //初始化
    that.setData({
      labelId: e.target.dataset.labelid,
      currentPage: 1,
      docList: [],
      isHaveMore: true
    })
    that.getDocumentList(that.data.labelId);
  }
})