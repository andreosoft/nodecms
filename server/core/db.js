const mysql = require('mysql');
const fs = require('fs');

let db



const init = function () {
  return new Promise(resolve => {
    connect = () => {
      db = mysql.createConnection(
        {
          multipleStatements: true,
          host: config.db.host,
          user: config.db.user,
          password: config.db.password,
          database: config.db.database,
          dateStrings: true
        });

      db.q = (q, args) => {
        return new Promise(resolve => {
          db.query(q, args, (err, result, fields) => {
            if (err) throw err;
            return resolve(result);
          });
        });
      }

      db.convertData = function (date, isTime = false) {
        let time = "";
        if (isTime) {
          time = " " + ("0" + date.getHours()).slice(-2) + ":" +
            ("0" + date.getMinutes()).slice(-2) + ":" +
            ("0" + date.getSeconds()).slice(-2);
        }
        return date.getFullYear() +
          "-" +
          ("0" + parseInt(date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) + time;

      }

      db.connect(function (err) {
        if (err) setTimeout(connect, 10000);  
        global.db = db;
        resolve(true)
      });

      db.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
          connect();
        } else {
          throw err;
        }
      });
    }
    connect();
  });
}


exports.init = init;
exports.db = db;
