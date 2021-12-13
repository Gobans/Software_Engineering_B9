// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_products: [],
    param: {},
    questions: [{
        question: "记笔记用什么平板好",
        content: "不用平板好",
        _id: "fa24ce1a6199f5ea07f577912a9a2859",
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
      url: '../search_result/search_result', //需要改成index
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

  gotoAnswerSpecific: function (e) {
    wx.navigateTo({
      //url: '../question_detail/question_detail',
      url: '../answer_specific/answer_specific',
    })
  },

  gotoQuestionDetail: function (e) {
    let question_id = e.currentTarget.dataset.question_id
    wx.navigateTo({
      url: '../question_detail/question_detail?question_id=' + question_id,
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

  gotoMoreProduct: function (e) {
    console.log(this.data.param)
    wx.navigateTo({
      url: '../search_more_product/search_more_product?dat=' + JSON.stringify(this.data.param),
    })
  },

  gotoAnswerSpecific: function (e) {
    wx.navigateTo({
      //url: '../question_detail/question_detail',
      url: '../answer_specific/answer_specific',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    console.log(JSON.parse(options.dat))
    var dat = JSON.parse(options.dat)
    let param = that.data.param
    param = dat
    that.setData({
      param
    })
    console.log(that.data.param)
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
        MAX_LIMIT: 4,
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

    // 调用云函数获得相关问题
    wx.cloud.callFunction({
      name: 'searchQuestion',
      data: {
        search_word:that.data.param.search_word
      },
      success: res => {
        console.log(res.result);
        that.setData({
          questions: res.result.data.relate_question
        })
        console.log(res.result.data.relate_question)
      },
      fail: err => {
        console.error('[云函数] [getHotAnswers] 调用失败', err)
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
    var that = this


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