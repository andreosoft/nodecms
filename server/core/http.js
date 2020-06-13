const http = require('http');

Object.defineProperty(http.IncomingMessage.prototype, 'userAgent', {
  get: function () {
    return this.headers['user-agent'];
  }
})

Object.defineProperty(http.IncomingMessage.prototype, 'authorization', {
  get: function () {
    if (this.headers['authorization'] && this.headers['authorization'].length > 31) {
      return this.headers['authorization'];
    }
  }
})

Object.defineProperty(http.IncomingMessage.prototype, 'cookies', {
  get: function () {
    let obj = {};
    if (this.headers['cookie']) {
      let str = this.headers['cookie'].split('; ');
      let l = str.length;
      for (let i = 0; i < l; i++) {
        var tmp = str[i].split('=');
        obj[tmp[0]] = tmp[1];
      }
    }
    return obj
  }
})

exports.http = http