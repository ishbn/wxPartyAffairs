// pages/organization/voteList/voteList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    serverurl: app.globalData.serverAddress,

    content:{}
  
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
    this.askForServer();
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

  //请求服务器，获得投票列表
  askForServer: function(){
    var that = this;

    //检查登录
    app.checkLogin('/pages/organization/voteList/voteList','redirectTo')

    wx.request({
      url: that.data.serverurl + 'voteinfo/votinglist',
      method: 'GET',
      header: app.globalData.header,
      success: function(res){
        if(res.data.status == 0 && res.statusCode == 200){
          that.setData({
            content: res.data.data
          })
        }
      }
    })
  },

  //获得voteId，进入投票详情
  targetTo: function(e){
    var voteId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../vote/vote?voteId='+voteId
    })
  }

})