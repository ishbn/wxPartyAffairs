'use strict';

let app = getApp();

// 后继的代码都会放在此对象中
// let handler = {
Page({
  data: {

    page: 1, //当前加载第几页的数据
    days: 3,
    pageSize: 4,
    totalSize: 0,
    hasMore: true, // 用来判断下拉加载更多内容操作
    articleList: [], // 存放文章列表数据，与视图相关联
    defaultImg: "/images/bg/bg_time.png"
  },
  onLoad(options) {
    this.requestArticleData(1);
    this.setData({
      hiddenLoading: false
    })
  },
  /*
   * 获取文章列表数据
   */
  requestArticleData: function(id) {
    var that = this;
    var addr = app.globalData.serverAddress;
    wx.request({
      url: addr+'/study/get_study_documents_by_label_id.do',
      // mock: true,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        label_id: [id],
        page: that.data.page+1||1, //当前页码
        pageNum: 10 //每页显示8条记录

        // tag: '微信热门',
        // start: this.data.page || 1,
        // days: this.data.days || 3,
        // pageSize: this.data.pageSize,
        // langs: config.appLang || 'en'
      },
      success: function(res) {
        console.log(res);
        if (res.data.status === 0 && res.data.data.list.length) {

          // 正常数据 do something
          let articleData = res.data.data.list;
          console.log(articleData);
          //重构原始数据
          let format1Data = that.formatArticleDataStructure(articleData);
          //格式化原始数据
          let formatData = that.formatArticleData(format1Data);
          console.log(formatData);
          that.renderArticle(formatData);
        }
        /*
         * 如果加载第一页就没有数据，说明数据存在异常情况
         * 处理方式：弹出异常提示信息（默认提示信息）并设置下拉加载功能不可用
         */
        else if (that.data.page === 1 && res.data && res.data.length === 0) {
          // util.alert();
          this.setData({
            hasMore: false
          });
        }
        /*
         * 如果非第一页没有数据，那说明没有数据了，停用下拉加载功能即可
         */
        else if (that.data.page !== 1 && res.data && res.data.length === 0) {
          that.setData({
            hasMore: false
          });
        }
        /*
         * 返回异常错误
         * 展示后端返回的错误信息，并设置下拉加载功能不可用
         */
        else {
          // util.alert('提示', res);
          this.setData({
            hasMore: false
          });
          return null;
        }

      }
    });
  },
  /*重构数据结构*/
  formatArticleDataStructure: function(data) {
    var that = this;
    var list = [];
    //日期集合
    var dategroup = that.getDateGroup(data);
    //重构数据结构
    for (var i = 0; i < dategroup.length; i++) {
      var ob = {};
      ob.formateDate = dategroup[i];
      ob.date = dategroup[i];
      //获取该日期下的数据
      var dataListByDate = that.getDataByDate(data, dategroup[i]);
      ob.articles = dataListByDate;
      list.push(ob);
    }
    return list;
  },

  /*数据根据日期分组*/
  getDataByDate: function(data, date) {
    var lists = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].updateTime == date) {
        data[i].hasVisited = false;
        lists.push(data[i]);
      }
    }
    return lists;
  },
  /*获取数据日期集合 */
  getDateGroup: function(data) {
    var dategroup = [];
    for (var i = 0; i < data.length; i++) {
      var dtime = data[i].updateTime;
      var flag = false;
      for (var j = 0; j < dategroup.length; j++) {
        if (dtime == dategroup[j]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        dategroup.push(dtime);
      }
    }
    return dategroup;
  },
  /*
   * 格式化文章列表数据
   */
  formatArticleData(data) {
    var that = this;
    let formatData = undefined;
    if (data && data.length) {
      formatData = data.map((group) => {
        // 格式化日期
        group.formateDate = that.dateConvert(group.date);
        if (group && group.articles) {
          let formatArticleItems = group.articles.map((item) => {
            // 判断是否已经访问过
            item.hasVisited = that.isVisited(item.documentId);
            return item;
          }) || [];
          group.articles = formatArticleItems;
        }
        return group
      })
    }
    return formatData;
  },
  /*
   * 将原始日期字符串格式化 '2017-06-12'
   * return '今日' / 08-21 / 2017-06-12
   */
  dateConvert(dateStr) {
    if (!dateStr) {
      return '';
    }
    let today = new Date(),
      todayYear = today.getFullYear(),
      todayMonth = ('0' + (today.getMonth() + 1)).slice(-2),
      todayDay = ('0' + today.getDate()).slice(-2);
    let convertStr = '';
    let originYear = +dateStr.slice(0, 4);
    let todayFormat = `${todayYear}-${todayMonth}-${todayDay}`;
    if (dateStr === todayFormat) {
      convertStr = '今日';
    } else if (originYear < todayYear) {
      let splitStr = dateStr.split('-');
      convertStr = `${splitStr[0]}年${splitStr[1]}月${splitStr[2]}日`;
    } else {
      convertStr = dateStr.slice(5).replace('-', '月') + '日'
    }
    return convertStr;
  },
  /*
   * 判断文章是否访问过
   * @param documentId
   */
  isVisited(documentId) {
    let visitedArticles = app.globalData && app.globalData.visitedArticles || '';
    return visitedArticles.indexOf(`${documentId}`) > -1;
  },
  renderArticle(data) {
    if (data && data.length) {
      let newList = this.data.articleList.concat(data);
      this.setData({
        articleList: newList,
        hiddenLoading: true
      })
    }
  },
  onReachBottom: function() {
    var that = this;
    if (that.data.hasMore) {
      let nextPage = that.data.page + 1;
      that.setData({
        page: nextPage
      });
      that.requestArticleData(1);
    }
  },
  onShareAppMessage() {
    // let title = config.defaultShareText || '';
    // return {
    //   title: title,
    //   path: `/pages/index/index`,
    //   success: function (res) {
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  },
  showDetail: function(e) {
    var that = this;
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let item = dataset && dataset.item;
    let documentId = item.documentId || 0;
    // 调用实现阅读标识的函数
    that.markRead(documentId);
    console.log("进入详情页");
    wx.navigateTo({
      // url: `../detail/detail?documentId=${documentId}`
      url: `/pages/organization/partyUserInfo/partyUserInfo`

    });
  },
  /*
   * 如果我们只是把阅读过的文章documentId保存在globalData中，则重新打开小程序后，记录就不存在了
   * 所以，如果想要实现下次进入小程序依然能看到阅读标识，我们还需要在缓存中保存同样的数据
   * 当进入小程序时候，从缓存中查找，如果有缓存数据，就同步到 globalData 中
   */
  markRead(documentId) {
    var that = this;
    //先从缓存中查找 visited 字段对应的所有文章 documentId 数据
    that.getStorageData('visited', (data) => {
      let newStorage = data;
      if (data) {
        //如果当前的文章 documentId 不存在，也就是还没有阅读，就把当前的文章 documentId 拼接进去
        if (data.indexOf(documentId) === -1) {
          newStorage = `${data},${documentId}`;
        }
      }
      // 如果还没有阅读 visited 的数据，那说明当前的文章是用户阅读的第一篇，直接赋值就行了 
      else {
        newStorage = `${documentId}`;
      }

      /*
       * 处理过后，如果 data(老数据) 与 newStorage(新数据) 不一样，说明阅读记录发生了变化
       * 不一样的话，我们就需要把新的记录重新存入缓存和 globalData 中 
       */
      if (data !== newStorage) {
        if (app.globalData) {
          app.globalData.visitedArticles = newStorage;
        }
        that.setStorageData('visited', newStorage, () => {
          that.resetArticles();
        });
      }
    });
  },
  resetArticles() {
    var that = this;
    let old = that.data.articleList;
    let newArticles = that.formatArticleData(old);
    that.setData({
      articleList: newArticles
    });
  },
  getStorageData: function(key, cb) {
    let self = this;
    wx.getStorage({
      key,
      success: function(res) {
        cb && cb(res.data)
      },
      fail: function(err) {
        let msg = err.errMsg || ''
        if (/getStorage:fail/.test(msg)) {
          self.setStorageData(key)
        }
      }
    })
  },
  setStorageData(key, value = '', cb) {
    wx.setStorage({
      key,
      data: value,
      success: function() {
        cb && cb()
      }
    })
  }

})
// Page(handler)