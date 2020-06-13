
'use strict';
const config1 = require('./config/config.js');
const db1 = require('./core/db.js');
const fs = require('fs');

function createDb() {
    fs.readFile(config.paths.config + '/tabels.sql', 'utf8', function (err, q) {
        if (err) throw err;
        db.query(q, function (err, result) {
            if (err) throw err;
            console.log("Tables created");
            process.exit();
        })
    });
    ;
}

async function initDb() {
    const result = await db1.init();
    if (result) {
        createDb();
    }
}

initDb();