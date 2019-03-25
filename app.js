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
    // serverAddress:'http://120.77.40.163:8080/PartyAffairs/',
    // serverAddress: 'http://192.168.88.53:8080/',
    serverAddress: 'http://192.168.31.12:8080/',
    ftpAddress:"",
    dropDownTime:800,
    hadLogin:false,
    header:{
      Cookie:'',
    },
    defulatImg:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1157009332,1494584540&fm=173&app=25&f=JPEG?w=640&h=427&s=9E808748B7AABF4D16751C030000A0C1",
    visitedArticles: ''
  }



})