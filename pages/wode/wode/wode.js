// pages/wode/wode/wode.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localUrl: '/pages/wode/wode/wode',
    headerimg:'/images/bg/followParty.jpg',
    headImg:'',
    username:'我是党员',
    partybranch: '软件工程支部',
    roleName:'普通党员',
    menu: [
      {
        icon: '/images/icon_base_new/personalInfo.png',
        name: '个人信息',
        explain: '最新通知，一键查看',
        url: "/pages/organization/partyUserInfo/partyUserInfo",
        dot:''
      },
      {
        icon: '/images/icon_base_new/message.png',
        name: '我的消息',
        explain: '图文收藏，快速查找',
        url: "./../collection/collection",
        dot:'red-point'
      },
      {
        icon: '/images/icon_base_new/collection.png',
        name: '我的收藏',
        explain: '图文收藏，快速查找',
        url: "./../collection/collection",
        dot: ''
      },
      {
        icon: '/images/icon_base_new/governmentNews.png',
        name: '党内公示',
        explain: '党内动态，即时了解',
        url: "/pages/news/noticesInner/noticesInner_list/noticesInner_list",
        dot: ''
      },
      {
        icon: '/images/icon_base_new/feedback.png',
        name: '我要反馈',
        explain: '反馈意见，解答疑问',
        url: "./../feedback/feedback_home/feedback_home",
        dot: ''
      }, 
      {
        icon: '/images/icon_function/thoughtReport.png',
        name: '思想汇报',
        explain: '时刻向组织汇报思想动态',
        url: "./../thoughtreport/thoughtreport",
        dot: ''
      },
      {
        icon: '/images/icon_base_new/history.png',
        name: '历史学习',
        explain: '温故知新，数往知来',
        url: "./../history/history",
        dot: ''
      },
      {
        icon: '/images/icon_base_new/setting.png',
        name: '设置',
        explain: '',
        url: "/pages/wode/personalInfo/menu/menu",
        dot: ''
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 验证登陆并读取缓存
    app.checkLogin(that.data.localUrl, 'tabbar');
    
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
    var that = this;
    //读缓存，显示信息
    that.readCache();
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
  /**功能按钮跳转页面 */
  menuTargetTo: function (e) {
    console.log(e);
    var src = e.target.dataset.targeturl;
    console.log(src);
    wx.navigateTo({
      url: src
    })
  },
  /**读取缓存数据 */
  readCache:function(){
    var that = this;
    //同步获取本地缓存
    try {
      //读取缓存
      var userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo);
      if (userInfo){
        // 更新数据
        that.setData({
          headImg: userInfo.imgHead,
          username: userInfo.realName,
          partybranch: userInfo.branchName,
          roleName: userInfo.roleName
        })
      }    
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '读取数据出错',
        icon:'none'
      })
    }
  },
  cancelRedDot:function(e){
    // console.log(e);
    var index = e.currentTarget.dataset.index;
    var that = this;
    var menu = that.data.menu;
    menu[index].dot = '';
    that.setData({
      menu: menu
    })
  }
})