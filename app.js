//app.js
App({
  onLaunch: function () {
    
  },
  checkLogin:function(url,ftype){
    if(!this.globalData.hadLogin){
      wx.redirectTo({
        url: "/pages/login/login?targetPage=" + url + "&turnToWay=" + ftype
      })
    }
  },
  globalData: {
    userInfo: null,
    serverAddress:'http://120.77.40.163:8080/PartyAffairs/',
    dropDownTime:800,
    hadLogin:false,
    header:{
      Cookie:'',
    }
  }



})