// pages/partySchool/partySchool_home/partySchool_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imges: '/images/background/news/img_header.png',
    menu: {
      imgUrls: [
        '/images/icon_function/partyClass.png',
        '/images/icon_function/threeOne.png',
        '/images/partySchool_icon/education.png',
        '/images/partySchool_icon/corruption.png',
        '/images/partySchool_icon/laws.png',
        '/images/icon_function/examination.png'
      ],
      descs: [
        '微党课',
        '三会一课',
        '专题教育',
        '反腐倡廉',
        "政策法规",
        "在线考试"
      ],
      explain: [
        '掌上党课，碎片时间巧利用',
        '提醒&签到，参会准时高效',
        '专题汇总，重点学习',
        '弘扬廉政，警钟长鸣',
        '牢记党章，党规，党纪',
        '随机抽题，智能分析'
      ],
      targetPages: [
        "./../partyClass/menu/menu",
        "./../threeOne/myMeeting/myMeeting",
        "./../education/home/home",
        "./../anti-corruption/home/home",
        "./../laws/home/home",
        "./../examination/home/home"
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
  menuTargetTo: function (e) {
    var src = e.target.dataset.targeturl;
    wx.navigateTo({
      url: src
    })
  }
})