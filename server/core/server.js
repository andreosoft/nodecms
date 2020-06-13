const dbModul = require('./db.js');
const route = require('./route.js')
const express = require('express');
// const wss = require('./wss.js');
const http = require('./http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const user = require('./user.js');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors')

async function initDb() {
    const result = await dbModul.init();
    if (result) {
        console.log("Connected db!");
    }
}

initDb();

const app = express();
const serverHttps = https.createServer(config.serverHttps.options, app);
app.use(helmet());
app.use(compression());
// app.use(function (req, res, next) {
//     console.log('1');
//     if (req.get('origin')) {
//         res.header("Access-Control-Allow-Origin", req.get('origin'));
//         res.header("Access-Control-Allow-Credentials", "true");
//         res.header("Access-Control-Max-Age", "86400");
//     }
//     if (req.method == 'OPTIONS') {
//         console.log(req.headers);
//         if (req.headers['access-control-request-method']) {
//             res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//         }
//         if (req.headers['access-control-request-headers']) {
//             res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
//         }
//         return res.end();
//     }
//     console.log('3'); next()
// });
app.use(express.static(config.paths.static, {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        } else if (hashRegExp.test(path)) {
            res.setHeader('Cache-Control', 'max-age=31536000');
        }
    },
}));
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(user.init);
app.use(user.roleAuth);
app.use(function (req, res, next) {
    // console.log(req.headers.host);
    res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Cache-Control', 'max-age=31536000');
    // console.log(req.headers);
    next()
})
app.set('views', config.paths.views);
app.set('view engine', 'ejs');

route.route(app)
// wss.route(server)
exports.start = function () {
    app.listen(config.serverHttp.port, '127.0.0.1', function () {
        console.log('Listening on port ', config.serverHttp.port);
    });
    serverHttps.listen(config.serverHttps.port, '127.0.0.1', function () {
        console.log('Listening on port ', config.serverHttps.port);
    });
}