var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clear: true,//清除icon的状态
    first_click: false,//第一次点击
    inputVal: '',//输入框的值
    menu: "/images/partySchool_icon/menu.png", //菜单图标
    documentUrl: "../../document/document",//文档详情路径
    open: false, //下拉框的状态
    labelList: [],//所有标签
    documentList: [],//所有文档
    isEncode: false,//编码标识符
    id: '3',//文档标签的id
    isHaveMore: true,//是否加载更多
    currentPage: 1//当前页码
  },
  //禁止滑动
  banSlide: function () {
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
  //显示下拉框
  showitem: function () {
    var that = this;
    // 第一次点击菜单
    if (!that.data.first_click) {
      that.setData({
        first_click: true
      });
    }
    that.setData({
      open: !that.data.open,
    });
    if (that.data.menu === "/images/partySchool_icon/menu.png") {
      that.setData({
        menu: "/images/partySchool_icon/menu1.png"
      })
    } else {
      that.setData({
        menu: "/images/partySchool_icon/menu.png"
      })
    }

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    //判断是否隐藏蒙层
    if (that.data.open)
      that.hiddenShadow();
    //弹出“加载”框
    wx.showLoading({
      title: '加载中',
    })
    //初始化
    that.setData({
      id: e.target.dataset.labelid,
      currentPage: 1,
      documentList: [],
      isHaveMore: true
    })
    //检查网络状态
    that.checkNetAndDoRequest(that.data.id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //弹出“加载”框
    wx.showLoading({
      title: '加载中',
    })
    //加载数据
    that.checkNetAndDoRequest(that.data.id);
  },
  //隐藏加载框
  hideLoading: function () {
    wx.hideLoading()
  },
  //检查网络状态并发起数据请求
  checkNetAndDoRequest: function (id) {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        //获取网络类型
        var networkType = res.networkType;
        //如果为空
        if (networkType == null) {
          wx.showToast({
            title: '加载失败，网络出现问题',
            icon: 'none'
          });
        } else {
          //确认网络正常，加载文档集合
          that.getDocumentList(id);
        }

      },
    })
  },
  //获取标签集合
  getLabelList: function () {
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_labels.do',
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            labelList: res.data.data
          })
        }
        //确认所有数据加载完毕，隐藏加载框
        that.hideLoading();
      },
      fail: function (res) {
        console.log('标签获取失败' + res);
      }
    })
  },
  //获取文档集合
  getDocumentList: function (id) {
    var that = this;
    //获取服务器地址
    var add = app.globalData.serverAddress;
    wx.request({
      url: add + 'study/get_study_documents_by_label_id.do',
      data: {
        label_id: [id],
        page: that.data.currentPage,//当前页码
        pageNum: 8//每页显示8条记录
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          var data = that.changeFormat(res.data.data.list);
          //判断是否显示‘加载更多’
          if (res.data.data.totalPage == that.data.currentPage) {
            that.setData({
              isHaveMore: false
            })
          }
          that.setData({
            documentList: that.data.documentList.concat(data)
          })
        }
        //加载完文档，加载标签集合
        that.getLabelList();
      },
      fail: function (res) {
        console.log('文档获取失败' + res);
      }
    })
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
  //跳转
  targetTo: function (e) {
    var that = this;
    var index = e.target.dataset.index
    var docList = that.data.documentList;
    if (that.data.isEncode == false) {
      for (var i = 0; i < docList.length; i++) {
        docList[i].filePath = encodeURIComponent(docList[i].filePath);
      }
      //编码判断符
      that.setData({
        isEncode: true
      })
    }
    docList = JSON.stringify(docList);
    wx.navigateTo({
      url: that.data.documentUrl + '?data=' + docList + '&index=' + index,
    })
  },
  //转换时间格式
  changeFormat: function(data){
    for(var i=0;i<data.length;i++){
      var time = data[i].updateTime;
      var arr = time.split('-');
      arr[1] = arr[1] + '/';
      arr[1] = arr[1] + arr[2];
      data[i].updateTime = arr;
    }
    return data;
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
    var that = this;
    //判断是否加载跟多
    if (that.data.isHaveMore) {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
      //弹出“加载”框
      wx.showLoading({
        title: '加载中',
      })
      //检查网络状态并发起数据请求
      that.checkNetAndDoRequest(that.data.id);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})