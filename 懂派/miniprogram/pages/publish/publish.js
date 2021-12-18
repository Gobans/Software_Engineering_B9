// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    nickName: "点击登录",
    avatarUrl: "/images/user-unlogin.png",
    openid: "--",
    exp: "--",
    coin: "--",
    is_admin: false,
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: '',
    pickerHidden: true,
    chosen: '',
  },

  onLoad: function(e) {
    if(app.globalData.logged == undefined){
      console.log("没有logged属性")
      wx.showModal({
        title: '温馨提示',
        content: "没有登录了，需要登录。",
        confirmText: "我知道了",
        showCancel: false,
        success(res) {
          wx.redirectTo({
            url: '../mine/mine',
          })
        }
      })
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
      return
    }
  },

  gotoIndex:function(e){
    wx.navigateTo({
      url: '../index/index',    //需要改成index
    })
},  
  
  // 事件处理函数

  formSubmit(e) {

    wx.showLoading({
      title: '',
    });
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.cloud.callFunction({
      name: 'questionFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'createQuestion',
        user_id: this.data.openid,
        question_content: e.detail.value.content,
        question_title:  e.detail.value.title,
        pic_url: this.data.imgSrc,
        question_time: new Date().toLocaleString(),
        avatarUrl: this.data.avatarUrl,
        nickName: this.data.nickName
      }
    }).then((e) => {
      console.log(e);
      wx.hideLoading();
      wx.navigateTo({
        url: '../publish_result/publish_result?success=1',
    })
    }).catch((e)=>{
      console.log(e);
      wx.hideLoading();
      wx.navigateTo({
        url: '../publish_result/publish_result?success=0',
    });
  })},

  uploadImg() {
    wx.showLoading({
      title: '',
    });
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'my-photo.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res);
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    });
  },

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
})
