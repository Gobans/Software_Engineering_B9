// pages/index/index.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "点击登录",
    avatarUrl: "/images/user-unlogin.png",
    userInfo: {},
    user: {},
    exp: "--",
    coin: "--",
    is_admin: false
  },

  question: function() {
    if (!app.globalData.logged) {
      wx.showModal({
        title: '提示',
        content: '请先登录哦~',
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
    } else {
      wx.navigateTo({
        url: '../myQuestion/myQuestion',
      })
    }
  },

  answer: function() {
    if (!app.globalData.logged) {
      wx.showModal({
        title: '提示',
        content: '请先登录哦~',
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
    } else {
      wx.navigateTo({
        url: '../myAnswer/myAnswer',
      })
    }
  },

  management: function() {
    if (!app.globalData.logged) {
      wx.showModal({
        title: '提示',
        content: '请先登录哦~',
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
    } else {
      wx.navigateTo({
        url: '../management/management',
      })
    }
  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
        console.log(res.userInfo)
        //app.globalData.userInfo = res.userInfo    //保存openid
        this.onGetOpenid()
        //console.log("检查app：",app.globalData)    //这行是检验
      }
    })
  },


  
  onGetOpenid: function() {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'wechat_sign',
      data: {
        avatarUrl: that.data.avatarUrl,
        gender: that.data.userInfo.gender,
        nickName: that.data.nickName
      },
      success: res => {
        console.log(res);
        if (res.result.errCode == 0) {
          that.setData({
            is_admin: res.result.data.user.is_admin,
            exp: Math.floor(res.result.data.user.exp/100)+1,
            coin: res.result.data.user.coin
          })
          app.globalData.logged = true
          that.data.user = res.result.data.user
          app.globalData.user = res.result.data.user
          //console.log(app.globalData.user) 
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
        console.error('[云函数] [wechat_sign] 调用失败', err)
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

  gotoIndex:function(e){
    wx.navigateTo({
      url: '../index/index',    //需要改成index
    })
},  

gotoPublish:function(e){
    wx.navigateTo({
        url: '../publish/publish',    
      })
},

gotoMine:function(e){
    wx.navigateTo({
        url: '../mine/mine',    
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
              console.log("自动更新了用户信息")   //
            }
          })
        }
      }
    })


    //检验如果已经有登录信息则显示
    if(app.globalData.logged == undefined){
      console.log("没有logged属性")
    }
    else if(app.globalData.logged){      
      this.setData({
        nickName: app.globalData.user.nickName,
        avatarUrl: app.globalData.user.avatarUrl,
        exp: app.globalData.user.exp,
        coin:app.globalData.user.coin,
        is_admin:app.globalData.user.is_admin
      })
      console.log(app.globalData)   //
      return
    }
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