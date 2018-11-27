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
    serverAddress:'http://192.168.43.67:8080/PartyAffairs/',
    dropDownTime:800,
    hadLogin:false,
    header:{
      Cookie:'',
    }
  }



})