// pages/login/login.js
var app = getApp();
var commonUtils = require("../../utils/commonUtil.js");
var paValidUtil = require("../../utils/paValidUtil.js");
var pahelper = require("../../utils/pahelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    password: '',
    turnToWay: 'navigator',
    targetPage: '/pages/home/home',
    userfocus: false,
    pswfocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var targetUrl = decodeURIComponent(options.targetPage);
    //获取全局变量：服务器地址
    that.setData({
      targetPage: targetUrl,
      turnToWay: options.turnToWay
    });
    //同步获取本地缓存
    try {
      var userLogin = wx.getStorageSync('userLogin');
      if (JSON.stringify(userLogin) != "{}") {
        that.setData({
          userId: userLogin.userId,
          password: userLogin.password
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**重置账号 */
  resetbtn: function() {
    var that = this;
    that.setData({
      userId: '',
      userfocus: true
    });

  },
  /**重置密码 */
  resetPswBtn: function() {
    var that = this;
    that.setData({
      password: '',
      pswfocus: true
    })
  },
  /**输入登录用户名 */
  setUsername: function(e) {
    var user = e.detail.value;
    var that = this;
    that.setData({
      userId: user
    })
  },
  /**输入密码 */
  setPassword: function(e) {
    var psw = e.detail.value;
    var that = this;
    that.setData({
      password: psw
    })
  },
  /**登录查询 */
  dologin: function() {
    var that = this;
    //判别是否为空，true执行登录查询
    var flag = that.docheck();
    if (flag) {
      var url = "login";
      var data = {
        userId: that.data.userId,
        password: that.data.password
      };
      commonUtils.ajaxRequest(url, data, 2, 1).then(that.processResult);
    }
  },
  processResult: function(res) {
    var that = this;
    console.log(res);
    if (res.statusCode == 200 && res.data.status == 0) {
      // 保存本地，方便下次登录
      that.saveUserInfo(res);
      //提示登录成功
      pahelper.showToast("登录成功");
      //标志更改为已登录并记住sessionId
      app.globalData.hadLogin = true;
      app.globalData.header.Cookie = res.header['Set-Cookie'];
      app.globalData.userInfo = res.data.data;
      // 判断进入页面的方式并选相应的跳转方式跳转
      that.turnToPage();
    } else {
      that.showError('用户名或密码错误');
    }
  },
  /**检查登录信息 */
  docheck: function() {
    var that = this;
    if (that.data.userId === '') {
      //提示用户名不能为空
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.password === '') {
      //提示用户名不能为空
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    return true;
  },
  /**保存缓存 */
  saveUserInfo: function(res) {
    var that = this;
    var userlogin = {
      userId: that.data.userId,
      password: that.data.password
    }
    wx.setStorage({
      key: "userLogin",
      data: userlogin
    });
    wx.setStorage({
      key: "userInfo",
      data: res.data.data
    });
  },

  /**提示登录失败 */
  showError: function(e) {
    wx.showToast({
      title: e,
      icon: 'none'
    })
  },
  turnToPage: function() {
    var that = this;
    if (that.data.turnToWay == 'switchTab') {
      wx.switchTab({
        url: that.data.targetPage,
        fail: function(res) {
          console.log(res);
        }
      });
    } else {
      //使用redirectTo返回的时候不会返回到登录页面，navigateTo会保留页面的周期，点击返回键的时候会返回到登录页面
      wx.redirectTo({
        url: that.data.targetPage,
        fail: function(res) {
          console.log(res);
        }
      })
    }

  }
})