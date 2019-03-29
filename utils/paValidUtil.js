module.exports = {
  patchImg:pathImgFun,
  checkImgPath: checkCover,
  checkSingleImgPath: checkSingleImgPath,
  checkLogin: checkLogin
}

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
    // res[i].coverpath = app.globalData.defulatImg;

  }
  return res;
}

const valid = (url, ftype) =>{
  var en_url = encodeURIComponent(url);
  ftype = getForwordType(ftype);
    wx.redirectTo({
      url: "/pages/login/login?targetPage=" + en_url + "&turnToWay=" + ftype
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
  var en_url = encodeURIComponent(url);
  wx.redirectTo({
    url: "/pages/login/login?targetPage=" + en_url + "&turnToWay=" + ftype
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
function checkSingleImgPath(path){
  if ((!path) || path == "#默认#") {
    path =  app.globalData.defulatImg;
  } 
  path = app.globalData.defulatImg;
  return path;
}

/**
 * 集中图片处理
 * 
 * 1-
 * 2-
 * 3-相册图片URL处理
 */
function pathImgFun(index,data){
  if (!data){
    return;
  }
  var proccedData = null;
  switch (index){
    case 1:
      proccedData = checkCover(data);
    break;
    case 2:
      proccedData = checkSingleImgPath(data);
      break;
    case 3:
      proccedData = processAlbum(data);
      break;
    case 4:
      proccedData = processAlbumList(data);
      break;
    default:
      break;
  }
  return proccedData;
}

function processAlbum(res){
  if (!res) {
    return;
  }
  for (var i = 0; i < res.length; i++) {
    if (!res[i].image) {
      res[i].image = app.globalData.defulatImg;
    } else {
      if (res[i].image.indexOf("http") == -1 ){
        // res[i].image = app.globalData.ftpAddress + res[i].image;
        res[i].image = res[i].image;
      }
    }
    // res[i].image = app.globalData.defulatImg;
  }
  return res;

}

function processAlbumList(res){
  if (!res) {
    return;
  }
  for (var i = 0; i < res.length; i++) {
    if (!res[i].coverImage) {
      res[i].coverImage = app.globalData.defulatImg;
    } else {
      if (res[i].coverImage.indexOf("http") == -1) {
        // res[i].coverImage = app.globalData.ftpAddress + res[i].coverImage;
        res[i].coverImage = res[i].coverImage;
      }
    }
    // res[i].coverImage = app.globalData.defulatImg;
  }
  return res;
}