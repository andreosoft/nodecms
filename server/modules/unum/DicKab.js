const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class DicKab extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'info' }
    ];

    tableName = "unum_dic_kab";
    static viewName = "unum_dic_kab.name";
    restMany = "unum_dic_kab.*";
    restOne = "unum_dic_kab.*";
    restFrom = "FROM unum_dic_kab";

    constructor() {
        super();
    }

    load(data) {
        return super.load(data);
    }

    save(user_id = 0) {
        return super.save()
    }
};