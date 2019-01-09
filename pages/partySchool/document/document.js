var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colShow: true,//收藏出现效果
    colCancelShow: true,//取消收藏效果
    clickCol: true,//收藏是否可点击
    documentList:[],//文档
    document:'',
    num:'',//当前文档的数组下标
    pre:'',//上一篇索引
    next:'',//下一篇索引
    localUrl: '/pages/partySchool/document/document',
    collect: "/images/partySchool_icon/collect.png",//收藏图标
    downloadIcon:"/images/partySchool_icon/download.png",
    lookIcon:"/images/partySchool_icon/look.png",
    turnToWay: 'navigateTo',//跳转方式
    isDownload: true,//是否显示下载进度
    percent: '',//下载进度
    downloadSize:0,//文件大小
    savedFilePath:''//文件保存路径
  },
  //点赞
  // addOne: function (e) {
  //   this.addWay(this);
  //   if (this.data.praise == "/images/partySchool_icon/zan.png") {
  //     this.setData({
  //       praise: "/images/partySchool_icon/zan1.png",
  //       show: !this.data.show
  //     });
  //     setTimeout(function () {
  //       this.setData({
  //         show: !this.data.show
  //       });
  //     }.bind(this), 1000)
  //   }
  //   else {
  //     this.setData({
  //       praise: "/images/partySchool_icon/zan.png",
  //       cancelShow: !this.data.cancelShow
  //     });
  //     setTimeout(function () {
  //       this.setData({
  //         cancelShow: !this.data.cancelShow
  //       });
  //     }.bind(this), 1000)
  //   }
  // },
  //收藏
  colOne: function () {
    var that = this;
    var isLogin = app.globalData.hadLogin;
    //检查登录状态
    if (!isLogin) {
      var localUrl = that.data.localUrl;
      var turnToWay = that.data.turnToWay;
      app.checkLogin(localUrl, turnToWay);
    }else{
      that.colWay(that);
      if (that.data.collect == "/images/partySchool_icon/collect.png") {
        that.setData({
          collect: "/images/partySchool_icon/collect1.png",
          colShow: !that.data.colShow
        });
        setTimeout(function () {
          that.setData({
            colShow: !that.data.colShow
          });
        }.bind(that), 1000)
      }
      else {
        that.setData({
          collect: "/images/partySchool_icon/collect.png",
          colCancelShow: !that.data.colCancelShow
        });
        setTimeout(function () {
          that.setData({
            colCancelShow: !that.data.colCancelShow
          });
        }.bind(that), 1000)
      }
    }
  },
  //点赞延迟一秒点击
  // addWay: function (self) {
  //   self.setData({
  //     clickAdd: false
  //   })
  //   setTimeout(function () {
  //     self.setData({
  //       clickAdd: true
  //     })
  //   }, 1000)
  // },
  //收藏延迟一秒点击
  colWay: function (self) {
    self.setData({
      clickCol: false
    })
    setTimeout(function () {
      self.setData({
        clickCol: true
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var document_id = options.document_id;
    var thisUrl = that.data.localUrl;
    if (!paValidUtil.checkLogin(thisUrl,2)){
      return;
    }
    var reqUrl = "study/get_study_document_details.do";
    var data={
      document_id: document_id
    }
    commonUtils.commonAjax(reqUrl,data,1).then(that.getTheDetail);    
  },
  getTheDetail:function(res){
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      var detail = res.data.data;
      detail.coverImg = paValidUtil.checkSingleImgPath(detail.coverImg);
      that.setData({
        document: detail
      });
    }else{
      commonUtils.commonTips(res.statusCode);
    }
  },
  //跳转
  targetTo: function(e){
    var that = this;
    var data = e.target.dataset.list;
    var index = e.target.dataset.index;
    for (var i = 0; i < data.length; i++) {
      data[i].filePath = encodeURIComponent(data[i].filePath);
    }
    data = JSON.stringify(data);
    wx.redirectTo({
      url: './document?data='+data+'&index='+index,
    })
  },
  //下载文件
  downloadFile: function(e){
    var that = this;
    var url = e.target.dataset.url;
    //初始化参数
    that.setData({
      isDownload:false,
      downloadSize:0,
      percent:0
    })
    //下载文件
    var downloadTask = wx.downloadFile({
      url:url,
      success: function(res){
        //临时文件路径
        var filePath = res.tempFilePath;
        //保存文件到本地
        wx.saveFile({
          tempFilePath: filePath,
          success: function(res){
            that.setData({
              savedFilePath:res.savedFilePath
            })
            wx.showToast({
              title: '文件已下载至' + that.data.savedFilePath,
              icon: 'none',
              mask: true
            })
            that.openDoc();
          },
          fail: function(res){
            wx.showToast({
              title: '下载成功，保存失败',
              icon: 'none',
              mask: true
            })
          }
        })
      },
      fail: function(res){
        //下载失败隐藏下载栏
        that.setData({
          isDownload: true
        })
        wx.showToast({
          title: '下载失败',
          icon: 'none',
          mask: true
        })
      }
    })
    //下载进度跟踪
    downloadTask.onProgressUpdate((res) => {
      //配置下载参数
      that.setData({
        percent: res.progress,
        downloadSize: parseInt(res.totalBytesWritten/1024)
      })
      //下载完成后隐藏下载栏
      if (res.totalBytesWritten == res.totalBytesExpectedToWrite){
        that.setData({
          isDownload:true
        })
      }
    })
  },
  //打开文件
  openDoc:function(){
    var that = this;
    //打开文件
    wx.openDocument({
      filePath: that.data.savedFilePath,
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
        wx.showToast({
          title: '打开失败',
          icon: 'none',
          mask: true
        })
      }
    })
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