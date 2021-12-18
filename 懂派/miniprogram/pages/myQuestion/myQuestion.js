// pages/question/question.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   /*questions:[{title:"记笔记用什么平板好",content:"不用平板好",ansNum:3},
   {title:"记笔记用什么平板好",content:"不用平板好",ansNum:3,is_accept:false},
   {title:"记笔记用什么平板好",content:"不用平板好",ansNum:3,is_accept:true}],*/
   questions:[],
   user_id:""
  },

  getDetail:function(e){
    let question_id = e.currentTarget.dataset.question_id
    let question_title = e.currentTarget.dataset.question_title
    let question_content = e.currentTarget.dataset.question_content
    wx.navigateTo({
      url: '../question_detail/question_detail?question_id='+ question_id + '&question_title=' + question_title + '&question_content=' + question_content
  })
  },

  
  deleteQuestion:function(){
    wx.navigateTo({
      url: '../index/index',
    })
    console.log("以后这里是删除问题操作")
  },


  getMyQuestions: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'get_myQuestions',
      data: {
        user_id: that.data.user_id
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          that.setData({
            questions: res.result.data.questions
          })
          console.log(res.result.data.questions)
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
        console.error('[云函数] [get_myQuestions] 调用失败', err)
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
    this.getMyQuestions()

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
    console.log(this.data)
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