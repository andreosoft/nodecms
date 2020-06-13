const User = require('./User.js')
const Profile = require('./Profile.js')
const fs = require("fs")
const multer = require('multer');
const rest = require(config.paths.core + '/rest.js');
const upload = multer({ dest: config.paths.uploads.avatars })

exports.route = function (app) {

    const filters = function (filters) {
        let fKeys = [];
        let fVal = [];
        for (const key in filters) {
            if (filters[key] != '') {
                switch (key) {
                    case 'id':
                        fKeys.push("id = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'status':
                        fKeys.push("status = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'role':
                        fKeys.push("role = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'login':
                        fKeys.push("login LIKE ?");
                        fVal.push("%" + filters[key] + "%");
                        break;
                    case 'name':
                        fKeys.push("name LIKE ?");
                        fVal.push("%" + filters[key] + "%");
                        break;

                    default:
                        break;
                }
            }
        }
        return [fKeys, fVal];
    }

    rest(app, User, '/users/index', filters);

    app.get('/users/avatar/download/:name', upload.single("file"), (req, res, next) => {
        let file = config.paths.uploads.avatars + '/' + req.params.name;
        fs.exists(file, (exist) => {
            res.setHeader('Content-Type', 'image/png');
            if (exist) {
                return res.sendFile(file);
            } else {
                file = config.paths.uploads.avatars + '/' + 'blank.png';
                return res.sendFile(file);
            }
        })
    });

    app.post('/users/avatar/upload', upload.single("file"), async (req, res, next) => {
        if (await req.can(1, req, res)) {
            return res.json({ status: 'ok', data: { file: req.file.filename, name: req.file.originalname } });
        }
    })

    app.get('/signup/login_exists', async (req, res, next) => {
        if (await req.can(0, req, res)) {
            let model = new User();
            if (await model.isUserExist(req.query.login)) {
                return res.json({ result: true });
            } else {
                return res.json({ result: false });
            }
        }
    });

    app.post('/signup/set_profile', async (req, res, next) => {
        if ((await req.can(1, req, res)) && (await req.only(req.body.id, req, res))) {
            let model = new Profile();
            if (model.load(req.body) && await model.save()) {
                return res.json({ status: 'ok' });
            }
            return res.json({ status: 'error' });
        }
    });

    app.get('/signup/get_profile', async (req, res, next) => {
        const model = new User();        
        const profile = await model.getProfile(req.user.id);
        return res.json({ status: 'ok', profile: profile});
    });

    app.post('/signup/get_token', (req, res, next) => {
        if (req.can(0, req, res)) {
            login(req, res, next)
        }
    });

    app.post('/signup/registration', async (req, res, next) => {
        req.can(0, req, res);
        const model = new User();
        console.log(req.body);
        req.body.login = req.body.email;
        req.body.role = 1;
        req.body.status = 10;
        req.body.name = req.body.name + " " + req.body.surname;
        if (req.body.login && !await model.isUserExist(req.body.login) && model.load(req.body) && await model.save()) {
            return res.json({ status: 'ok' });
        }
        return res.json({ status: 'error' });
    });

    let login = async function (req, res, next) {
        const model = new User();
        let userData = await model.getToken(req.body);
        if (userData) {
            let data = { status: 'ok', token: userData.token, profile: userData.profile };
            return res.json(data);
        }
        return res.status(200).json({ status: 'error', error: 'login error' })
    }
}