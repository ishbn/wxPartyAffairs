Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "https://www.51zhdj.cn/html/index/images/shbanner.jpg",//图片地址
    rotate: 0, //状态,0向下，1向上
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    introductionTitle: "中国共产党章程",//课程简介标题
    introductionContent: "《中国共产党章程》......",//课程简介内容
    chapter:[
      {
        title:'总纲',
        time: "2017-11-08 新华社",
        people: "300",
        state: '未完成',
        targetUrl:'./../chapter/chapter'
      },
      {
        title: '第一章 党员',
        time: "2018-1-08 党建网",
        people: "949",
        state: '未完成',
        targetUrl: './../chapter/chapter'
      },
      {
        title: '第二章 党的组织制度',
        time: "2017-1-08 新华社",
        people: "54",
        state: '未完成',
        targetUrl: './../chapter/chapter'
      },
      {
        title: '第三章 党的中央组织',
        time: "2017-01-04 党建网",
        people: "450",
        state: '未完成',
        targetUrl: './../chapter/chapter'
      }
    ]
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
  //显示下拉菜单
  showContent: function(){
    this.setData({
      rotate: !this.data.rotate
    })
  },
  //章节跳转
  targetTo: function(e){
    var chapter = JSON.stringify(e.currentTarget.dataset.chapter);
    var url = e.currentTarget.dataset.chapter.targetUrl;
    wx.navigateTo({
      url: url+"?chapter="+chapter
    })
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