const mysql = require('mysql');
// const sqlite3 = require('sqlite3').verbose();

let db

let init = function () {
    // dbSqlite = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     // createDb()
    //     console.log('Connected to the db database.');
    // });
    // global.db = dbSqlite
}

function createDb() {
    let q = `
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS pdd;
      DROP TABLE IF EXISTS groups;

      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        login TEXT NOT NULL UNIQUE,
        hash TEXT,
        token TEXT,
        status INTEGER
      );

      CREATE TABLE pdd (
        id INTEGER PRIMARY KEY,
        name TEXT,
        num_bilet INTEGER,
        num_q INTEGER,
        gr INTEGER,
        lang TEXT,
        status INTEGER,
        ques TEXT,
        answers TEXT,
        images TEXT,
        help TEXT,
        info TEXT
      );    

      CREATE TABLE groups (
        id INTEGER PRIMARY KEY,  
        name TEXT,
        lang INTEGER,
        status INTEGER
      );`
      db.exec(q);
    console.log('Create database.');
}

// let init = function () {
//     db = mysql.createConnection(config.db);

//     db.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
// }

exports.init = init
exports.db = db
