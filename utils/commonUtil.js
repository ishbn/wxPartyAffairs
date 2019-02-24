module.exports = {
    commonAjax: commonAjax,
    ajaxRequest:requestWithContentType,
    commonTips: commonTips,
    commonPullDownRefresh: commonPullDownRefresh,
    commonArrayAdd: paArrayAddEle
}

// 获取公共配置
var app = getApp();
/**
 *  @param url 请求url
 *  @param data 数据请求
 *  @param type 请求方式 1-GET,2-POST,3-HEAD,4-OPTIONS,5-PUT,6-DELETE,7-TRACE,8-CONNECT
 */
function commonAjax(url, data, type) {
  wx.showLoading({
    title: '加载中...',
  })

  // 公共参数
  var publicHeader = {
    // "content-type":((type === 1) ? 'application/json' : 'application/x-www-form-urlencoded')
    "content-type": 'application/json'
  };
  var publicData = {};

  // 合并对象(公共参数加传入参数合并对象) es5方式
  var requestHeader = Object.assign({}, publicHeader, app.globalData.header);
  var requestData = Object.assign({}, publicData, data);

  // 这是es6的promise版本库大概在1.1.0开始支持的，大家可以去历史细节点去看一下，一些es6的机制已经可以使用了
  var promise = new Promise(function(resolve, reject, defaults) {
    // 隐藏加载提示
    wx.hideLoading();
    //发起请求
    wx.request({
      url: app.globalData.serverAddress + url,
      data: requestData,
      method: getType(type),
      header: requestHeader,
      success: resolve,
      fail: reject,
      complete: defaults,
    })
  });
  return promise;
}
/**根据参数获取相应的请求方式 */
const getType = (code) => {
  switch (code) {
    case 1:
      return "GET";
      break;
    case 2:
      return "POST";
      break;
    case 3:
      return "HEAD";
      break;
    case 4:
      return "OPTIONS";
      break;
    case 5:
      return "PUT";
      break;
    case 6:
      return "DELETE";
      break;
    case 7:
      return "TRACE";
      break;
    case 8:
      return "CONNECT";
      break;
    default:
      return "GET";
      break;
  }
}
/**根据状态码，显示提示信息，（待完善）*/
function commonTips(code) {
  switch (code) {
    case 400:
      showTips("错误请求");
      break;
    case 401:
      showTips("未登录");
      break;
    case 403:
      showTips("拒绝请求");
      break;
    case 404:
      showTips("404!");
      break;
    case 500:
      showTips("服务出错！");
      break;
    case 504:
      showTips("网关超时");
      break;
    case 200:
      showTips("数据出错!");
      break;
    default:
      showTips("出了点问题！");
      break;
  }
}

/**显示提示信息 */
const showTips = (tips) => {
  wx.showToast({
    title: tips,
    icon: "loading"
  });
};
/**公共下拉方法处理 */
function commonPullDownRefresh() {
  // 下拉刷新时间
  var time = app.globalData.dropDownTime;
  //设置dropDownTime之后停止刷新，下拉框恢复原位
  setTimeout(function() {
    wx.stopPullDownRefresh();
  }, time);
}

/**集合追加元素,array2追加到array1，返回array1 */
function paArrayAddEle(array1, array2) {
  if (!array1) {
    return array2;
  }
  for (var i = 0; i < array2.length; i++) {
    array1.push(array2[i]);
  }
  return array1;
}
/**初始封装commonAjax没考虑充分额外添加一个方法
 * 
 *  @param url 请求url
 *  @param data 数据请求
 *  @param type 请求方式 1-GET,2-POST,3-HEAD,4-OPTIONS,5-PUT,6-DELETE,7-TRACE,8-CONNECT
 * @param content-type 0-application/json 1-application/x-www-form-urlencoded
 */
function requestWithContentType(url, data, type, ctcode) {
  wx.showLoading({
    title: '加载中...',
  });
  // 公共参数
  var publicHeader = {
    "content-type": ((ctcode === 0) ? 'application/json' : 'application/x-www-form-urlencoded')
  };
  var publicData = {};

  // 合并对象(公共参数加传入参数合并对象) es5方式
  var requestHeader = Object.assign({}, publicHeader, app.globalData.header);
  var requestData = Object.assign({}, publicData, data);

  // 这是es6的promise版本库大概在1.1.0开始支持的，大家可以去历史细节点去看一下，一些es6的机制已经可以使用了
  var promise = new Promise(function(resolve, reject, defaults) {
      // 隐藏加载提示
      wx.hideLoading();
      //发起请求
      wx.request({
        url: app.globalData.serverAddress + url,
        data: requestData,
        method: getType(type),
        header: requestHeader,
        success: resolve,
        fail: reject,
        complete: defaults,
      });
    });
  return promise;
}
