// pages/play/play.js
var music

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    nowtime: '00:00',
    alltime: '04:35',
    value: 0,
    max: 100,
    songMsg: {},
    status: true,
    songid: [],
    songIndex: 0,
    loopstatus: true,
    lyric: [],
    wordIndex: 0
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
        var duration = res.data.songs[0].duration
        duration = Math.floor(duration / 1000)
        var mm = Math.floor(duration / 60)
        var ss = duration % 60
        mm = mm >= 10 ? mm : '0' + mm
        ss = ss >= 10 ? ss : '0' + ss
        var ms = mm + ':' + ss
        this.setData({
          songMsg: res.data.songs[0]
        })
        this.setData({
          id: id,
          songIndex: index,
          status: true,
          max: duration,
          alltime: ms
        })
        music.play()
        this.bindlyric()
      },
      fail: (error) => {
        console.log(error)
      }
    })

  },
  bindprev: function () {
    var index = this.data.songIndex
    if (index == 0) {
      index = this.data.songid.length - 1
    } else {
      index = index - 1
    }
    var id = this.data.songid[index]
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id=' + id + '&ids=[' + id + ']',
      success: (res) => {
        console.log(res)
        var duration = res.data.songs[0].duration
        duration = Math.floor(duration / 1000)
        var mm = Math.floor(duration / 60)
        var ss = duration % 60
        mm = mm >= 10 ? mm : '0' + mm
        ss = ss >= 10 ? ss : '0' + ss
        var ms = mm + ':' + ss
        this.setData({
          songMsg: res.data.songs[0]
        })
        this.setData({
          id: id,
          songIndex: index,
          status: true,
          max: duration,
          alltime: ms
        })
        music.play()
        this.bindlyric()
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  bindsingle: function () {
    if (this.data.loopstatus) {
      this.setData({
        loopstatus: ''
      })
    } else {
      this.setData({
        loopstatus: true
      })
    }
  },
  bindended: function () {
    if (this.data.loopstatus) {
      music.play()
    } else {
      this.bindnext()
    }
  },
  bindtimeupdate: function (e) {

    // console.log(e.detail)
    var time1 = e.detail.currentTime
    var arr = this.data.lyric
    for (var i = 0; i < arr.length; i++) {
      if (time1 >= arr[i][0] && time1 < arr[i + 1][0])
        this.setData({
          wordIndex: i
        })
    }
    var time = Math.floor(e.detail.currentTime)
    var mm = Math.floor(time / 60)
    var ss = time % 60
    mm = mm >= 10 ? mm : '0' + mm
    ss = ss >= 10 ? ss : '0' + ss
    var ms = mm + ':' + ss

    this.setData({
      nowtime: ms,
      value: time
    })

  },
  bindchange: function (e) {
    console.log(e.detail.value)
    var time = e.detail.value
    var mm = Math.floor(time / 60)
    var ss = time % 60
    mm = mm >= 10 ? mm : '0' + mm
    ss = ss >= 10 ? ss : '0' + ss
    var ms = mm + ':' + ss
    this.setData({
      status: true,
      value: time
    })
    music.seek(time)
    music.play()

  },
  bindlyric: function () {
    var id = this.data.id
    wx.request({
      url: 'https://music.163.com/api/song/lyric?os=pc&id=' + id + '&lv=-1&kv=-1&tv=-1',
      success: (res) => {
        console.log(res)
        var str = res.data.lrc.lyric
        var arr = str.split('\n')
        console.log(arr)
        if (arr[arr.length - 1] == '') {
          arr.pop() //最后空内容出栈（去除最后的空字符）
        } else {

        }
        var pattern = /\[\d{2}:\d{2}\.\d{1,3}\]/ //正则表达式
        var arr1 = []
        arr.forEach((item, index, arr) => { //(内容，下标，遍历数组)
          var time = item.match(pattern)
          var word = item.replace(pattern, "")
          if (time != null) {
            var timestr = time[0].slice(1, -1)
            var tarr = timestr.split(":")
            var ltime = tarr[0] * 60 + tarr[1] * 1
            arr1.push([ltime, word])
          }

        })

        var arr2 = []
        for (var i = 0; i < arr1.length; i++) {
          if (arr1[i][1] !== '') {
            arr2.push(arr1[i])
          }
        }
        this.setData({
          lyric: arr2
        })
        console.log(this.data.lyric)
      }
    })

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
        var duration = res.data.songs[0].duration
        duration = Math.floor(duration / 1000)
        var mm = Math.floor(duration / 60)
        var ss = duration % 60
        mm = mm >= 10 ? mm : '0' + mm
        ss = ss >= 10 ? ss : '0' + ss
        var ms = mm + ':' + ss
        this.setData({
          songMsg: res.data.songs[0],
          max: duration,
          alltime: ms
        })
      },
      fail: (error) => {
        console.log(error)
      }
    })
    music = wx.createAudioContext('music_play')
    music.play()
    this.bindlyric()

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