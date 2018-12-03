// pages/organization/eventAlbum/eventAlbum.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:'http://172.21.95.5:19091/',

    serverurl: app.globalData.serverAddress,

    foldimg: "/images/icon_function/preFold.png",
    isShow: "none",
    species: [{
        btnName: "全部",
        targetword: "all"
      },
      {
        btnName: "党委",
        targetword: "party"
      },
      {
        btnName: "工会",
        targetword: "union"
      },
      {
        btnName: "团委",
        targetword: "league"
      }
    ],
    contents: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.askforalbumlist(options.branchid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 菜单折叠
  foldclick: function(e) {
    var preShow = e.currentTarget.dataset.show;
    console.log("之前的状态为: " + preShow);
    var nowShow = (preShow == "flex" ? "none" : "flex");
    console.log("点击后状态改变为: " + nowShow);
    this.setData({
      isShow: nowShow
    });
    if (nowShow == "flex")
      this.setData({
        foldimg: "/images/icon_function/fold.png"
      });
    if (nowShow == "none")
      this.setData({
        foldimg: "/images/icon_function/preFold.png"
      });
  },

  // 选择分类
  selectspecies: function() {

  },

  // 进入对应的详情页
  targetToDetails: function(e) {
    //console.log(e);
    var that = this;
    var targeturl = "/pages/organization/detailsAlbum/detailsAlbum";
    var id = e.currentTarget.dataset.detailsid;
    var num = e.currentTarget.dataset.num;
    console.log(targeturl);
    wx.navigateTo({
      url: targeturl+"?id="+id+"&num="+num,
    })
  },

  //发起网络请求
  askforalbumlist: function(branchID)
  {
    var that = this;
    wx.request({
      url: that.data.serverurl +'partyalbum/'+branchID,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 0 && res.statusCode == 200){
        that.setData({
          contents:res.data.data
        })
        }
      }
    })
  }

})