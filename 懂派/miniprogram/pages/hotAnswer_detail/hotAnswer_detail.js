const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    nickName: "未名",
    avatarUrl: "/images/user-unlogin.png",
    openid: "--",
    exp: "--",
    coin: "--",
    is_admin: false,
    question_id:"--",
    question_title : "",
    question_content : "",
    answer_id:"--",
    answer_nums:3,
    answers:[],
    question:[],
    },
    gotoQuestionDetail: function(e){
      let question_id = this.data.question_id
      let question_title = this.data.question_title
      let question_content = this.data.question_content
      wx.navigateTo({
        url: '../question_detail/question_detail?question_id='+ question_id + '&question_title=' + question_title + '&question_content=' + question_content
    })
    },


    like:function (e) {
      let ans_id = e.currentTarget.dataset.ans_id
      let like_cnt = e.currentTarget.dataset.like_cnt
      let answer_id = this.data.answer_id
      let question_id = this.data.question_id
      let question_title = this.data.question_title
      let question_content = this.data.question_content
      console.log(like_cnt)
      wx.cloud.callFunction({
        name: 'likeFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: "checkLike",
          ans_id: ans_id,
          user_id: this.data.openid
        }
      }).then((e) => {
        console.log(e);
        if(e.result.is_like){
          wx.cloud.callFunction({
            name: 'likeFunctions',
            config: {
              env: this.data.envId
            },
            data: {
              type: "deleteLike", 
              ans_id: ans_id,
              user_id: this.data.openid,
              like_cnt: like_cnt
            }
          }).then( 
            res =>{
            console.log(res)
            wx.redirectTo({
              url: 'hotAnswer_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
          })
        })
        }else{
          wx.cloud.callFunction({
            name: 'likeFunctions',
            config: {
              env: this.data.envId
            },
            data: {
              type: "createLike",
              ans_id: ans_id,
              user_id: this.data.openid,
              like_cnt: like_cnt
            }
          }).then( 
            res =>{
            console.log(res)
            wx.redirectTo({
              url: 'hotAnswer_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
          })
        })
        }
       
      })
    },

    change_answer:function(e) {
      if(e.currentTarget.dataset.ans_user_id != this.data.openid){
        wx.showModal({
          title: '',
          content: "只作者会修改",
          confirmText: "我知道了",
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            } else if (res.cancel) {
              console.log('用户点击取消')
              return
            }  
          }
        })
      }else{
      wx.showLoading({
        title: '',
      });
      let answer_id = this.data.answer_id
      let question_id = this.data.question_id
      let question_title = this.data.question_title
      let question_content = this.data.question_content
        console.log(ans_id)
        wx.redirectTo({
          url: '../answer_change/answer_change?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content + "&previous=hotAnswer_detail"
        })
    }},
    
    del_answer: function(e) {
      if(e.currentTarget.dataset.ans_user_id != this.data.openid){
        wx.showModal({
          title: '',
          content: "只作者会删除",
          confirmText: "我知道了",
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            } else if (res.cancel) {
              console.log('用户点击取消')
              return
            }
          }
        })
      }else{
      wx.showLoading({
        title: '',
      });
      wx.cloud.callFunction({
        name: 'answerFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: "deleteAnswer",
          answer_id: e.currentTarget.dataset._id
        }
      }).then((e) => {
        console.log(e);
        wx.hideLoading();
        let answer_id = this.data.answer_id
        let question_id = this.data.question_id
        let question_title = this.data.question_title
        let question_content = this.data.question_content
        wx.redirectTo({
          url: 'hotAnswer_detail?question_id=' + question_id + '&answer_id=' + answer_id + '&question_title=' + question_title + '&question_content=' + question_content
      })
      })
    }},
    //这个函数用于管理员删除回答 

    formSubmit(e) {
      wx.showLoading({
        title: '',
      });
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.cloud.callFunction({
        name: 'answerFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: "createAnswer",
          ans_user_id: this.data.openid,
          nickName:this.data.nickName,
          avatarUrl:this.data.avatarUrl,
          ans_content: e.detail.value.content,
          ans_time: new Date().toLocaleString(),
          question_id:this.data.question_id
        }
      }).then((e) => {
        console.log(e);
        wx.hideLoading();
        wx.redirectTo({url: 'question_detail'})
      })
  },
  getAnswers: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'answerFunctions',
      data: {
        type:"getHotAnswer",
        answer_id: that.data.answer_id
      },
      success: res => {
        if (res.result.errCode == 0) {
          that.setData({
            answers: res.result.data.answers
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

    //这个函数用于增加回答 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({
        question_id: options.question_id,
        question_title:options.question_title,
        question_content:options.question_content,
        answer_id : options.answer_id
      })

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
  
      if(app.globalData.logged == undefined){
        console.log("没有logged属性")
      }
      else if(app.globalData.logged){      
        this.setData({
          nickName: app.globalData.user.nickName,
          avatarUrl: app.globalData.user.avatarUrl,
          exp: app.globalData.user.exp,
          coin:app.globalData.user.coin,
          is_admin:app.globalData.user.is_admin,
          openid: app.globalData.user.openid
        })
        console.log(app.globalData)   //
        console.log(this.data.openid)   //
      }
      this.getAnswers()

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