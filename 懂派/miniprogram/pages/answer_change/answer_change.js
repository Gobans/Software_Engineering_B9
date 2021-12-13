
// pages/answer_change/answer_change.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
=======
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    ans_id: "",
    answers: [],
  },

  getAnswers: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'answerFunctions',
      data: {
        type:"getChangeAnswer",
        ans_id: that.data.ans_id
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          that.setData({
            answers: res.result.data.answers
          })
          console.log(that.data.answers)
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
        console.error('[云函数] [get_myAnswers] 调用失败', err)
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

  formSubmit(e) {
    wx.showLoading({
      title: '',
    });
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(this.data.ans_id)
    wx.cloud.callFunction({
      name: 'answerFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: "updateAnswer",
        ans_id: this.data.ans_id,
        ans_content: e.detail.value.content,
        ans_time: new Date().toLocaleString(),
      }
    }).then((e) => {
      console.log(e);
      wx.hideLoading();
      wx.redirectTo({
        url: '../question_detail/question_detail',
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    })
},
  
  onLoad:function(option) {
    console.log(option.ans_id) 
    this.setData({
      ans_id : option.ans_id
    })
    this.getAnswers()
  }
})
