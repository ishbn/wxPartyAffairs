// pages/news/partySchool_home/partySchool_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg: "/images/bg/bg_time.png",
    menu_messages: [
      {
        menu_img: "/images/icon_base_new/governmentNews.png",
        targeturl: "./../news/news_list/news_list",
        name: "党内要闻",
        description: "新闻直播间，了解党内事"
      },
      {
        menu_img: "/images/icon_base_new/notice.png",
        targeturl: "./../notices/notices_list/notices_list",
        name: "通知公示",
        description: "最新通知，一键查看"
      },
      {
        menu_img: "/images/icon_function/publicity.png",
        targeturl: "./../noticesInner/noticesInner_list/noticesInner_list",
        name: "党内公示",
        description: "党内动态，即时了解"
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
   // 新增函数,页面跳转
  targetTo: function (e) {
    console.log(e);
    var targeturl = e.target.dataset.targeturl;
    wx.navigateTo({
      url: targeturl,
      fail: function (res) {
        showError();
      }
    })
  },
  showError: function () {
    wx.showToast({
      title: '跳转失败',
      icon: 'fail',
      duration: 1000
    })
  }
  ,
  menuTargetTo:function(e){
    console.log(e);
    var src=e.target.dataset.targeturl;
    console.log(src);
    wx.navigateTo({
      url: src
    })
  }
})