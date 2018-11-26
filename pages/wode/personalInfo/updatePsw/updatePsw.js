// pages/wode/personalInfo/updatePsw/updatePsw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage:'/images/background/followParty.jpg',
    oldPsw:'',
    newPsw:'',
    newPsw1:'',
    oldPswFocus:true,
    newPswFocus: false,
    newPsw1Focus:false
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
  oldPswInput:function(e){
    // console.log(e.detail.value);
    var that = this;
    that.setData({
      oldPsw: e.detail.value
    })
  },
  newPswInput: function (e) {
    // console.log(e.detail.value);
    var that = this;
    that.setData({
      newPsw: e.detail.value
    })
  },
  newPsw1Input: function (e) {
    // console.log(e.detail.value);
    var that = this;
    that.setData({
      newPsw1: e.detail.value
    })
  },
  resetPswBtn:function(e){
    var that = this;
    var location = e.currentTarget.dataset.inputlocal;
    if (location == 'old'){
      that.setData({
        oldPsw:'',
        oldPswFocus:true
      })
    } else if (location == 'new'){
      that.setData({
        newPsw:'',
        newPswFocus:true
      })
    } else if (location == 'new1'){
      that.setData({
        newPsw1: '',
        newPsw1Focus: true
      })
    }
  },
  updatePsw:function(){
  var that = this;
    if (that.checkPsw()){
      // 提交更改
      console.log('去拿接口，我在117行');
    }
  },
  checkPsw:function(){
    var that = this;
    // 检查输入是否为空
    if (!that.checkNotNull()){
      return false;
    }
    // 检查新密码与确认密码是否一致
    if (!that.checkNewPswEqualNewPsw1()) {
      return false;
    }
    // 检查是否与原来的密码一致，由后端进行判断比较好，先预留，等接口
    if (!that.checkOriginalPsw()) {
      return false;
    }
    return true;
  },
  checkNotNull:function(){
    var that = this;
    if (that.data.oldPsw == '') {
      that.showError('旧密码不能为空');
      that.setData({
        oldPswFocus: true
      })
      return false;
    }
    if (that.data.newPsw == '') {
      that.showError('新密码不能为空');
      that.setData({
        newPswFocus: true
      })
      return false;
    }
    if (that.data.newPsw1 == '') {
      that.showError('确认密码不能为空');
      that.setData({
        newPsw1Focus: true
      })
      return false;
    }
    return true;
  },
  checkNewPswEqualNewPsw1:function(){
    var that = this;
    if (that.data.newPsw != that.data.newPsw1){
      that.showError('密码输入不一致');
      that.setData({
        newPsw1:'',
        newPsw1Focus:true
      });
      return false;
    }else{
      return true;
    }
  },
  checkOriginalPsw:function(){
    var that = this;
    //由后端进行判断比较好，先预留，等接口
    return true;
  },
  showError:function(res){
    wx.showToast({
      title: res,
      icon:'none'
    })
  }
})