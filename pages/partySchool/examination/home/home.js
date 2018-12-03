var app = getApp();
Page({

  data: {
    currentTab: 0, //预设当前项的值
    examing:[],//待考
    examed: [],//已考
    loadLength:60,//加载区域高度值
    localUrl:'/pages/partySchool/examination/home/home',//当前文件所在地址
    turnToWay:'navigateTo',//跳转方式
    examDescUrl:'/pages/partySchool/examination/content/content', //考试说明地址
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isLogin = app.globalData.hadLogin;
    //检查登录状态
    if(!isLogin){
      var localUrl = that.data.localUrl;
      var turnToWay = that.data.turnToWay;
      app.checkLogin(localUrl,turnToWay);
    }
    else{
      //弹出“加载”框
      wx.showLoading({
        title: '加载中',
      })
    //检查网络状态并发起数据请求 
      that.checkNetAndDoRequest();
    }
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  //检查网络状态并发起数据请求
  checkNetAndDoRequest:function(){
    var that = this;
    wx.getNetworkType({
      success: function(res) {
        //获取网络类型
        var networkType = res.networkType;
        //如果为空
        if(networkType == null){
          wx.showToast({
            title: '加载失败，网络出现问题',
            icon: 'none'
          });
        }else{
          //确认网络正常，加载待考考试集合
          that.getExamingList();
        }

      },
    })
  },
  //获取待考考试数据集合
  getExamingList: function(){
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add +'examlist/unfinish',
      header: app.globalData.header,
      success: function(res){
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0){
          that.setData({
            examing: res.data.data
          })
        }
        //加载完待考，加载已考
        that.getExamedList();
      },
      fail: function(res){
        console.log('待考数据请求失败'+ res);
      }
    })
  },
  //获取已考考试数据集合
  getExamedList: function(){
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'examlist/finish',
      header: app.globalData.header,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            examed: res.data.data
          })
        }
        //确认所有数据加载完毕，隐藏加载框
        that.hideLoading();
      },
      fail: function (res) {
        console.log('已考数据请求失败' + res);
      }
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //页面跳转
  menuTargetTo: function (e) {
    var that = this;
    var url = e.target.dataset.targeturl;
    var examId = e.target.dataset.examid;
    wx.navigateTo({
      url: url+'?examId='+examId
    })
  }
})