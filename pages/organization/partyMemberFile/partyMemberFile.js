// pages/organization/partyMemberFile/partyMemberFile.js
var app = getApp();
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        thisPage: "/pages/organization/partyMemberFile/partyMemberFile",
        userinfo: null,
        serverurl: app.globalData.serverAddress,
        content: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //检查登录
        if (!paValidUtil.checkLogin(that.data.thisPage, 2)) {
            return;
        }
        //用户头像
        try {
            var userinfo = wx.getStorageSync('userInfo');
            that.setData({
                userinfo: userinfo
            })
        } catch (e) {
            console.log(e);
        }
        var url = 'userInfo/partyInfo';
        commonUtils.commonAjax(url,"",1).then(that.processResult);
    },
    processResult: function (res) {
        var that = this;
        if ( res.statusCode == 200&&res.data.status == 0 ) {
            console.log(res.data.data);
            that.setData({
                content: res.data
            })
        } else {
            commonUtils.commonTips(res.statusCode);
        }
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

    }
})