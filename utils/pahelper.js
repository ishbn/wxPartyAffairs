module.exports = {
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  redirectTo:redirectTo,
  showToast: showToast,
  getScreenHeight: getScreenHeight
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