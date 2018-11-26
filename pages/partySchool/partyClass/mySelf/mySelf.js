var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    rotate:true,//未学下拉箭头状态
    rotate1: false,//已学下拉箭头状态
    localUrl: '/pages/partySchool/partyClass/mySelf/mySelf',//当前文件所在地址
    documentUrl: "../../document/document",//文档详情路径
    turnToWay: 'navigateTo',//跳转方式
    mustLearnDocumentList:[],//必学文档集合
    mustLearnVedioList:[],//必学视频集合
    isEncode: false,//编码标识符
    isHaveMore: true,//是否加载更多
    currentPage: 1,//当前页码
    learningCount:0,//未学视频数量
    learnedCount:0,//已学视频数量
    learningHeight:0,//未学视频高度
    learnedHeight:0//已学视频高度
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //展示未学下拉列表
  showContent:function(){
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'

    })
    if (that.data.rotate) {
      animation.height(0).step()
    } else {
      animation.height(that.data.learningHeight+'rpx').step()
    }
    that.setData({
      rotate: !that.data.rotate,
      learningAnimation: animation.export(),
    })
  },
  //展示已学下拉列表
  showContent1: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'

    })
    if (that.data.rotate1) {
      animation.height(0).step()
    } else {
      animation.height(that.data.learnedHeight + 'rpx').step()
    }
    that.setData({
      rotate1: !that.data.rotate1,
      learnedAnimation: animation.export(),
    })
  },
  //点击课程跳转
  targetTo: function(e){
    var that = this;
    var index = e.target.dataset.index
    var docList = that.data.mustLearnDocumentList;
    if (that.data.isEncode == false) {
      for (var i = 0; i < docList.length; i++) {
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
      //检查网络状态并发起数据请求 
      that.checkNetAndDoRequest();
    }
    
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  //检查网络状态并发起数据请求
  checkNetAndDoRequest: function () {
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
          //确认网络正常，加载必学文档集合
          that.getMustLearnVideoList();
        }
      },
    })
  }, 
  //获取必学视频
  getMustLearnVideoList: function () {
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
        console.log(res)
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            mustLearnVedioList: res.data.data.list
          })
          var learningCount = 0, learnedCount = 0;
          var list = that.data.mustLearnVedioList
          for (var i = 0; i < list.length; i++) {
            if (list[i].schedule < 100)
              learningCount++;
            else
              learnedCount++;
          }
          that.setData({
            learningCount: learningCount,
            learnedCount: learnedCount,
            learningHeight: (learningCount?learningCount:1)*150,
            learnedHeight: (learnedCount?learnedCount:1)*150
          })
          //获取必学文档
          that.getMustLearnDocumentList();
        }
      },
      fail: function (res) {
        console.log('标签获取失败' + res);
      }
    })
  },
  //获取文档集合
  getMustLearnDocumentList: function () {
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_study_documents_must.do',
      data:{
        page: that.data.currentPage,//当前页码
        pageNum: 12//每页显示8条记录
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": app.globalData.header.Cookie
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          if (res.data.data.totalPage == that.data.currentPage) {
            that.setData({
              isHaveMore: false
            })
          }
          that.setData({
            mustLearnDocumentList: that.data.mustLearnDocumentList.concat(res.data.data.list)
          })
        }
        //确认所有数据加载完毕，隐藏加载框
        that.hideLoading();
      },
      fail: function (res) {
        console.log('必学文档获取失败' + res);
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
    var that = this;
    //判断是否加载跟多
    if (that.data.isHaveMore) {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
      //弹出“加载”框
      wx.showLoading({
        title: '加载中',
      })
      //检查网络状态并发起数据请求
      that.checkNetAndDoRequest();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})