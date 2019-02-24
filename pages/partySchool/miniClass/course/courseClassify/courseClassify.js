// pages/partySchool/partyClass/selectClass/details/detail.js
var app = getApp();
var commonUtils = require("../../../../../utils/commonUtil.js");
var paValidUtil = require("../../../../../utils/paValidUtil.js");
var pahelper = require("../../../../../utils/pahelper.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotate: true, //箭头状态 true向下 false向上
    first_click: false,//第一次点击
    content: '全部',//当前是哪种课程
    id:[1,2,3],//标签编号
    checked1: false,//"全部"是否被选中
    checked2: true,//"专题教育"是否被选中
    checked3: false,//"反腐倡廉"是否被选中
    checked4: false,//"政策法规"是否被选中
    localUrl:'/pages/partySchool/miniClass/course/courseClassify/courseClassify',//本地路径
    detailUrl:"/pages/partySchool/miniClass/course/detail/video/video",
    allVedioList:[],//所有视频
    labelList:[],//所有标签
    vedioList:[],//所有视频
    isHaveMore: true,//是否加载更多
    currentPage: 1,//当前页码
    list: {//标签
      education: [
        '全部','党章党规','三会一课','制度治国','党史'
      ],
      law: [
        '全部', '国家政策', '规章制度', '政策要闻'
      ],
      antiCorruption: [
        '全部', '反腐动态', '廉政时评', '警钟长鸣'
      ]
    },
    dropDwonIcon:'/images/partySchool_icon/arrow.png',
    nullIcon:"/images/partySchool_icon/null.png"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var e = JSON.parse(options.e);
    // this.checked(e);
    var that = this;
    if (!paValidUtil.checkLogin(that.data.localUrl, 2)) {
      return;
    }
    var id = that.data.id;
    that.getVedioList(id);
    //获取所有标签
    that.getLabelList();
  },
  //获取所有视频
  getVedioList: function (id) {
    var that = this;
    var url = 'study/get_study_videos_by_label_id.do';
    var param = {
      label_id: [id],
      page: that.data.currentPage,
      pageNum: '15',
    };
    commonUtils.ajaxRequest(url, param, 2, 1).then(that.processData);
  },
  processData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      //判断是否显示‘加载更多’
      if (res.data.data.totalPage == that.data.currentPage) {
        that.setData({
          isHaveMore: false
        })
      }
      that.setData({
        vedioList: that.data.vedioList.concat(res.data.data.list)
      })
    } else {
      commonUtils.commonTips(res.statusCode);
    }
  },
  //获取标签集合
  getLabelList: function () {
    var that = this;
    var url = 'study/get_labels.do';
    commonUtils.ajaxRequest(url, "", 2, 1).then(that.processLableData);
  },
  processLableData: function (res) {
    var that = this;
    if (res.statusCode == 200 && res.data.status == 0) {
      that.setData({
        labelList: res.data.data
      });
    } else {
      commonUtils.commonTips(res.statusCode);
    }
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
      that.getVedioList(that.data.id);
      //获取所有标签
      that.getLabelList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //禁止滑动
  banSlide: function () {
  },
  //点击出现下拉菜单
  clickTap: function () {
    var that = this;
    // 第一次点击下拉
    if (!that.data.first_click) {
      that.setData({
        first_click: true
      });
    }
    that.setData({
      rotate: !that.data.rotate
    });
  },
  //点击显示右边标签
  checkTap: function (e) {
    var that = this;
    //判断标签
    switch (e.target.dataset.current) {
      case '1':
        that.setData({
          checked1: true,
          checked2: false,
          checked3: false,
          checked4: false,
          rotate: !that.data.rotate,
          content: '全部',
          id: [1, 2, 3]
        })
        that.checked();
        break;
      case '2':
        that.setData({
          checked1: false,
          checked2: true,
          checked3: false,
          checked4: false
        })
        break;
      case '3':
        that.setData({
          checked1: false,
          checked2: false,
          checked3: true,
          checked4: false
        })
        break;
      case '4':
        that.setData({
          checked1: false,
          checked2: false,
          checked3: false,
          checked4: true
        })
        break;
    }
  },
  //选择具体分类
  checked: function (e) {
    var that = this;
    if (e != null) {
      if (e.target.dataset.self == "全部") {
        var content = e.target.dataset.father;
        that.setData({
          content: content,
          rotate: true
        });
        switch (content) {
          case '专题教育':
            that.setData({
              id: [1]
            })
            break;
          case '政策法规':
            that.setData({
              id: [2]
            })
            break;
          case '反腐倡廉':
            that.setData({
              id: [3]
            })
            break;
        }
      } else {
        var content = e.target.dataset.self;
        that.setData({
          content: content,
          rotate: true,
          id: [e.target.dataset.index]
        });
      }
    }
    //初始化
    that.setData({
      currentPage: 1,
      vedioList: [],
      isHaveMore: true
    })
    that.getVedioList(that.data.id);
    //获取所有标签
    that.getLabelList();
  }
})