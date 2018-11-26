// pages/wode/feedback/feedback_home/feedback_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    more: true,
    feedback_type_index: 0,
    feedback_type: [
      '工作作风',
      '党规党纪',
      '产品建议',
      '程序报错',
      '投诉反馈',
      '我要举报',
      '其他'
    ],
    feedback: {
      feedback_type: '工作作风',
      title: '',
      content: ''
    },
    maxlength: 1024,
    feedback_list: [
      {
        feedback_id: 1,
        title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
        feedback_type: '我是类型',
        date: '2018-12-13'
      },
      {
        feedback_id: 2,
        title: '我是标题',
        feedback_type: 'weqwe',
        date: '2018-12-13'
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
  bindPickerChange: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    var feed = that.data.feedback;
    var type_f = that.data.feedback_type[e.detail.value];
    feed.feedback_type = type_f;
    this.setData({
      feedback_type_index: e.detail.value,
      feedback: feed
    });
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
      });
      if (that.data.currentTab == 1) {
        //检查网络状态并执行 数据查询请求
        that.checkNetWork();
      }
    }

  },

  /**标题输入处理 */
  titleInput: function (e) {
    // console.log(e)
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.title = data;
    that.setData({
      feedback: fb
    })
  },
  /**内容输入赋值 */
  contentInput: function (e) {
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.content = data;
    that.setData({
      feedback: fb
    })
  },
  /**点击提交 */
  dosubmit: function () {
    var that = this;
    //检查输入项
    var error = that.docheck();
    // console.log(error);
    if (error) {
      return;
    }
    console.log(that.data.feedback);
    /*wx.request({
      url: '',
    })*/
  },
  docheck: function () {
    var that = this;
    var data = that.data.feedback;
    if (data.feedback_type === '') {
      that.showError('类型不能为空');
      return true;
    }
    if (data.title === '') {
      that.showError('标题不能为空');
      return true;
    }
    if (data.content === '') {
      that.showError('内容不能为空');
      return true;
    }
    return false;
  },
  showError: function (e) {
    wx.showToast({
      title: e,
      icon: 'none'
    })
  },
  checkNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == 'none') {
          // 提示网络出错
          that.showError('加载失败，请检查网络');
        } else {
          // 请求反馈列表
          that.getFeedbackList();
        }
      },
      fail:function(res){
        that.showError('检查网络失败，请稍后再试');
      }
    });
  },
  getFeedbackList: function () {
    console.log('等一个接口');
  }
})