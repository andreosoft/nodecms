const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class Schedule extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'kabinet_id'},
        { name: 'doctor_id'},
        { name: 'patient_id' },
        { name: 'date_start'},
        { name: 'date_end'},
        { name: 'is_full_day'},
        { name: 'status_id' },
        { name: 'type_id' },
        { name: 'color' },
        { name: 'data'},
        { name: 'info'},
        { name: 'patient_type_id' },
        { name: 'patient_status_id' }
    ];

    tableName = "unum_schedule";

    restMany = "unum_schedule.*, unum_patients.name as patient, unum_doctors.name as doctor, unum_dic_kab.name as kabinet";
    restOne = "unum_schedule.*, unum_patients.name as patient, unum_doctors.name as doctor, unum_dic_kab.name as kabinet";
    restFrom = "FROM unum_schedule LEFT JOIN unum_dic_kab ON unum_schedule.kabinet_id = unum_dic_kab.id LEFT JOIN unum_patients ON unum_schedule.patient_id = unum_patients.id LEFT JOIN unum_doctors ON unum_schedule.doctor_id = unum_doctors.id";

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