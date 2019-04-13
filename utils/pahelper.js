module.exports = {
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  redirectTo:redirectTo,
  showToast: showToast,
  showFail:showFail,
  getScreenHeight: getScreenHeight,
  downloadFile: downloadFile,
  cancelDownload: cancelDownload,
  isEmpty: isEmpty
}
function redirectTo(targeturl){
    wx.redirectTo({
        url: targeturl
    })
}
function navigateTo(targeturl){
  wx.navigateTo({
    url: targeturl
  })
}

function navigateBack(index){
  wx.navigateBack({
    delta: index
  })
}

function showToast(context){
  wx.showToast({
    title: context,
    duration: 2500
  });
}
function showFail(context){
  wx.showToast({
    title: context,
    icon:"none",
    duration: 2500
  });
}

function getScreenHeight(){
  //默认值为500
  var height = 500;
  //获得可使用窗口高度
  try {
    var res = wx.getSystemInfoSync();
    height = res.windowHeight;
  } catch (e) {
    // Do something when catch error
  }finally{
    return height;
  }
}

function downloadFile(url, filePath){
  console.log(url);
  const downloadTask = wx.downloadFile({
    url: url, // 仅为示例，并非真实的资源
    filePath: filePath,
    success(res) {
      console.log(res);
      // wx.playVoice({
      //   filePath: res.tempFilePath
      // })
      const tempFilePaths = res.tempFilePath
      wx.saveFile({
        tempFilePath: tempFilePaths,
        success(res) {
          const savedFilePath = res.savedFilePath
        }
      })
    }
  })
}

function cancelDownload(){
  DownloadTask.abort()
}

function isEmpty(data){
  if(typeof(data) == 'undefind' || data == ''|| data ==0){
    return true;
  }
  return false;
}

