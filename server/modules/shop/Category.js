const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class Category extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'image' },
        { name: 'info' },
        { name: 'parent_id' },
        { name: 'status' }
    ];
    tableName = "shop_categorys";

    restMany = "*";
    restOne = "*";
    restFrom = "FROM shop_categorys";

    constructor() {
        super();
    }

    load(data) {
        return super.load(data);
    }

    save(user_id = 0) {
        if (this.isNew) {
            this._fields.createdon = db.convertData((new Date()), true)
            this._fields.createdby_id = user_id;
        }
        return super.save()
    }
};