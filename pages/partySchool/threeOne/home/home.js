Page({

  /**
   * 页面的初始数据
   */
  data: {
    head:{
      image:"/images/partySchool_icon/meeting.png",
      info:"没有待参加会议稍微休息一下吧~"
    },
    myMeeting:{
      image:"/images/partySchool_icon/myMeeting.png",
      info:"我的会议",
      targetUrl:"../myMeeting/myMeeting"
    },
    summary:{
      image:"/images/partySchool_icon/summary.png",
      info: "会议纪要",
      targetUrl: "../summary/summary"
    }
    
  },
  //页面跳转
  targetTo: function(e){
    console.log(e);
    var url = e.target.dataset.targeturl;
    wx.navigateTo({
      url: url
    })
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
    
  }
})