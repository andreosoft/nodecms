const fs = require("fs")
const md5 = require('md5');
const multer = require('multer');
const sharp = require('sharp');
const Upload = require('./Upload.js')

let upload = multer({ dest: config.paths.uploads.images }).single("file");

exports.route = function (app) {

    app.get('/file/download/:name', (req, res, next) => {
        const origName = req.params.name;
        const options = req.query;
        if (req.query.width) { options.width = parseInt(req.query.width) }
        if (req.query.height) { options.height = parseInt(req.query.height) }
        const cacheName = md5(origName + JSON.stringify(options));
        let cacheFile = config.paths.uploads.cache + '/' + cacheName;
        fs.exists(cacheFile, (exist) => {
            res.setHeader('Content-Type', 'image/png');
            if (exist) {
                return res.sendFile(cacheFile);
            } else {
                let origFile = config.paths.uploads.images + '/' + origName;
                fs.exists(origFile, (exist) => {
                    if (!exist) { origFile = config.paths.uploads.images + '/' + 'blank.jpg'; }
                    sharp(origFile)
                        .resize(options)
                        .toFile(cacheFile, (err, info) => {
                            return res.sendFile(cacheFile);
                        });
                })
            }
        })
    })

    app.post('/file/upload', upload, async (req, res, next) => {
        req.can(1, req, res);
        const model = new Upload();
        const d = {
            name: req.file.originalname,
            file: req.file.filename,
            status: 1
        };
        if (model.load(d) && (id = (await model.save(req.user.id)))) {
            return res.json({ status: 'ok', data: { id: id, file: req.file.filename, name: req.file.originalname } });
        }
        return res.json({ status: 'error' });
    })
}