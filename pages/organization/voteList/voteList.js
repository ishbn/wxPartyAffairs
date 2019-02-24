// pages/organization/voteList/voteList.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        localUrl: "/pages/organization/voteList/voteList",
        voteUrl :"/pages/organization/vote/vote",
        content: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //其他开发器上编辑，待确定跳转方式，原方式redirectTo
        if (!paValidUtil.checkLogin(that.data.localUrl, 2)) {
            return;
        }
        that.askForServer();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //请求服务器，获得投票列表
    askForServer: function () {
        var that = this;
        var url = 'voteinfo/votinglist';
        commonUtils.commonAjax(url, "", 1).then(that.processResult);
    },
    processResult: function (res) {
      var that = this;
        if (res.statusCode == 200 && res.data.status == 0) {
            that.setData({
                content: res.data.data
            });
        } else {
            commonUtils.commonTips(res.statusCode);
        }
    },
    //获得voteId，进入投票详情
    targetTo: function (e) {
        var voteId = e.currentTarget.dataset.id;
        var url = voteUrl+'?voteId=' + voteId;
        pahelper.navigateTo(url);

    }

})