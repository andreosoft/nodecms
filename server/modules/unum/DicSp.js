const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class DicSp extends Model {
    model = [
        { name: 'id' },
        { name: 'name' }
    ];

    tableName = "unum_dic_sp";

    restMany = "unum_dic_sp.*";
    restOne = "unum_dic_sp.*";
    restFrom = "FROM unum_dic_sp";

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