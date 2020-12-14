var app = getApp()
Page({
  data: {
    taskList: [],
    staticData: {}
  },
  goput:function(){
    wx.redirectTo({
      url: '../put/put' 
})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function () {
    console.log('index Launch')
  },
  onLoad: function () {
    //设置静态数据
    this.setData({
      staticData: app.globalData.task
    })
    console.log('index Load')
  },
  onShow: function () {
    var that = this
    console.log('index Show')
    wx.getStorage({
      key: 'taskList',
      success: function(res){
        // success
        that.setData({
          taskList: res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function(){
    var that = this
    wx.getStorage({
      key: 'taskList',
      success: function(res){
        // success
        that.setData({
          taskList: res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.stopPullDownRefresh()
        console.log(that.data.taskList)
      }
    })
  },
  openCloseMenu: function (event) {
    var that = this
    var index = event.target.dataset.taskIndex
    wx.showActionSheet({
      itemList: ["完成任务", "删除任务"],
      success: function(res) {
        if (res.tapIndex == 0){
          var taskList = wx.getStorageSync('taskList')
          var finishedTask = wx.getStorageSync('finishedTask') || []
          finishedTask.unshift(taskList[index])
          taskList.splice(index,1)
          wx.setStorageSync('finishedTask', finishedTask)
          wx.setStorageSync('taskList', taskList)
          that.setData({
            taskList: taskList
          })
        } else if (res.tapIndex == 1){
          var taskList = wx.getStorageSync('taskList')
          taskList.splice(index,1)
          wx.setStorageSync('taskList', taskList)
          that.setData({
            taskList: taskList
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  }
})