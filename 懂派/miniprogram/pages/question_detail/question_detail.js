// pages/question_detail/question_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
     question_content:"记笔记用什么平板好",
     answer_nums:3,
     answer_contents:[{avatarUrl:"/images/user-unlogin.png", nickName:"user1", answer_content:"用ipad好",
        like_cnt:3, is_accept:1, is_admin:0},{avatarUrl:"/images/user-unlogin.png", nickName:"user2", answer_content:"不用平板好",like_cnt:5, is_accept:1, is_admin:1},{avatarUrl:"/images/user-unlogin.png", nickName:"user3", answer_content:"同问",like_cnt:1, is_accept:0, is_admin:1}]
    },
  
    
    del_answer: function() {
        wx.navigateTo({url: '../index/index'})
    },
    //这个函数用于管理员删除回答 
  
    add_answer: function() {
        wx.navigateTo({url: '../publish_answer/index'})
    },
    //这个函数用于增加回答 
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
  
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserProfile({
              desc:"完善用户资料",
              success: res => {
                this.setData({
                  nickName: res.userInfo.nickName,
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
                app.globalData.userInfo = res.userInfo
                this.onGetOpenid()
              }
            })
          }
        }
      })
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