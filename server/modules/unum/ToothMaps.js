const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class ToothMaps extends Model {
    model = [
        { name: 'id' },
        { name: 'patient_id' },
        { name: 'doctor_id' },
        { name: 'tooth_id' },
        { name: 'tooth_isexist' },
        { name: 'tooth_state' },
        { name: 'comments' },
        { name: 'data' },
        { name: 'info' }
    ];

    tableName = "unum_tooth_maps";
    restMany = "unum_tooth_maps.*";
    restOne = "unum_tooth_maps.*";
    restFrom = "FROM unum_tooth_maps";

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