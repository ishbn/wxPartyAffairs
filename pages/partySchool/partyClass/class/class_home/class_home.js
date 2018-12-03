var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//中间轮播图的编号
    count:0, //必学课程数
    classTargetUrl:"/pages/partySchool/partyClass/class/swiperItem/chapter/chapter",//课程跳转地址
    look: "/images/partySchool_icon/look.png", //浏览图标
    localUrl:'/pages/partySchool/partyClass/class/class_home/class_home',//本地路径
    turnToWay:'navigateTo',//跳转方式
    allVedioList:[],//所有视频
    mustVedioList:[],//必学视频
  },
  //轮播图中间图片的编号
  swiperChange(e) {
    this.setData({
      currentTab:e.detail.current
    })
  },
  //全部视频
  targetTo: function (e){
    var url = e.target.dataset.targeturl;
    wx.navigateTo({
      url: url
    })
  },
  //跳转详情页
  toDetails:function(e){
    var that = this;
    var data = that.data.mustVedioList;
    var index = e.target.dataset.index;
    data = JSON.stringify(data);
    wx.navigateTo({
      url: '/pages/partySchool/partyClass/class/swiperItem/video/video?data=' + data + '&index=' + index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isLogin = app.globalData.hadLogin;
    //检查登录状态
    if (!isLogin) {
      var localUrl = that.data.localUrl;
      var turnToWay = that.data.turnToWay;
      app.checkLogin(localUrl, turnToWay);
    }
    else {
      //弹出“加载”框
      wx.showLoading({
        title: '加载中',
      })
      //检查网络并加载数据
      that.checkNetAndDoRequest();
    }
  },
  //检查网络状态并发起数据请求
  checkNetAndDoRequest: function (id) {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        //获取网络类型
        var networkType = res.networkType;
        //如果为空
        if (networkType == null) {
          wx.showToast({
            title: '加载失败，网络出现问题',
            icon: 'none'
          });
        } else {
          //确认网络正常，加载文档集合
          that.getMustVedioList();
        }

      },
    })
  },
  //获取必学视频
  getMustVedioList:function(){
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_study_videos_must.do',
      method: 'POST',
      data: {
        page: '1',
        pageNum: '1000'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": app.globalData.header.Cookie
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            mustVedioList: res.data.data.list,
            count:res.data.data.list.length
          })
          //获取最新视频
          that.getAllVedioList();
        }
      },
      fail: function (res) {
        console.log('标签获取失败' + res);
      }
    })
  },
  //获取所有视频
  getAllVedioList:function(){
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_study_videos.do',
      data: {
        page: '1',
        pageNum: '6'
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": app.globalData.header.Cookie
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            allVedioList:res.data.data.list
          })
        }
        //全部加载完成，隐藏加载框
        that.hideLoading();
      },
      fail: function (res) {
        console.log('文档获取失败' + res);
      }
    })
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
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