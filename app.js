//app.js
App({
  onLaunch: function () {
    var that = this;
    that.getStorageData('visited', (data) => {
      this.globalData.visitedArticles = data;
    });
    
  },
  checkLogin:function(url,ftype){
    if(!this.globalData.hadLogin){
      wx.redirectTo({
        url: "/pages/login/login?targetPage=" + url + "&turnToWay=" + ftype
      })
    }
  },
  getStorageData: function (key, cb) {
    let self = this;
    wx.getStorage({
      key,
      success: function (res) {
        cb && cb(res.data);
      },
      fail: function (err) {
        let msg = err.errMsg || ''
        if (/getStorage:fail/.test(msg)) {
          // self.setStorageData(key,"");
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    serverAddress:'http://120.77.40.163:8080/PartyAffairs/',
    // serverAddress: 'http://127.0.0.1:8080/',
    // serverAddress: 'http://192.168.191.5:8080/',
    ftpAddress:"",
    dropDownTime:800,
    hadLogin:false,
    header:{
      Cookie:'',
    },
    defulatImg:"/images/bg/noimage.jpg",
    visitedArticles: ''
  }



})