// pages/answer_change/answer_change.js
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    answer_id: "",
    answers: [],
    question_id: "",
    question_title: "",
    question_content:"",
    previous:""
  },

  getAnswers: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'answerFunctions',
      data: {
        type:"getChangeAnswer",
        ans_id: that.data.answer_id
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
    let answer_id = this.data.answer_id
    let question_id = this.data.question_id
    let question_title = this.data.question_title
    let question_content = this.data.question_content
    wx.showLoading({
      title: '',
    });
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(this.data.answer_id)
    wx.cloud.callFunction({
      name: 'answerFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: "updateAnswer",
        ans_id: this.data.answer_id,
        ans_content: e.detail.value.content,
        ans_time: new Date().toLocaleString(),
      }
    }).then((e) => {
      console.log(e);
      wx.hideLoading();
      if(this.data.previous == "hotAnswer_detail"){
      wx.redirectTo({
        url: '../hotAnswer_detail/hotAnswer_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
    })
  }else{
    wx.redirectTo({
      url: '../question_detail/question_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
  })
  }
    })
},
  
  onLoad:function(option) {
    console.log(option.ans_id) 
    this.setData({
      question_id: option.question_id,
      question_title:option.question_title,
      question_content:option.question_content,
      answer_id : option.answer_id,
      previous : option.previous
    })
    this.getAnswers()
  }
})
