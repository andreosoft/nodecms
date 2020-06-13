const ClinicalRecords = require('./ClinicalRecords.js')
const Doctor = require('./Doctor.js')
const Patient = require('./Patient.js')
const DicKab = require('./DicKab.js')
const DicSp = require('./DicSp.js')
const ToothMaps = require('./ToothMaps.js');
const Schedule = require('./Schedule.js');
const rest = require(config.paths.core + '/rest.js');

exports.route = function (app) {

    rest(app, ToothMaps, '/unum/tooth_map', get = app.get('/unum/tooth_map', async (req, res, next) => {
        req.can(100, req, res);
        const model = new ToothMaps();
        const tableName = model.tableName;
        if (req.query.patient_id) {
            const id = req.query.patient_id;
            q = "SELECT " + model.restOne + " " + model.restFrom + " WHERE " + tableName + ".patient_id = ?  ORDER BY tooth_id";
            let data = (await db.q(q, id));
            return res.json({ status: 'ok', data: data });
        }
    }));

    rest(app, Doctor, '/unum/doctor', filters = function (filters) {
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
                        fKeys.push("status_id = ?");
                        fVal.push(filters[key]);
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
    });

    rest(app, Patient, '/unum/patient', filters = function (filters) {
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
                        fKeys.push("status_id = ?");
                        fVal.push(filters[key]);
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
    });

    rest(app, ClinicalRecords, '/unum/record', filters = function (filters) {
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
                        fKeys.push("status_id = ?");
                        fVal.push(filters[key]);
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
    });

    rest(app, DicKab, '/unum/dic_kab');

    rest(app, DicSp, '/unum/dic_sp');

    rest(app, Schedule, '/unum/schedule', filters = function (filters) {
        let fKeys = [];
        let fVal = [];
        for (const key in filters) {
            if (filters[key] != '') {
                switch (key) {
                    case 'kabinet_id':
                        fKeys.push("kabinet_id = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'type_id':
                        fKeys.push("type_id = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'patient_id':
                        fKeys.push("patient_id = ?");
                        fVal.push(filters[key]);
                        break;
                    default:
                        break;
                }
            }
        }
        return [fKeys, fVal];
    });
}