// pages/organization/vote/vote.js
var commonUtils = require("../../../utils/commonUtil.js");
var paValidUtil = require("../../../utils/paValidUtil.js");
var pahelper = require("../../../utils/pahelper.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: false,
        localUrl: "/pages/organization/organization/vote/vote",
        voteId: null,
        answer: null,
        abandon: 0,//0代表非弃票，1代表弃票

        iscarryout: false,
        btnvote: false,
        btnnews: "确认投票",
        voteInfo: "",
        choice: [],
        // 这是排序投票所需的内容
        movableViewPosition: {
            x: 0,
            y: 0,
            className: "none",
            data: {}
        },
        scrollPosition: {
            everyOptionCell: 65,
            top: 127,
            scrollTop: 0,
            scrollY: true,
            scrollViewHeight: 1000,
            scrollViewWidth: 375,
            windowViewHeight: 1000,
        },
        selectItemInfo: {
            choiceContent: "",
            choiceId: "",
            selectIndex: -1,
            selectPosition: 0,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (!paValidUtil.checkLogin(that.data.localUrl, 1)) {
            return;
        }
        //为排序投票提供
        var systemInfo = wx.getSystemInfoSync();
        var scrollViewHeight = systemInfo.windowHeight - 47;
        var scrollViewWidth = systemInfo.windowWidth;
        that.setData({
            'scrollPosition.scrollViewWidth': scrollViewWidth,
            'scrollPosition.scrollViewHeight': scrollViewHeight,
            'scrollPosition.windowViewHeight': systemInfo.windowHeight,
        });

        var voteId = options.voteId;
        if (voteId == null || typeof(voteId) == "undefind") {
            that.setData({
                flag: true
            });
            return;
        }
        //请求数据，传入voteId
        that.askforserver();
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
    /**
     * 单选事件
     */
    radioChange: function (e) {
        //console.log(e);
        var value = e.detail.value;
        this.setData({
            answer: value
        });
        console.log("单选内容", this.data.answer);
    },


    /**
     * 多选事件
     */
    checkboxChange: function (e) {
        var value = e.detail.value;
        this.setData({
            answer: value
        });
        console.log("多选内容", this.data.answer);
    },
    /**
     * 确认投票
     */
    confirmvote: function () {
        var that = this;
        wx.showModal({
            title: '确定所选内容吗',
            content: '',
            success: function (res) {
                if (res.confirm) {

                    //这是排序投票的提交操作
                    if (that.data.voteInfo.type == 2) {
                        var temp = new Array();
                        for (var i = 0; i < that.data.choice.length; i++) {
                            temp.push(that.data.choice[i].choiceId);
                            that.setData({
                                answer: temp,
                                iscarryout: true,
                                btnvote: true,
                                btnnews: "完成投票"
                            })
                        }
                        console.log('用户选择完毕，答案是', that.data.answer)
                        //提交答案到服务器
                        that.sentTo();

                    }
                    //这是多选投票的操作
                    else if (that.data.voteInfo.type == 1) {

                        //注意最多最少的选择判断
                        var least = that.data.voteInfo.least;
                        var most = that.data.voteInfo.most;
                        var length = that.data.answer.length;
                        if (least > length && most == -1) {
                            wx.showToast({
                                title: '至少选择' + least + '个选项',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        else if (most != -1 && most < length) {
                            wx.showToast({
                                title: '至多选择' + most + '个选项',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        else {
                            that.setData({
                                iscarryout: true,
                                btnvote: true,
                                btnnews: "完成投票"
                            });

                            console.log('用户选择完毕，答案是', that.data.answer)
                            //提交答案到服务器
                            that.sentTo();
                        }

                    }
                    //这是单选投票的操作
                    else if (that.data.voteInfo.type == 0) {
                        var temp = new Array();
                        temp.push(that.data.answer);

                        that.setData({
                            answer: temp,
                            iscarryout: true,
                            btnvote: true,
                            btnnews: "完成投票"
                        });

                        console.log('用户选择完毕，答案是', that.data.answer)
                        //提交答案到服务器
                        that.sentTo();
                    }


                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

//弃票操作
    abandon: function () {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定弃票吗',
            success: function (res) {
                if (res.confirm) {
                    //选择弃票，将abandon设为1，将answer设为空
                    that.setData({
                        iscarryout: true,
                        btnvote: true,
                        abandon: 1,
                        answer: null
                    })
                    //提交答案到服务器
                    that.sentTo();
                }
                else if (res.cancel) {
                    console.log('用户取消弃票')
                }
            }
        })
    },

    /**
     * 请求数据
     */
    askforserver: function (voteId) {
        var that = this;
        var url = "voteinfo/" + voteId;
        commonUtils.commonAjax(url, "", 1).then(that.processResult);
    },
    processResult: function (res) {
        var that = this;
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 0) {
            //如果是排序投票，这样处理
            if (res.data.data.voteInfo.type == 2) {
                var optionsList = that.optionsDataTranlate(res.data.data.choice, "");
                that.setData({
                    voteInfo: res.data.data.voteInfo,
                    choice: optionsList,
                    voteId: res.data.data.voteInfo.voteId
                });
            }
            //单选多选这样处理
            else {
                that.setData({
                    voteInfo: res.data.data.voteInfo,
                    choice: res.data.data.choice,
                    voteId: res.data.data.voteInfo.voteId
                })
            }
        } else {
            that.setData({
                flag: true
            });
            commonUtils.commonTips(res.statusCode);
        }
    },
    // 发送投票结果回服务器
    sentTo: function () {
        var that = this;
        var id = that.data.voteId;
        var abandon = that.data.abandon;
        var answer = that.data.answer;
        var url = 'voteresult/' + id + '/' + abandon;
        commonUtils.commonAjax(url,"",2).then(that.voteResult);
    },
    voteResult:function (res) {
        if(res.statusCode ==200 && res.data.data.status == 0){
            pahelper.showToast("投票成功！");
        }else {
            commonUtils.commonTips(res.statusCode);
        }
    },
    // 以下是排序投票所需的函数
    bindscroll: function (event) {
        var scrollTop = event.detail.scrollTop;
        this.setData({
            'scrollPosition.scrollTop': scrollTop
        })
    },

    getOptionInfo: function (code) {
        for (var i = 0, j = this.data.choice.length; i < j; i++) {
            var optionData = this.data.choice[i];
            if (optionData.choiceId == code) {
                optionData.selectIndex = i;
                return optionData;
            }
        }
        return {};
    },

    getPositionDomByXY: function (potions) {
        var y = potions.y - this.data.scrollPosition.top + this.data.scrollPosition.scrollTop;
        var optionsListData = this.data.choice;
        var everyOptionCell = this.data.scrollPosition.everyOptionCell;
        for (var i = 0, j = optionsListData.length; i < j; i++) {
            if (y >= i * everyOptionCell && y < (i + 1) * everyOptionCell) {
                return optionsListData[i];
            }
        }
        return optionsListData[0];
    },

    draggleTouch: function (event) {
        var touchType = event.type;
        //console.log("看看類型是什麽",touchType)
        switch (touchType) {
            case "touchstart":
                this.scrollTouchStart(event);
                break;
            case "touchmove":
                this.scrollTouchMove(event);
                break;
            case "touchend":
                this.scrollTouchEnd(event);
                break;
        }
    },
    scrollTouchStart: function (event) {
        // console.log(event);
        console.log("原始序列為", this.data.choice)
        var firstTouchPosition = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY,
        }
        console.log("firstTouchPosition:", firstTouchPosition);
        var domData = this.getPositionDomByXY(firstTouchPosition);
        console.log("domData:", domData);

        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = firstTouchPosition.y - this.data.scrollPosition.top - this.data.scrollPosition.everyOptionCell / 2;

        this.setData({
            movableViewPosition: {
                x: movableX,
                y: movableY,
                className: "",
                data: domData
            }
        })

        var secCode = domData.choiceId;
        var secInfo = this.getOptionInfo(secCode);
        secInfo.selectPosition = event.changedTouches[0].clientY;
        secInfo.selectClass = "dragSelected";

        this.data.choice[secInfo.selectIndex].selectClass = "dragSelected";

        var optionsListData = this.data.choice;

        this.setData({
            'scrollPosition.scrollY': false,
            selectItemInfo: secInfo,
            choice: optionsListData,
            'scrollPosition.selectIndex': secInfo.selectIndex
        })
    },

    scrollTouchMove: function (event) {
        var selectItemInfo = this.data.selectItemInfo;
        var selectPosition = selectItemInfo.selectPosition;
        var moveDistance = event.changedTouches[0].clientY;
        var everyOptionCell = this.data.scrollPosition.everyOptionCell;
        var optionsListData = this.data.choice;
        var selectIndex = selectItemInfo.selectIndex;

        //console.log("滑動位置的改變event.changedTouches:",event.changedTouches);
        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = event.changedTouches[0].pageY - this.data.scrollPosition.top - this.data.scrollPosition.everyOptionCell / 2;


        this.setData({
            movableViewPosition: {
                x: movableX,
                y: movableY,
                className: "",
                data: this.data.movableViewPosition.data
            }
        })

        if (moveDistance - selectPosition > 0 && selectIndex < optionsListData.length - 1) {
            if (optionsListData[selectIndex].choiceId == selectItemInfo.choiceId) {
                optionsListData.splice(selectIndex, 1);
                optionsListData.splice(++selectIndex, 0, selectItemInfo);
                selectPosition += everyOptionCell;
            }
        }

        if (moveDistance - selectPosition < 0 && selectIndex > 0) {
            if (optionsListData[selectIndex].choiceId == selectItemInfo.choiceId) {
                optionsListData.splice(selectIndex, 1);
                optionsListData.splice(--selectIndex, 0, selectItemInfo);
                selectPosition -= everyOptionCell;
            }
        }

        this.setData({
            'selectItemInfo.selectPosition': selectPosition,
            'selectItemInfo.selectIndex': selectIndex,
            choice: optionsListData,
        });
    },

    scrollTouchEnd: function (event) {
        console.log(event);
        var optionsListData = this.optionsDataTranlate(this.data.choice, "");

        this.setData({
            choice: optionsListData,
            'scrollPosition.scrollY': true,
            'movableViewPosition.className': "none"
        }),
            console.log("排序后为", this.data.choice)
    },

    optionsDataTranlate: function (optionsList, selectClass) {
        for (var i = 0, j = optionsList.length; i < j; i++) {
            optionsList[i].selectClass = selectClass;
        }
        return optionsList;
    }


})