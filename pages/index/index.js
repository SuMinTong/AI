//index.js
//获取应用实例
var app = getApp();
var MD5 = require('../../utils/MD5.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      wx.setStorageSync("userInfo", userInfo)
    })
    // 获得10位的随机字符串
    console.log(app.randomChar(10))
    that.sign();

  },

  sign: function () {
    
    var userInfo = wx.getStorageSync("userInfo");
    var appid = 1106568241,
      nonce_str = app.randomChar(10),
      text = "腾讯AI开放平台",
      time_stamp = app.time_stamp(),
      app_key = "zKBbnJSCJDG9JELN";
    var str = 'app_id='+appid+'&nonce_str='+nonce_str+'&text='+text+'&time_stamp='+time_stamp+'&app_key='+app_key;
    var sign = MD5.md5(str);
    var SIGN = sign.toLocaleUpperCase();
    console.log(sign.toLocaleUpperCase())
    var data = {
      app_id: appid,
      time_stamp: time_stamp,
      nonce_str: nonce_str,
      sign: SIGN,
      model: 1,
      image: "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"
    }
    console.log(data)
    wx.request({
      url: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
      data: data,
      header: {},
      method: 'GET',
      dataType: '',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { console.log(res); },
    })
  }
})
