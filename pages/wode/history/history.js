// pages/wode/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:[
      {
        id: 1,
        title: "但是不久后就会交话费空间广阔",
        time: "2018-07-23 9:45",
        img: "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg"
      },
      {
        id: 1,
        title: "但是不久后就会交话费空间广阔",
        time: "2018-07-23 9:45",
        img: "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg"
      },
      {
        id: 1,
        title: "但是不久后就会交话费空间广阔",
        time: "2018-07-23 9:45",
        img: "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg"
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
  targetTo: function(e){
    var targetID = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '?id='+targetID,
    })
  }
})