// pages/organization/activity/activity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverurl: app.globalData.serverAddress,
    nowPageUrl: "/pages/organization/activity/activity",
    // 关于页数的变量
    pageNum: 1,
    totalInfoNum: 3,
    totalActiveNum: 3,
    totalPageNum: 1,

    //关于wiper的定位变量
    currentTab: 0,

    //列表数据
    events_list: null,

    //已报名列表
    registered: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.askForServer(that.data.pageNum, 15);
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
    this.askForApplyInfo();
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
  /*更新选中的tab的值 */
  swichNav: function (e) {
    //sconsole.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  /*监听点击tab事件 */
  swiperChange: function (e) {
    //console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  targetToDetail: function(e){
    var this_id = e.currentTarget.dataset.id;
    var this_state = e.currentTarget.dataset.state;
    var deletenum = e.currentTarget.dataset.deletenum;
    wx.navigateTo({
      url: '/pages/organization/detailsActivity/detailsActivity?id='+this_id+'&state='+this_state+'&deletenum='+deletenum
    })
  },

  //向服务器请求数据
  askForServer: function(pagenum,num){
    var that = this;
    //检验登录
    app.checkLogin(that.data.nowPageUrl, "redirectTo");
    //开始请求 
    wx.request({
      url: that.data.serverurl +'partyActivity/menu/'+pagenum+'/'+num,
      method: 'POST',
      header: app.globalData.header,
      success: function(res){
        console.log(res.data.data)
        if(res.data.status == 0 && res.statusCode == 200)
        {
          that.setData({
            pageNum: res.data.data.pageNum,
            totalInfoNum: res.data.data.totalInfoNum,
            totalActiveNum: res.data.data.totalActiveNum,
            totalPageNum: res.data.data.totalPageNum,
            events_list: res.data.data.list
          })
        }
      }
    })
  },

  //请求报名状态的信息
  askForApplyInfo: function () {
    var that = this;
    wx.request({
      url: that.data.serverurl + 'partyActivity/applyAllInfo',
      method: 'GET',
      header: app.globalData.header,
      success: function (res) {
        console.log(res);
        if(res.data.status == 0 && res.statusCode == 200)
        {
          that.setData({
            registered: res.data.data
          })
        }
      }
    })
  }

})