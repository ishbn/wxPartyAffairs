// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverAddress:null,
    canShow:false,
    menu: [
      {
        // imgUrls: '/images/icon_function/file.png',
        imgUrls: '/images/icon/档案 (1).png',
        descs: '党员档案',
        target_page:'/pages/organization/partyMemberFile/partyMemberFile'
      }, 
      {
        // imgUrls: '/images/icon_function/partyClass.png',
        imgUrls: '/images/icon/课程r.png',
        descs: '微党课',
        target_page: "/pages/partySchool/partyClass/class/class_home/class_home"
      },
      {
        
        imgUrls: '/images/icon/文章.png',
        // imgUrls: '/images/icon_function/threeOne.png',
        descs: '三会一课',
        target_page:'/pages/partySchool/threeOne/home/home'
      },
      {
        
        imgUrls: '/images/icon/教育.png',
        // imgUrls: '/images/icon_function/taskManagement.png',
        descs: '专题教育',
        target_page:'/pages/partySchool/education/home/home'
      },
      {
        imgUrls: '/images/icon/公告2.png',
        // imgUrls: '/images/icon_base_new/notice.png',
        descs: '通知公示',
        target_page:'/pages/news/notices/notices_list/notices_list'
      },
      {
        imgUrls: '/images/icon/新闻 (1).png',
        // imgUrls: '/images/icon_base_new/governmentNews.png',
        descs: '党建要闻',
        target_page:'/pages/news/news/news_list/news_list'
      },
      {
        imgUrls: '/images/icon/考试 (1).png',
        // imgUrls: '/images/icon_function/examination.png',
        descs: 'e起考试',
        target_page:'/pages/partySchool/examination/home/home'
      },
      {
        
        imgUrls: '/images/icon/档案推送r.png',
        // imgUrls: '/images/icon_function/thoughtReport.png',
        descs: '思想汇报',
        target_page:'/pages/wode/thoughtreport/thoughtreport'
      },
      {
        
        imgUrls: '/images/icon/相册r.png',
        // imgUrls: '/images/icon_function/eventAlbum.png',
        descs: '活动相册',
        target_page:'/pages/organization/eventAlbum/eventAlbum'
      },
      {
        
        imgUrls: '/images/icon/消息 (4).png',
        // imgUrls: '/images/icon_base_new/message.png',
        descs: '我的消息',
        target_page:'/pages/test/test'
      }
     
    ],
    newsLength:4,
    list_news:[],
    noticesLength:4,
    list_notices: []
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取服务器地址
    var addr = app.globalData.serverAddress;
    that.setData({
      serverAddress:addr
    });
    //检查网络并发起查询请求
    that.checkNetWork();
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
    var that = this;
    // 下拉刷新时间
    var time = app.globalData.dropDownTime;
    //检查网络并发起查询请求
    that.checkNetWork();
    
    //设置dropDownTime之后停止刷新，下拉框恢复原位
    setTimeout(function (){
      wx.stopPullDownRefresh();
    }, time);
    
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
  /**获取新闻列表 */
  getNewsList:function(){
    var that = this;
    var length = that.data.newsLength;
    var addr = that.data.serverAddress;
    wx.request({
      url: addr +'homelist/newslist/'+length,
      success:function(res){
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          var list = that.checkCover(res.data.data);
          that.setData({
            list_news: list
          });
          //显示内容
          that.showContent();
        }
      },
      fail: function (res) {
        console.log('请求新闻列表出错！' + res);
        that.showError('请求数据出错！');
      }
    })
  },
  getNoticeList:function(){
    var that = this;
    var length = that.data.noticesLength;
    var addr = that.data.serverAddress;
    wx.request({
      url: addr + 'homelist/noticeslist/public/' + length,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
          var list = that.checkCover(res.data.data);
          that.setData({
            list_notices: list
          });
          //显示内容
          that.showContent();
        }
      },
      fail: function (res) {
        console.log('请求公告列表出错！' + res);
        that.showError('请求数据出错！');
      }
    })
  },
  /**检查网络信息并提示 */
  checkNetWork() {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == 'none') {
          // 提示网络出错
          wx.showToast({
            title: '加载失败，请检查网络',
            icon: 'none'
          });
        } else {
          //获取新闻列表
          that.getNewsList();
          //获取公共列表
          that.getNoticeList();
        }
      }
    })
  },
  showContent:function(){
    var that = this;
    that.setData({
      canShow:true
    })
  },
  showError:function(e){
    wx.showToast({
      title: e,
      icon: 'none',
    })
  },
  /**检查封面图片是否为空 */
  checkCover:function(res){
    for(var i=0; i<res.length;i++){
      if (res[i].coverpath == "#默认#" || res[i].coverpath == null || res[i].coverpath == ''){
        res[i].coverpath = app.globalData.defulatImg;
      }
    }
    return res;
  }
})