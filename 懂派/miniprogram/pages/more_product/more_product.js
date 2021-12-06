// pages/more_product/more_product.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hot_products: []
    },

    gotoProduct: function(e){
        
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

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this
        // 调用云函数
        wx.cloud.callFunction({
          name: 'getHotProducts',
          data: {
            MAX_LIMIT: 30
          },
          success: res => {
            console.log(res);
            if (res.result.errCode == 0) {
              that.setData({
                hot_products: res.result.data.hot_products
              })
            } else {
              wx.showModal({
                title: '抱歉，出错了呢~',
                content: res.result.errMsg,
                confirmText: "我知道了",
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
          },
          fail: err => {
            console.error('[云函数] [getHotProducts] 调用失败', err)
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