// pages/play/play.js
var music

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    songMsg: {},
    status: true,
    songid: [],
    songIndex: 0
  },
  bindplay: function () {
    if (this.data.status == true) {
      music.pause()
      this.setData({
        status: false
      })
    } else {
      music.play()
      this.setData({
        status: true
      })
    }

  },
  bindnext: function () {
    var index = this.data.songIndex
    if (index + 1 == this.data.songid.length) {
      index = 0
    } else {
      index = index + 1
    }
    var id = this.data.songid[index]
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id=' + id + '&ids=[' + id + ']',
      success: (res) => {
        console.log(res)
        this.setData({
          songMsg: res.data.songs[0]
        })
        this.setData({
          id: id,
          songIndex: index
        })
        music.play()
      },
      fail: (error) => {
        console.log(error)
      }
    })



  },
  bindprev: function () {
    var index = this.data.songIndex
    if (index  == 0) {
      index = this.data.songid.length-1
    } else {
      index = index - 1
    }
    var id = this.data.songid[index]
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id=' + id + '&ids=[' + id + ']',
      success: (res) => {
        console.log(res)
        this.setData({
          songMsg: res.data.songs[0]
        })
        this.setData({
          id: id,
          songIndex: index
        })
        music.play()
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  bindsingle: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var idlist = JSON.parse(options.songid)
    var id = options.id * 1

    this.setData({
      id: options.id,
      songid: idlist,
      songIndex: idlist.indexOf(id)
    })
    console.log(this.data.songIndex)
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id=' + options.id + '&ids=[' + options.id + ']',
      success: (res) => {
        console.log(res)
        this.setData({
          songMsg: res.data.songs[0]
        })
      },
      fail: (error) => {
        console.log(error)
      }
    })
    music = wx.createAudioContext('music_play')
    music.play()
    music.play()
    // music.pause()
    // music.seek()

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