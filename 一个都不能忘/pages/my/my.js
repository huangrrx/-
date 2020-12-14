var app = getApp()

Page({
  
  data: {
    logs: [],
    version: '0.0.1',
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menu: [{
      "name": "已完成任务数",
      "icon": "/img/finish.png",
      "page": "pages/finish/finish"
    }, {
      "name": "个人信息",
      "icon": "/img/info.png",
      "page": "pages/info/info"
    }],
    help: [ {
      "name": "客服",
      "icon": "/img/feedback.png",
      "page": "pages/feedback/feedback"
    }]
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(options) {
      
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clear: function () {
    this.setData({
      hasUserInfo: false,
      userInfo: null
    })
  }
})