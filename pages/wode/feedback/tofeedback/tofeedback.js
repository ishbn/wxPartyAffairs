// pages/wode/feedback/tofeedback/tofeedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback_type:[
      '工作作风',
      '党规党纪',
      '产品建议',
      '程序报错',
      '投诉反馈',
      '我要举报'
    ],
    feedback:{
      feedback_type:'工作作风',
      title:'',
      content:''
    },
    maxlength:512
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
  /**选择反馈类型处理 */
  selecttype:function(){
    var that = this;
    
    wx.showActionSheet({
      itemList: that.data.feedback_type,
      success: function (res) {
        // console.log(res.tapIndex)
        var feed = that.data.feedback;
        var type_f = that.data.feedback_type[res.tapIndex];
        feed.feedback_type = type_f;

        that.setData({
          feedback: feed
        });
        console.log(that.data.feedback.feedback_type);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**标题输入处理 */
  titleInput:function(e){
    // console.log(e)
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.title = data;
    that.setData({
      feedback:fb
    })
  },
  /**内容输入赋值 */
  contentInput:function(e){
    var that = this;
    var fb = that.data.feedback;
    var data = e.detail.value;
    fb.content = data;
    that.setData({
      feedback: fb
    })
  },
  /**点击提交 */
  dosubmit:function(){
    var that = this;
    //检查输入项
    var error = that.docheck();
    // console.log(error);
    if (error){
      return;
    }
    console.log(that.data.feedback);
    /*wx.request({
      url: '',
    })*/
  },
  docheck:function(){
    var that = this;
    var data = that.data.feedback;
    if (data.feedback_type === ''){
      that.showCannotNull('类型');
      return true;
    }
    if (data.title === '') {
      that.showCannotNull('标题');
      return true;
    }
    if (data.content === '') {
      that.showCannotNull('内容');
      return true;
    }
    //return false;
  },
  showCannotNull:function(e){
    // console.log(e);
    wx.showToast({
      title: e+'不能为空',
      icon:'none'
    })
  }
})