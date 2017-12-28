//app.js
// text	腾讯AI开放平台	接口请求数据，UTF-8编码
// app_id	1106568241	应用标识
// time_stamp	1493449657	请求时间戳（秒级），用于防止请求重放（保证签名5分钟有效）
// nonce_str	20e3408a79	请求随机字符串，用于保证签名不可预测
// sign
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    text:"腾讯AI开放平台",
    app_id:"1106568241",

  },
  time_stamp:function(){
    return Math.floor(new Date().getTime()/1000);
  },
  randomChar:function(l) {
    var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    var tmp = "";
    // var timestamp = new Date().getTime();
    for (var i = 0; i < l; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
  }
})
