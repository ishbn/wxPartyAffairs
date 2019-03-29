// pages/organization/organization_home/organization_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg:"/images/bg/bg_time.png",
    menu_messages:[
      {
        menu_img: "/images/icon_function/file.png",
        targeturl:"/pages/organization/partyUserInfo/partyUserInfo",
        name: "党员档案",
        description:"电子名片，信息共享"
      },
      {
        menu_img: "/images/icon_function/eventAlbum.png",
        targeturl: "/pages/organization/partybranchList/partybranchList",
        name: "活动相册",
        description: "永久保留，随时查看"
      },
      {
        menu_img: "/images/icon_function/vote.png",
        targeturl: "/pages/organization/voteList/voteList",
        name: "投票",
        description: "图文并茂，结果立现"
      }
      // ,{
      //   menu_img: "/images/icon_function/activity.png",
      //   targeturl: "/pages/organization/activity/activity",
      //   name: "活动报名",
      //   description: "党内活动，不容错过"
      // }
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
  
  }

})