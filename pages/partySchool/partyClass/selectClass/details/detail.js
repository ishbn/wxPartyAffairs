// pages/partySchool/partyClass/selectClass/details/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotate: true, //箭头状态 true向下 false向上
    first_click: false,//第一次点击
    content: '全部',//当前是哪种课程
    id:[1,2,3],//标签编号
    checked1: false,//"全部"是否被选中
    checked2: true,//"专题教育"是否被选中
    checked3: false,//"反腐倡廉"是否被选中
    checked4: false,//"政策法规"是否被选中
    localUrl:'/pages/partySchool/partyClass/selectClass/details/detail',//本地路径
    turnToWay:'navigateTo',//跳转方式
    allVedioList:[],//所有视频
    labelList:[],//所有标签
    vedioList:[],//所有视频
    isHaveMore: true,//是否加载更多
    currentPage: 1,//当前页码
    list: {//标签
      education: [
        '全部','党章党规','三会一课','制度治国','党史'
      ],
      law: [
        '全部', '国家政策', '规章制度', '政策要闻'
      ],
      antiCorruption: [
        '全部', '反腐动态', '廉政时评', '警钟长鸣'
      ]
    },
  },
  //禁止滑动
  banSlide:function(){
  },
  //点击出现下拉菜单
  clickTap: function(){
    var that = this;
    // 第一次点击下拉
    if (!that.data.first_click) {
      that.setData({
        first_click: true
      });
    }
    that.setData({
      rotate: !that.data.rotate
    });
  },
  //点击显示右边标签
  checkTap: function(e){
    var that = this;
    //判断标签
    switch (e.target.dataset.current){
      case '1':
        that.setData({
          checked1:true,
          checked2: false,
          checked3: false,
          checked4: false,
          rotate: !that.data.rotate,
          content:'全部',
          id:[1,2,3]
        })
        that.checked();
        break;
      case '2':
        that.setData({
          checked1: false,
          checked2: true,
          checked3: false,
          checked4: false
        })
        break;
      case '3':
        that.setData({
          checked1: false,
          checked2: false,
          checked3: true,
          checked4: false
        })
        break;
      case '4':
        that.setData({
          checked1: false,
          checked2: false,
          checked3: false,
          checked4: true
        })
        break;
    }
  },
  //选择具体分类
  checked: function(e){
    var that = this;
    if(e!=null){
      if(e.target.dataset.self=="全部"){
        var content = e.target.dataset.father;
        that.setData({
          content: content,
          rotate: true
        });
        switch(content){
          case '专题教育':
            that.setData({
              id:[1]
            })
            break;
          case '政策法规':
            that.setData({
              id: [2]
            })
            break;
          case '反腐倡廉':
            that.setData({
              id: [3]
            })
            break;
        }
      }else{
        var content = e.target.dataset.self;
        that.setData({
          content: content,
          rotate: true,
          id:[e.target.dataset.index]
        });
      }
    }
    //弹出“加载”框
    wx.showLoading({
      title: '加载中',
    })
    //初始化
    that.setData({
      currentPage: 1,
      vedioList: [],
      isHaveMore: true
    })
    //检查网络并加载数据
    that.checkNetAndDoRequest(that.data.id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var e = JSON.parse(options.e);
    // this.checked(e);
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
      that.checkNetAndDoRequest(that.data.id);
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
          that.getVedioList(id);
        }
      },
    })
  },
  //获取所有视频
  getVedioList: function (id) {
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_study_videos_by_label_id.do',
      data: {
        label_id:[id],
        page: that.data.currentPage,
        pageNum: '12',
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": app.globalData.header.Cookie
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          //判断是否显示‘加载更多’
          if (res.data.data.totalPage == that.data.currentPage) {
            that.setData({
              isHaveMore: false
            })
          }
          that.setData({
            vedioList: that.data.vedioList.concat(res.data.data.list)
          })
        }
        //获取所有标签
        that.getLabelList();
      },
      fail: function (res) {
        console.log('文档获取失败' + res);
      }
    })
  },
  //获取标签集合
  getLabelList: function () {
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_labels.do',
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            labelList: res.data.data
          })
          //确认所有数据加载完毕，隐藏加载框
          that.hideLoading();
        }
      },
      fail: function (res) {
        console.log('标签获取失败' + res);
      }
    })
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  //跳转详情页
  toDetails: function (e) {
    var that = this;
    var data = that.data.vedioList;
    var index = e.target.dataset.index;
    data = JSON.stringify(data);
    wx.navigateTo({
      url: '../../class/swiperItem/video/video?data=' + data + '&index=' + index,
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
      that.checkNetAndDoRequest(that.data.id);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})