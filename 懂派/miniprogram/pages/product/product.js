// pages/product/product.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product_id: "",
        name: "",
        pic_url: "",
        time: '',
        price: '',
        duration: '',
        memory:'',
        storage:'',
        score: '',
        rateCnt: '',
        commentsCnt: 123,
        product_comments: [{
            id: 1,
            content: '很好'
        }]
    },



    gotoEvaluate: function (e) {
        wx.navigateTo({
            url: '../evaluate/evaluate?product_id=' + this.data.product_id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      console.log('product_id')
      console.log(options.product_id)
      this.setData({
          product_id : options.product_id
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
      var that = this
        wx.cloud.callFunction({
          name: 'get_product_info',
          data: {
            product_id: parseInt(that.data.product_id),
          },
          success: res => {
            if (res.result.errCode == 0) {
              this.setData({
                  name: res.result.data.product.product_name,
                  pic_url: res.result.data.product.pic_url,
                  time: res.result.data.product.date,
                  price: res.result.data.product.price,
                  duration: res.result.data.product.duration,
                  memory:res.result.data.product.memory,
                  storage:res.result.data.product.storage,
                  score: res.result.data.product.product_score.toFixed(2),
                  rateCnt: res.result.data.product.evaluation_cnt,
                  product_comments: res.result.data.comments
              })
              console.log(this.data)
            } 
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