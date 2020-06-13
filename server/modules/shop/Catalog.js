const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class Catalog extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'image' },
        { name: 'gallery' },
        { name: 'parent_id' },
        { name: 'category_id' },
        { name: 'info' },
        { name: 'price' },
        { name: 'status' }
    ];

    tableName = "shop_catalog";

    restMany = "shop_catalog.*, shop_categorys.name as category";
    restOne = "shop_catalog.*, shop_categorys.name as category";
    restFrom = "FROM shop_catalog LEFT JOIN shop_categorys ON shop_catalog.category_id = shop_categorys.id";

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