var app = getApp()
Page({
  data: {
    userInfo: {},
    finishedTask: [],
    count: 0,
    modalHidden: true,
  },
  onShow: function () {
    console.log('App Show')
    var finishedTask = wx.getStorageSync('finishedTask') || []
    this.setData({
      finishedTask: finishedTask,
      count: finishedTask.length
    })
  },
  switchModal: function() {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  getLogs: function() {
    var finishedTask = wx.getStorageSync('finishedTask') || []
    this.setData({
      finishedTask: finishedTask,
      count: finishedTask.length
    })
  },
  clearLog: function(e) {
    wx.setStorageSync('finishedTask',[])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  },
  
  onLoad: function () {
    console.log('App Load')
  },
  
})
