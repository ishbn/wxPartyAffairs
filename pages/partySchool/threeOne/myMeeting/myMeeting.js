// pages/partySchool/threeOne/myMeeting/myMeeting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: "/images/partySchool_icon/menu.png", //菜单图标
    open: false, //下拉框的状态
    clear: true,//清除icon的状态
    inputVal: '',//输入框的值
    isFocus:false, //输入框是否获取焦点
    currentTab: 0, //预设当前项的值
    willMeetings:[
      {
        title:'会议标题',
        desc:"会议描述会议描述会议描述会议描述会议描述会议描述会议描述会议描述",
        img:'/images/partySchool_icon/willJoin.png',
        date:"2018-10-01"
      },
      {
        title: '会议标题会议标题会议标题会议标题会议标题会议标题',
        desc: "会议描述会议描述会议描述会议描述会议描述会议描述会议描述会议描述",
        img: '/images/partySchool_icon/willJoin.png',
        date: "2018-10-02"
      },
      {
        title: '会议标题会议标题会议标题会议标题会议标题会议标题',
        desc: "会议描述会议描述会议描述会议描述会议描述会议描述会议描述会议描述",
        img: '/images/partySchool_icon/willJoin.png',
        date: "2018-09-01"
      }
    ]
  
  },
  //输入框显示清除按键
  showClear: function (e) {
    var value = e.detail.value;
    if (value != '') {
      this.setData({
        inputVal: value,
        clear: false
      })
    } else {
      this.setData({
        clear: true
      })
    }
  },
  //清除输入框中的内容
  clearVal: function () {
    this.setData({
      inputVal: '',
      clear: true
    })
  },
  //输入框获取或失去焦点
  focus: function(e){
    if(this.data.inputVal=='')
    this.setData({
      isFocus: true
    })
  },
  //取消输入
  cancel: function (e) {
    this.setData({
      isFocus: false,
      inputVal:'',
      clear:true
    })
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //显示下拉框
  showitem: function () {
    this.setData({
      open: !this.data.open
    });
    if (this.data.menu === "/images/partySchool_icon/menu.png") {
      this.setData({
        menu: "/images/partySchool_icon/menu1.png"
      })
    } else {
      this.setData({
        menu: "/images/partySchool_icon/menu.png"
      })
    }
  },
  //点击蒙层恢复
  hiddenShadow: function () {
    this.setData({
      open: !this.data.open
    });
    if (this.data.menu === "/images/partySchool_icon/menu.png") {
      this.setData({
        menu: "/images/partySchool_icon/menu1.png"
      })
    } else {
      this.setData({
        menu: "/images/partySchool_icon/menu.png"
      })
    }
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