Page({

  /**
   * 页面的初始数据
   */
  data: {
    imges: '/images/bg/bg_time.png',
    menu:[
      {
        imgUrls: '/images/icon_function/video.png',
        descs: '视频课程',
        targetPages: '/pages/partySchool/miniClass/course/coursePush/coursePush'
      },
      {
        imgUrls: '/images/icon_function/doc.png',
        descs: '文档资料',
        targetPages: './../selectClass/selectClass_home/selectClass_home'
      },
      {
        imgUrls: '/images/partySchool_icon/onMyself.png',
        descs: '我的',
        targetPages: '/pages/partySchool/miniClass/myCourse/myCourse'
      }
    ]
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