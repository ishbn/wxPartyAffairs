var commonUtils = require("../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../utils/paValidUtil.js");
var pahelper = require("../../../../utils/pahelper.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clear:true,//清除icon的状态
    first_click: false,//第一次点击
    inputVal:'',//输入框的值
    menu: "/images/partySchool_icon/menu.png", //菜单图标
    menuIcon: "/images/partySchool_icon/menu.png",
    menuIcon1: "/images/partySchool_icon/menu1.png",
    documentUrl:"../../document/document",//文档详情路径
    open:false, //下拉框的状态
    height: 0,//内容高度
    oneEducation: 410,//一个文档的高度
    labelList:[],//所有标签
    documentList:[],//所有文档
    isEncode: false,//编码标识符
    id:'1',//文档标签的id
    isHaveMore: true,//是否加载更多
    currentPage: 1//当前页码
  },
  //禁止滑动
  banSlide: function () {
  },
  //输入框显示清除按键
  showClear: function(e){
    var value = e.detail.value;
    if(value!=''){
      this.setData({
        inputVal:value,
        clear: false
      })
    }else{
      this.setData({
        clear: true
      })
    }
  },
  //清除输入框中的内容
  clearVal: function(){
    this.setData({
      inputVal:'',
      clear:true
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
    if (that.data.menu ==="/images/partySchool_icon/menu.png"){
      that.setData({
        menu: "/images/partySchool_icon/menu1.png"
      })
    }else{
      that.setData({
        menu: "/images/partySchool_icon/menu.png"
      })
    }
    
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    //判断是否隐藏蒙层
    if (that.data.open)
    that.hiddenShadow();
    //弹出“加载”框
    wx.showLoading({
      title: '加载中',
    })
    //初始化
    that.setData({
      id: e.target.dataset.labelid,
      currentPage: 1,
      documentList: [],
      isHaveMore: true
    })
    that.getDocumentList(that.data.id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getDocumentList(that.data.id);
  },
  //获取标签集合
  getLabelList: function () {
    var that = this;
    var url = 'study/get_labels.do';
    commonUtils.commonAjax(url, "", 2).then(that.getLabelResult);
  },
  getLabelResult: function (res) {
    console.log(res);
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        labelList: res.data.data
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  //获取文档集合
  getDocumentList: function (id) {
    var that = this;
    var url = 'study/get_study_documents_by_label_id.do';
    var data = {
      label_id: [id],
      page: that.data.currentPage,//当前页码
      pageNum: 8//每页显示8条记录
    };
    commonUtils.ajaxRequest(url,data,2,2).then(that.processResult);
  },
  processResult: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //判断是否显示‘加载更多’
      if (res.data.data.totalPage == that.data.currentPage) {
        that.setData({
          isHaveMore: false
        })
      }
      that.setData({
        documentList: that.data.documentList.concat(res.data.data.list)
      });
      //加载完文档，加载标签集合
      that.getLabelList();
    } else {
      commonUtils.commonTips(res.statusCode);
    }
   
  },
  //点击蒙层恢复
  hiddenShadow: function(){
    var that = this;
    that.setData({
      open: !that.data.open
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
  //跳转
  targetTo: function(e){
    var that = this;
    var index = e.target.dataset.index
    var docList = that.data.documentList;
    if(that.data.isEncode == false){
      for (var i = 0; i < docList.length;i++){
        docList[i].filePath = encodeURIComponent(docList[i].filePath);
      }
      //编码判断符
      that.setData({
        isEncode: true
      })
    }
    docList = JSON.stringify(docList);
    wx.navigateTo({
      url: that.data.documentUrl + '?data=' + docList + '&index=' + index,
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
    var that = this;
    //判断是否加载跟多
    if (that.data.isHaveMore){
      that.setData({
        currentPage: that.data.currentPage+1
      })
      that.getDocumentList(that.data.id);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})