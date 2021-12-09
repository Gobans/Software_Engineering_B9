// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search_word: "",
        weightLow: 0,
        weightHigh: 1000,
        durationLow: 0,
        durationHigh: 100,
        priceLow: 0,
        priceHigh: 50000,
        thicknessLow:0,
        thicknessHigh:30000
    },

    //获得搜索词
    bindKeyInput:function(e){
        this.setData({
            search_word:e.detail.value
        })
    },

    //获得搜索的关键参数 
    bindPriceLowInput:function(e){
        this.setData({
            priceLow:e.detail.value
        })
    },

    bindPriceHighInput:function(e){
        this.setData({
            priceHigh:e.detail.value
        })
    },

    bindWeightLowInput:function(e){
        this.setData({
            weightLow:e.detail.value
        })
    },

    bindWeightHighInput:function(e){
        this.setData({
            weightHigh:e.detail.value
        })
    },

    bindDurationLowInput:function(e){
        this.setData({
            durationLow:e.detail.value
        })
    },

    bindDurationHighInput:function(e){
        this.setData({
            durationHigh:e.detail.value
        })
    },

    bindThicknessLowInput:function(e){
        this.setData({
            thicknessLow:e.detail.value
        })
    },

    bindThicknessHighInput:function(e){
        this.setData({
            thicknessHigh:e.detail.value
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