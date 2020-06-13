const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class Doctor extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'birthday' },
        { name: 'inn' },
        { name: 'doc_soc' },
        { name: 'doc_pass' },
        { name: 'phones' },
        { name: 'email' },
        { name: 'photo'},
        { name: 'info' },
        { name: 'dic_sp_id'}
    ];

    tableName = "unum_doctors";
    static viewName = "unum_doctors.name";
    restMany = "unum_doctors.*";
    restOne = "unum_doctors.*";
    restFrom = "FROM unum_doctors";

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