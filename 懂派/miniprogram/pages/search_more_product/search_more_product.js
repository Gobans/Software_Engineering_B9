// pages/search_more_product/search_more_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_products: []
  },

  gotoProduct: function (e) {

    var id = e.currentTarget.dataset.id
    console.log(id)
    var that = this
    wx.navigateTo({
      url: '../product/product?product_id=' + id,
    })

    wx.navigateTo({
      url: '../product/product',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var dat = JSON.parse(options.dat)
    var that = this
    //获得产品的搜索结果
    wx.cloud.callFunction({
      name: 'searchProduct',
      data: {
        weightLow: dat.weightLow,
        weightHigh: dat.weightHigh,
        durationLow: dat.durationLow,
        durationHigh: dat.durationHigh,
        priceLow: dat.priceLow,
        priceHigh: dat.priceHigh,
        thicknessLow: dat.thicknessLow,
        thicknessHigh: dat.thicknessHigh,
        MAX_LIMIT: 40,
      },
      success: res => {
        console.log(res);
        this.setData({
          hot_products: res.result.data.hot_products
        })
      },
      fail: err => {
        console.error('[云函数] [query_similar_words] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数是否已部署',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
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