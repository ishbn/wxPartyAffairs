Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    detailUrl:"./../details/detail",//跳转到详细课程的页面地址
    list:{//标签
      law:[
        "全部","党章","准则","条例","规则","规定","办法","细则"
      ],
      presidentXi:[
        "全部","系列讲话","从严治党","新时代","治国理论","依法治国","中国梦"
      ],
      nineteen:[
        "全部","报告","决议"
      ]
    }
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  //点击标签实现跳转
  navigateTo: function(e){
    var url = this.data.detailUrl;
    var classObject = JSON.stringify(e);
    wx.navigateTo({
      url: url + '?e=' + classObject
    });
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