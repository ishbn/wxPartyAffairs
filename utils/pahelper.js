module.exports = {
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  showToast: showToast
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
