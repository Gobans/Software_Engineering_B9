// pages/evaluation/evaluation.js
Page({
    data: {
      product_id:'',
      flag: 0,
      noteMaxLen: 300, // 最多放多少字
      info: "",
      noteNowLen: 0,//备注当前字数
    },
    // 监听字数
    bindTextAreaChange: function (e) {
      var that = this
      var value = e.detail.value,
        len = parseInt(value.length);
      if (len > that.data.noteMaxLen)
        return;
      that.setData({ info: value, noteNowLen: len })
  
    },
    // 提交清空当前值,还要解决怎样把flag的信息存入产品表
    bindSubmit: function () {
      var that = this;
      console.log(that.data)
    //获得产品的搜索结果
    wx.cloud.callFunction({
      name: 'rate_product',
      data: {
        product_id:that.data.product_id,
        comment: that.data.info,
        score: parseInt(that.data.flag) 
      },
      success: res => {
        console.log(res);
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


      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        mask: false,
       // success: function () {
      //    that.setData({ info: '', noteNowLen: 0, flag: 0 })
      //  }
      })
  
    },
    changeColor1: function () {
      var that = this;
      that.setData({
        flag: 1
      });
      console.log(this.data.flag)
    },
    changeColor2: function () {
      var that = this;
      that.setData({
        flag: 2
      });
    },
    changeColor3: function () {
      var that = this;
      that.setData({
        flag: 3
      });
    },
    changeColor4: function () {
      var that = this;
      that.setData({
        flag: 4
      });
    },
    changeColor5: function () {
      var that = this;
      that.setData({
        flag: 5
      });
    },
  
    onLoad: function (options) {
      var that = this
      console.log(options)
      that.setData({
        product_id:options.product_id
      })
    },
  })
  