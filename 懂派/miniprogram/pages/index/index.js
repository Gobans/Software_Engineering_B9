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

    gotoAnswerSpecific: function(e){
        wx.navigateTo({
            //url: '../question_detail/question_detail',
            url: '../answer_specific/answer_specific',
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
          data: {},
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