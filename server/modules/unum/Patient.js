const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');
const Doctor = require('./Doctor.js');

module.exports = class Patient extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'inn' },
        { name: 'doc_soc' },
        { name: 'doc_pass' },
        { name: 'phones' },
        { name: 'email' },
        { name: 'info' },
        { name: 'doctor_id'}
    ];

    tableName = "unum_patients";
    static viewName = "unum_patients.name"
    restMany = "unum_patients.*, " + Doctor.viewName + " as doctor";
    restOne = "unum_patients.*, " + Doctor.viewName + " as doctor";
    restFrom = "FROM unum_patients LEFT JOIN unum_doctors ON unum_patients.doctor_id = unum_doctors.id";

    constructor() {
        super();
    }

    load(data) {
        return super.load(data);
    }

    save(user_id = 0) {
        if (this.isNew) {
            this._fields.createdon = db.convertData((new Date()), true)
            this._fields.user_id = user_id;
        }
        return super.save()
    }
};