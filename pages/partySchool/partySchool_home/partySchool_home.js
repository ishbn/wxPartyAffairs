// pages/partySchool/partySchool_home/partySchool_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg: "/images/bg/bg_time.png",
    menu_messages: [
      {
        menu_img: "/images/icon_function/partyClass.png",
        targeturl: "./../partyClass/menu/menu",
        name: "微党课",
        description: "掌上党课，碎片时间巧利用"
      },
      {
        menu_img: "/images/icon_function/threeOne.png",
        targeturl: "./../threeOne/myMeeting/myMeeting",
        name: "三会一课",
        description: "提醒&签到，参会准时高效"
      },
      {
        menu_img: "/images/partySchool_icon/corruption.png",
        targeturl: "./../education/home/home",
        name: "专题教育",
        description: "专题汇总，重点学习"
      },
      {
        menu_img: "/images/icon_function/activity.png",
        targeturl: "./../anti-corruption/home/home",
        name: "反腐倡廉",
        description: "弘扬廉政，警钟长鸣"
      },
      {
        menu_img: "/images/partySchool_icon/laws.png",
        targeturl: "./../laws/home/home",
        name: "政策法规",
        description: "牢记党章，党规，党纪"
      },
      {
        menu_img: "/images/icon_function/examination.png",
        targeturl: "./../examination/home/home",
        name: "在线考试",
        description: "随机抽题，智能分析"
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

  // 新增函数,页面跳转
  targetTo: function (e) {
    console.log(e);
    var targeturl = e.target.dataset.targeturl;
    wx.navigateTo({
      url: targeturl,
      fail: function (res) {
        showError();
      }
    })
  },
  showError: function () {
    wx.showToast({
      title: '跳转失败',
      icon: 'fail',
      duration: 1000
    })
  }


})