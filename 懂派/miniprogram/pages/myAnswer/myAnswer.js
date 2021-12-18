// pages/answer/answer.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   /*answers:[{question_title:"记笔记用什么平板好?",answer_content:"不用平板好!",like_cnt:3,is_accept:"有"},
   {question_title:"记笔记用什么平板好?",answer_content:"不用平板好!",like_cnt:3,is_accept:"0"}]*/
   answers:[],
   user_id:""

  },

  getDetail:function(e){
    let answer_id = e.currentTarget.dataset.answer_id
    let question_id = e.currentTarget.dataset.question_id
    let question_title = e.currentTarget.dataset.question_title
    let question_content = e.currentTarget.dataset.question_content
    wx.navigateTo({
      url: '../hotAnswer_detail/hotAnswer_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
  })
  },

  
  deleteAnswer:function(e){
    var that = this
    console.log(e)
    var id = e.target.dataset.id
    console.log("answer_id:" + id)

    wx.showModal({
      title: '提示',
      content: '您确认要删除该回答吗',
      confirmText: "确定",
      showCancel: "取消",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //调用云函数进行删除
          wx.cloud.callFunction({
            name: 'deleteAnswer',
            data: {
              ans_id: id
            },
            success: res => {
              console.log(res);
              if (res.result.errCode == 0) {
                wx.showModal({
                  title: '恭喜',
                  content: '删除成功',
                  confirmText: "我知道了",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.getMyAnswers()
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
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
              console.error('[云函数] [deleteAnswer] 调用失败', err)
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getMyAnswers: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'get_myAnswers',
      data: {
        user_id: that.data.user_id
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          that.setData({
            answers: res.result.data.answers
          })
          console.log(res.result.data.answers)
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!wx.cloud) {
      wx.showModal({
        title: '初始化失败',
        content: '请使用 2.2.3 或以上的基础库以使用云能力',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
  
    // 设定user_id
    if(app.globalData.logged == undefined){
      console.log("没有logged属性")
    }
    else if(app.globalData.logged){      
      this.setData({
        user_id:app.globalData.user.openid
      })
    }

    //接下来是云函数获取用户提问的信息
    this.getMyAnswers()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '懂派',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
})