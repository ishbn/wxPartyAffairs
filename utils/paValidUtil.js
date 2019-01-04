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
module.exports = {
  checkImgPath: checkCover
}