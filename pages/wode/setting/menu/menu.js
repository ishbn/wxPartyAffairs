// pages/wode/personalInfo/menu/menu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg:"/images/bg/school.jpg",
    menu: [
      {

        icon: '/images/icon_base_new/psw.png',
        name: '修改密码',
        url: "/pages/wode/setting/updatePsw/updatePsw"
      },
      {

        icon: '/images/icon_base_new/about.png',
        name: '关于e网党建',
        url: "/pages/wode/setting/aboutme/aboutme"
      },
      {

        icon: '/images/icon_base_new/logout.png',
        name: '切换账号',
        url: "/pages/login/login"
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  navigateTo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var url = that.data.menu[index].url;
    // 判断是否为切换账号，否则直接跳转

    if (index == 2) {
      wx.showModal({
        title: '提示',
        content: '是否退出当前登录',
        success: function (res) {
          if (res.confirm) {
            // 销毁Cookie，登录标识
            app.globalData.header.Cookie = '';
            app.globalData.hadLogin = false;
            app.globalData.userInfo = "";
            var tartget = '/pages/wode/wode/wode';
            var en_url = encodeURIComponent(tartget);
            url += "?targetPage=" + en_url +"&turnToWay=switchTab";
            //转发
            wx.reLaunch({
              url: url
            });
          }
        }
      })

    } else {
      //转发
      wx.navigateTo({
        url: url
      });
    }

  }
})