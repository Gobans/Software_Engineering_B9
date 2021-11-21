// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hot_products: [{
                id: 1,
                name: "ipad",
                imgUrl: "/../images/ipad1.webp"
            },
            {
                id: 2,
                name: "华为",
                imgUrl: "/../images/huawei1.webp"
            },
            {
                id: 3,
                name: "小米",
                imgUrl: "/../images/xiaomi1.jpeg"
            },
            {
                id: 2,
                name: "三星",
                imgUrl: "/../images/三星1.webp"
            }
        ],

        questions:[
            {
                question: "记笔记用什么平板好",
                content: "不用平板好",
                answers: 3,
                status: "有"
            },
            {
                question: "看视频用什么平板好",
                content: "不看视频",
                answers: 3,
                status: "无"
            },
            {
                question: "看书用什么平板好",
                content: "不用平板好",
                answers: 3,
                status: "有"
            },
            {
                question: "学习用什么平板好",
                content: "不看视频",
                answers: 3,
                status: "无"
            },

        ]


    },

    // 转到搜索细节的页面
    search_page: function (e) {
        wx.navigateTo({
            url: '../search/search',
        })
    },

    gotoIndex: function (e) {
        wx.navigateTo({
            url: '../myAnswer/myAnswer', //需要改成index
        })
    },

    gotoPublish: function (e) {
        wx.navigateTo({
            url: '../publish/publish',
        })
    },

    gotoMine: function (e) {
        wx.navigateTo({
            url: '../mine/mine',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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