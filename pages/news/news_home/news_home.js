// pages/news/partySchool_home/partySchool_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imges:'/images/background/news/img_header.png',
    menu: {
      imgUrls: [
        '/images/icon_base_new/governmentNews.png',
        '/images/icon_base_new/notice.png',
        '/images/icon_function/publicity.png'
      ],
      descs: [
        '党内要闻',
        '通知公示',
        '党内公示'
      ],
      explain:[
        '新闻直播间，了解党内事',
        '最新通知，一键查看',
        '党内动态，即时了解'
      ],
      targetPages:[
        "./../news/news_list/news_list",
        "./../notices/notices_list/notices_list",
        "./../noticesInner/noticesInner_list/noticesInner_list"
      ]
    },
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
  menuTargetTo:function(e){
    console.log(e);
    var src=e.target.dataset.targeturl;
    console.log(src);
    wx.navigateTo({
      url: src
    })
  }
})