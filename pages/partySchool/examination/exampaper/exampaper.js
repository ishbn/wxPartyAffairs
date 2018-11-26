// pages/partySchool/examination/exampaper/exampaper.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examID: null,
    multipleScore: 2,
    singleScore: 1,

    serverurl: app.globalData.serverAddress,

    timer: '', //这个定时器返回的ID
    countDownNum: '10', //倒计时初始值
    result: '00:00:00', //格式化后的时间

    score: 0,

    flag: true,

    wheight: null,

    toView: "xxx",

    temp_checked: null,

    i: 0,

    userdata: [],

    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      examID: options.examID,
      multipleScore: options.multipleScore,
      singleScore: options.singleScore
    })
    //调用函数请求试卷
    this.askforpaper(this.data.examID);



    //获得可使用窗口高度
    try {
      var res = wx.getSystemInfoSync()
      console.log(res.windowHeight)
      this.setData({
        wheight: res.windowHeight
      })
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //单选事件
  radioChange: function(e) {

    this.setData({
      temp_checked: e.detail.value
    })

  },

  // 单选选中
  getsingle: function(e) {

    /**
     * 通过获得当下题目序号indexnum，设置temp存储所选题ID和答案
     * 以数组形式存储temp对象
     * 多选处相同处理
     */
    var indexnum = e.currentTarget.dataset.indexnum;

    var temp = {
      questionId: e.currentTarget.dataset.id,
      userAnswer: this.data.temp_checked
    };

    var array = new Array();
    array = this.data.userdata;

    if (array[indexnum] == null) {
      array[indexnum] = temp;
    } else if (array[indexnum] != null) {
      array.splice(indexnum, 1, temp);
    }
    this.setData({
      userdata: array
    });

  },

  //多选事件
  checkboxChange: function(e) {

    //将所选答案存放在临时变量里，方便改动而不影响
    this.setData({
      temp_checked: e.detail.value
    })


  },

  //选中多选
  getmultiple: function(e) {

    //注释参考函数getsingle处

    var indexnum = e.currentTarget.dataset.indexnum;

    var temp = {
      questionId: e.currentTarget.dataset.id,
      userAnswer: this.data.temp_checked.join(",") //存成字符串
    };

    var array = new Array();
    array = this.data.userdata;

    if (array[indexnum] == null) {
      array[indexnum] = temp;
    } else if (array[indexnum] != null) {
      array.splice(indexnum, 1, temp);
    }
    this.setData({
      userdata: array
    });

  },

  //提交答案
  commit: function(e) {
    var that = this;

    console.log("答案是：", that.data.userdata)
    var score = 0;
    var singleScore = that.data.singleScore;
    var multipleScore = that.data.multipleScore;
    var examPaper = that.data.userdata;
    var examnum = that.data.userdata.length;
    var single = that.data.content.singleQuestion;
    var singlenum = that.data.content.singleQuantity;
    var multiplenum = that.data.content.multipleQuantity;
    var multiple = that.data.content.multipleQuestion;
    //用作判断是否全部完成了
    if (examnum < singlenum + multiplenum) {
      wx.showToast({
        title: '请完成所有题后再提交',
        icon: 'none',
        duration: 2500
      })
      return;
    }

    //开始计算分数,单选
    for (var i = 0; i < singlenum; i++) {
      if (typeof(examPaper[i]) == "undefined") {
        //如果没有选过该选项，提示它
        var num = i + 1;
        wx.showToast({
          title: '请完成第' + num + '题',
          icon: 'none',
          duration: 2500
        });
        that.setData({
          toView: num
        })
        return;
      } else if (examPaper[i].userAnswer == single[i].answer) {
        score = parseInt(score) + parseInt(singleScore);
        console.log("单选得分为：", score)
      }


    }
    //开始计算多项分数
    for (var j = 0; j < multiplenum; j++) {

      if (typeof (examPaper[j + singlenum]) == "undefined") {
        //如果没有选过该选项，提示它
        var num = j + singlenum + 1;
        wx.showToast({
          title: '请完成第' + num + '题',
          icon: 'none',
          duration: 2500
        });
        that.setData({
          toView: num
        })
        return;
      } 

      var tempexam = examPaper[j + singlenum].userAnswer.split(",");
      var tempanswer = multiple[j].answer;
      if (tempexam.sort().toString() == tempanswer.sort().toString()) {
        //score = score + multipleScore;
        score = parseInt(score) + parseInt(multipleScore);
        console.log("多选得分为：", score)
      }

    }

    console.log("总得分为：", score)

    //发送试卷ID、分数以及对应的题号ID和答案到服务器
    wx.request({
      url: that.data.serverurl + 'exampaper/' + that.data.examID + '/' + score,
      method: 'POST',
      data: JSON.stringify(examPaper),
      dataType: 'json',
      header: {
        'content-type': 'application/json', // 默认值
        Cookie: app.globalData.header.Cookie
      },
      success: function(res) {
        console.log(res, that.data.examID)
        if (res.data.data.passScore > score) {
          wx.showModal({
            title: '考试不及格,重新考试',
            content: '本次分数为：' + score,
            success: function(res) {
              /**
               * 不及格，重新请求试卷
               */
              wx.redirectTo({
                url: '/pages/partySchool/examination/exampaper/exampaper?examID=' + that.data.examID + '&multipleScore=' + that.data.multipleScore + '&singleScore=' + that.data.singleScore,
              })
            }
          })
        } else {
          if (res.data.data.topScore >= score) {
            wx.showModal({
              title: '考试及格',
              content: '本次分数为：' + score + ',历史最高分为' + res.data.data.topScore,
              success: function(res) {
                //考试及格，返回
                wx.navigateBack({
                  delta: 3
                })
              }
            })
          } else {
            wx.showModal({
              title: '考试及格',
              content: '本次分数为：' + score + ',为历史最高分',
              success: function(res) {
                //考试及格，返回
                wx.navigateBack({
                  delta: 3
                })
              }
            })
          }
        }
      }
    })

  },

  //根据examID请求试卷内容
  askforpaper: function(examID) {
    var that = this;
    //向服务器发送试卷ID并获得试卷内容
    wx.request({
      method: "GET", // 请求方式
      url: that.data.serverurl + 'exampaper/' + examID, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(result) {
        console.log(result);
        if (result.statusCode == 200 && result.data.status == 0) {

          that.setData({
            content: result.data.data
            //countDownNum: result.data.data.examPeriod
          })

          that.countDown(result.data.data.examPeriod); //倒计时
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 2000
          })
        }
      }
    })
  },

  showit: function(e) {
    this.setData({
      flag: this.data.flag ? false : true
    })
  },

  targetTo: function(e) {
    this.setData({
      toView: e.currentTarget.dataset.tabid,
      flag: this.data.flag ? false : true
    })
  },

  //计时器
  countDown: function (countDownNum) {
    var that = this;
    //var countDownNum = that.data.countDownNum; //获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着

        //秒数格式化
        that.date_format(countDownNum);

        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能

          that.setData({
            result: '时间到'
          })
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);

          //关闭定时器之后，可作其他处理codes go here
          that.commit();
        }
      }, 1000)
    })
  },

  // 时间格式化输出，如03:25:19。每10ms都会调用一次
  date_format: function(second) {

    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60)); // 

    var result = hr + ":" + min + ":" + sec;
    this.setData({
      result: result
    })
  },

  //补零
  fill_zero_prefix: function(num) {
    return num < 10 ? "0" + num : num
  }

})