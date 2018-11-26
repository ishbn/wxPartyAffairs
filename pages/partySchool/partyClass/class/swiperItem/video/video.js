var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colShow: true,//收藏出现效果
    colCancelShow: true,//取消收藏效果
    clickCol: true,//收藏是否可点击
    collect: "/images/partySchool_icon/collect.png",//收藏图标
    videoList: [],//视频
    num: '',//当前视频的数组下标
    pre: '',//上一个索引
    next: '',//下一个索引
    localUrl: '/pages/partySchool/partyClass/class/swiperItem/video/video',//当前文件所在地址
    turnToWay: 'navigateTo',//跳转方式
    currentTime: 0//当前视频播放位置
  },
  //点赞
  // addOne: function (e) {
  //   this.addWay(this);
  //   if (this.data.praise == "/images/partySchool_icon/zan.png") {
  //     this.setData({
  //       praise: "/images/partySchool_icon/zan1.png",
  //       show: !this.data.show
  //     });
  //     setTimeout(function () {
  //       this.setData({
  //         show: !this.data.show
  //       });
  //     }.bind(this), 1000)
  //   }
  //   else {
  //     this.setData({
  //       praise: "/images/partySchool_icon/zan.png",
  //       cancelShow: !this.data.cancelShow
  //     });
  //     setTimeout(function () {
  //       this.setData({
  //         cancelShow: !this.data.cancelShow
  //       });
  //     }.bind(this), 1000)
  //   }
  // },
  //收藏
  colOne: function () {
    var that = this;
    var isLogin = app.globalData.hadLogin;
    //检查登录状态
    if (!isLogin) {
      var localUrl = that.data.localUrl;
      var turnToWay = that.data.turnToWay;
      app.checkLogin(localUrl, turnToWay);
    } else {
      that.colWay(that);
      //点击效果
      if (that.data.collect == "/images/partySchool_icon/collect.png") {
        that.setData({
          collect: "/images/partySchool_icon/collect1.png",
          colShow: !that.data.colShow
        });
        setTimeout(function () {
          that.setData({
            colShow: !that.data.colShow
          });
        }.bind(that), 1000)
      }
      else {
        that.setData({
          collect: "/images/partySchool_icon/collect.png",
          colCancelShow: !that.data.colCancelShow
        });
        setTimeout(function () {
          that.setData({
            colCancelShow: !that.data.colCancelShow
          });
        }.bind(that), 1000)
      }
    }
  },
  //点赞延迟一秒点击
  // addWay: function (self) {
  //   self.setData({
  //     clickAdd: false
  //   })
  //   setTimeout(function () {
  //     self.setData({
  //       clickAdd: true
  //     })
  //   }, 1000)
  // },
  //收藏延迟一秒点击
  colWay: function (self) {
    self.setData({
      clickCol: false
    })
    setTimeout(function () {
      self.setData({
        clickCol: true
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var index = parseInt(options.index);
    var videoList = JSON.parse(options.data);
    //弹出“加载”框
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      videoList: videoList,
      num: index,
      pre: index - 1,
      next: index + 1
    })
    //调用隐藏加载框方法
    that.hideLoading();
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  //跳转
  targetTo: function (e) {
    var that = this;
    var data = that.data.videoList;
    var index = e.target.dataset.index;
    data = JSON.stringify(data);
    wx.redirectTo({
      url: './video?data=' + data + '&index=' + index,
    })
  },
  // videoTimeUpdate:function(e){
  //   var that = this;
  //   var currentTime = e.detail.currentTime;
  //   if (currentTime - that.data.currentTime>3){
  //     e.detail.currentTime = that.data.currentTime
  //     that.setData({
  //       currentTime: e.detail.currentTime
  //     })
  //   }else{

  //   }

  // },
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