// 获取公共配置
var app = getApp();

/**检查封面图片是否为空 待确认路径为相对还是绝对*/
function checkCover(res){
  if (!res){
    return;
  }
  for (var i = 0; i < res.length; i++) {
    if ((!res[i].coverpath) || res[i].coverpath == "#默认#") {
      res[i].coverpath = app.globalData.defulatImg;
    } else {
      // res[i].coverpath = app.globalData.serverAddress + res[i].coverpath;
      res[i].coverpath = res[i].coverpath;

    }
    res[i].coverpath = app.globalData.defulatImg;

  }
  return res;
}

const valid = (url, ftype) =>{
  ftype = getForwordType(ftype);
    wx.redirectTo({
      url: "/pages/login/login?targetPage=" + url + "&turnToWay=" + ftype
    });

}
/**校验登录态，并以相应的方式登录跳转到该页面 */
function checkLogin(url, ftype) {
    var flag = app.globalData.hadLogin;
    if (flag) {
        return true;
    } else {
      valid(url, ftype);
    }
}
const turnTo = (url, ftype)=>{
  wx.redirectTo({
    url: "/pages/login/login?targetPage=" + url + "&turnToWay=" + ftype
  });
}
/**获取跳转方式 */
const getForwordType = (code)=>{
  switch (code) {
    case 1:
      return "navigateTo";
      break;
    case 2:
      return "redirectTo";
      break;
    case 3:
      return "switchTab";
      break;
    case 4:
      return "reLaunch";
      break;
    case 5:
      return "navigateBack";
      break;
    default:
      return "navigateTo";
      break;
  }
}
module.exports = {
  checkImgPath: checkCover,
  checkLogin: checkLogin
}