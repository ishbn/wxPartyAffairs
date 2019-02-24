//index.js
//获取应用实例
const app = getApp();
// http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400
var start;
Page({
  data: {
    // videoArr:[{}],
    videoCtx: null,
    isPlay: true,
    percent: 0,

    current: 0,
    pages: 0,
    page: 1,

    id: "1",
    post_content: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    avatar: "3",
    post_like: "4",
    post_collect: "5",
    comment_count: "6",
    user_nickname: "7",
    post_desc: "8",
    thumbnail: "9",
    voice: "10",
    to_userid: "11",
    arid: "12",


    showBtn: false,
    timeLen: 60,
    navCurrent: 0,
    love: "",
    collectShow: "",
  },
  onLoad: function(options) {
    // this.loadData(1, this.changeSubject);
    var that = this;
    // var user_id = app.d.userId;
    var id = options.id; //文章所属id  data-id
    that.setData({
      avatar: '1',
      // post_content: '2',
      post_like: '3',
      post_collect: '4',
      comment_count: '5',
      user_nickname: 'namenamenamenamenamenamenamename',
      thumbnail: '7',
      post_desc: 'descdescdescdescdescdescdescdescdescdescdescdescdescdescdesc',
      to_userid: '9',
      arid: '10'
    })


  },

  onReady: function() {
    this.videoCtx = wx.createVideoContext('myVideo');
  },

  recommendShow(e) {
    this.setData({
      navCurrent: 0
    })
  },
  Surrounding(e) {
    this.setData({
      navCurrent: 1
    })
  },


  radioChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  play: function() {
    if (this.data.isPlay) {
      this.videoCtx.pause();
    } else {
      this.videoCtx.play()
    }
  },
  bindPlay() {
    this.setData({
      isPlay: true
    })
  },
  bindPause() {
    this.setData({
      isPlay: false
    })
  },
  ended() {
    this.videoCtx.seek(0); //重新播放
  },
  imgTap(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userinfo/userinfo?id=' + id,
    })
  },
  loadData: function(page, success) {
    var that = this;
    this.setData({
      page: page
    })
    getRecommendList({
      data: {
        page: page,
        rows: 5,
        type: 'video'
      },
      success: function(res) {
        var list = res.content;
        if (list) {
          var listData = [];
          for (var i = 0; i < that.data.subjectList.length; i++) {
            listData.push(that.data.subjectList[i])
          }
          for (var i = 0; i < list.length; i++) {
            listData.push(list[i])
          }
          that.setData({
            count: res.count,
            page: page,
            pages: res.pages,
            subjectList: listData
          })
          if (success) {
            success();
          }
        }
      }
    })
  },
  changeSubject: function(current) {
    current = current || 0;
    var list = this.data.subjectList;
    if (list.length <= current) {
      return;
    }
    this.setData({
      current: current,
      subject: list[current]
    })
    // 自动加载
    var diff = list.length - current;
    if (diff <= 5) {
      this.loadData(this.data.page + 1);
    }
  },
  // 视频播放时间更新
  timeupdate: function(e) {
    var val = e.detail.currentTime;
    var max = e.detail.duration;
    var percent = Math.round(val / max * 10000) / 100;
    this.setData({
      percent: percent
    })
  },
  // 播放上一个抖音
  pre: function() {
    this.changeSubject(this.data.current - 1);
  },

  // 播放下一个抖音
  next: function() {
    this.changeSubject(this.data.current + 1);
  },

  // 下面主要模仿滑动事件
  touchstart: function(e) {
    start = e.changedTouches[0];
    // console.log("touchstart ", e.changedTouches[0])
  },

  touchmove: function(e) {
    // console.log("touchmove ", e.changedTouches[0])
  },

  touchend: function(e) {
    // console.log("touchend ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  touchcancel: function(e) {
    // console.log("touchcancel ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  // 计算滑动方向
  getDirect(start, end) {
    var X = end.pageX - start.pageX,
      Y = end.pageY - start.pageY;
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      console.log("right");
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      console.log("left");
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      console.log("bottom");
      this.pre();
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      console.log("top");
      this.next()
    }
  },
})

// 获取第一个应用
function getRecommendList(opt) {

}