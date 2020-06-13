const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class ClinicalRecords extends Model {
    model = [
        { name: 'id' },
        { name: 'patient_id' },
        { name: 'doctor_id' },
        { name: 'content' },
        { name: 'type_id' },
        { name: 'status_id' },
        { name: 'data' }
    ];

    tableName = "unum_clinical_records";

    restMany = "unum_clinical_records.*, unum_patients.name as patient, unum_doctors.name as doctor";
    restOne = "unum_clinical_records.*, unum_patients.name as patient, unum_doctors.name as doctor";
    restFrom = "FROM unum_clinical_records LEFT JOIN unum_patients ON unum_clinical_records.doctor_id = patient_id.id LEFT JOIN unum_doctors ON unum_clinical_records.doctor_id = unum_doctors.id";

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