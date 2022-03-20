// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    songid: [],
    num: 10,
    name: '',
    list: [],
    songMsg:{},
    imgUrls: [
      'http://p1.music.126.net/emrGqHYHrptFx3yZX0ZIDw==/109951166920191403.jpg',
      'http://p1.music.126.net/Xbld5gXLLntSWToS0_Umbw==/109951166920070026.jpg',
      'http://p1.music.126.net/_HMuGhmnrezB8trf21q2zA==/109951166920118436.jpg',
      'http://p1.music.126.net/oFrhu62PEAvek3CSAF9bew==/109951166920156551.jpg',
      'http://p1.music.126.net/4RG3mB3u4EmljJKnfLYsvQ==/109951166920099584.jpg',
      'http://p1.music.126.net/FClhhEj-i2599l8lMs1aVA==/109951166919712057.jpg',
      'http://p1.music.126.net/q7dJHhAgUJAGZ7vUmfwbrw==/109951166920019982.jpg'
    ],
  },
  bindsearch: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindlower: function () {
    var name = this.data.name
    var num = this.data.num
    num = num + 10
    wx.showToast({
      title: '歌单已刷新！',
      icon: 'loading',
      duration: 500
    })

    wx.request({
      url: 'https://music.163.com/api/search/get?s=' + name + '&type=1&limit=' + num,
      success: (res) => {
        console.log(res)
        var songs = res.data.result.songs
        var arr = []
        for (var i = 0; i < songs.length; i++) {
          arr.push(songs[i].id)
        }
        console.log(arr)
        setTimeout(() => {
          this.setData({
            songid: arr
          })
          this.setData({
            list: res.data.result.songs,
            num: num
          })

        }, 200)
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          duration: 500
        })
      },
      fail: (error) => {
        console.log(error)
      }
    })

  },
  refresh: function () {
    this.setData({
      triggered: true,
      num: 10,
      list: [],
    })
    wx.showToast({
      title: '请求中',
      icon: 'loading',
      duration: 500
    })
    var name = this.data.name
    wx.request({
      url: 'https://music.163.com/api/search/get?s=' + name + '&type=1&limit=10',
      success: (res) => {
        console.log(res)
        var songs = res.data.result.songs
        var arr = []
        for (var i = 0; i < songs.length; i++) {
          arr.push(songs[i].id)
        }
        console.log(arr)
        setTimeout(() => {
          this.setData({
            list: res.data.result.songs,
            triggered: false
          })
          this.setData({
            songid: arr
          })
          wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 500
          })
        }, 200)

      }
    })

  },
  bindtap: function () {
    var name = this.data.name
    wx.showToast({
      title: '搜索完成',
      icon: 'success',
      duration: 500
    })
    wx.request({
      url: 'https://music.163.com/api/search/get?s=' + name + '&type=1&limit=10',
      success: (res) => {
        console.log(res)
        var songs = res.data.result.songs
        var arr = []
        for (var i = 0; i < songs.length; i++) {
          arr.push(songs[i].id)
        }
        console.log(arr)
        setTimeout(() => {
          this.setData({
            songid: arr
          })
          this.setData({
            list: res.data.result.songs
          })

        }, 200)

      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  toplay: function (e) {
    var id = e.currentTarget.dataset.id
    var list=this.data.songid
    
    list=JSON.stringify(list)
    console.log(id)
    wx.navigateTo({
      url: '../play/play?id=' + id +'&songid='+list,
    })
  },
  /*navigateTo() 跳转至非tabBar页面，跳转后保留之前页面
  wx.reLaunch()  跳转所有界面，关闭所有开启的页面
  wx.redirectTo() 跳转至非tabBar页面，跳转后关闭之前页面
  wx.navigateBack() 返回之前的操作界面
  wx.switchTab() 跳转至tabBar页面，跳转后关闭之前页面
  */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})