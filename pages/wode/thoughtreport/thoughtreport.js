// pages/wode/thoughtreport/thoughtreport.js
var app =getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local: '/pages/wode/thoughtreport/thoughtreport',
    havedata:false,
    serverAddress:'',
    header:'',
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
    num: 7,   //一页的条数
    more: true,
    requestWay: 'reflush',//请求方式为more or reflush,判断加载更多还是刷新，刷新方式跟初次请求一样
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.setData({
      serverAddress: app.globalData.serverAddress,
      header: app.globalData.header
    })
    // 验证登录
    app.checkLogin(that.data.local,'redirectTo');

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
    // 下拉刷新时间
    var time = app.globalData.dropDownTime;

    that.setData({
      requestWay: "reflush"
    });
    //检查网络状态并查询数据
    that.checkNetWork();

    //设置dropDownTime之后停止刷新，下拉框恢复原位
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, time);
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
      that.setData({
        requestWay: "more"
      });
      //检查网络状态并查询数据
      that.checkNetWork();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /*更新选中的tab的值 */
  swichNav: function (e) {
    //sconsole.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      if(that.data.currentTab == 1){
        that.setData({
          requestWay: "reflush"
        });
        //检查网络状态并执行 数据查询请求
        that.checkNetWork();
      }
    }

  },

  /**标题输入处理 */
  titleInput: function (e) {
    // console.log(e)
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
    // console.log(error);
    if (error) {
      return;
    }
    console.log(that.data.report);
    var addr = that.data.serverAddress;
    
    // 进行提交
    wx.request({
      url: addr +'report/insertReport/',
      method:'post',
      data: that.data.report,
      header:{
        Cookie:app.globalData.header.Cookie,
        'Content-type': 'application/json'
      },
      success:function(res){
        if (res.statusCode == 200 && res.data.status ==0){
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
        }else{
          that.showError('提交出错，请稍后再试');
        }
      },
      fail:function(res){
        that.showError('提交失败，请稍后再试');
      }

    })
  },
  showCannotNull: function (e) {
    // console.log(e);
    wx.showToast({
      title: e + '不能为空',
      icon: 'none'
    })
  },
  toDetail:function(e){
    console.log(e);
    var report_id = e.currentTarget.dataset.report_id;
    console.log(report_id);
    wx.navigateTo({
      url: '/pages/wode/thoughtreport_detail/thoughtreport_detail?report_id='+report_id,
    })
  },
  showSuccessfull:function(){
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      // image: '',
      duration: 500,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  showError:function(tips){
    wx.showToast({
      title: tips,
      icon: 'none',
      // image: '',
      duration: 500,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  checkNetWork:function(){
    var that = this;
    var reqWay = that.data.requestWay;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == 'none') {
          // 提示网络出错
          wx.showToast({
            title: '加载失败，请检查网络',
            icon: 'none'
          });
        } else {
          
          if (reqWay == 'more') {
            // 发起加载更多网络请求
            that.getMoreReportData();
          } else if (reqWay == 'reflush') {
            // 请求查询思想报告列表
            that.getReportData();
          }

        }
      }
    })
  },
  getReportData: function () {
    // console.log('在这里请求数据');
    var that = this;
    // 获取服务器地址
    var addr = that.data.serverAddress;
    // 刷新恢复第一页
    that.setData({
      pageNum: 1
    });
    var page = that.data.pageNum;
    var num = that.data.num;
    wx.request({
      url: addr + 'report/myReports/' + page + '/' + num,
      method: 'post',
      header: {
        Cookie: app.globalData.header.Cookie,
        'Content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          var data = res.data.data.list;
          var flag = true;
          if (data.length < that.data.num){
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
          that.setData({
            havedata: false
          });
          // that.showError('查询出错，请稍后再试');
        }
      },
      fail: function (res) {
        that.showError('查询失败，请稍后再试');
      }
    })

  },
  getMoreReportData:function(){
    var that = this;
    // 获取服务器地址
    var addr = that.data.serverAddress;
    //显示新闻条数
    var length = that.data.num;
    // 新闻页数
    var page = that.data.pageNum + 1;
    // 请求新闻列表
    wx.request({
      url: addr + 'report/myReports/' + page + '/' + length,
      header: {
        Cookie: app.globalData.header.Cookie,
        'Content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          //获取到的数据
          var list = res.data.data.list;
          //原来的数组
          var array = that.data.myreports;
          //加进原来的数组
          for (var i = 0; i < list.length; i++) {
            array.push(list[i]);
          }
          // 更新数据
          that.setData({
            myreports: array,
            pageNum: res.data.data.pageNum,
            totalPageNum: res.data.data.totalPageNum
          });
        }else{
          that.showError('查询出错，请稍后再试');
        }
      },
      fail: function (res) {
        that.showError('查询失败，请稍后再试');
      }
    })
  }
})