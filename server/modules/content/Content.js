const md5 = require('md5');
const Model = require(config.paths.core + '/Model.js');

module.exports = class Content extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'content' },
        { name: 'image' },
        { name: 'parent_id' },
        { name: 'isparent' },
        { name: 'info' },
        { name: 'status' }
    ];

    tableName = "content";

    restMany = "content.*";
    restOne = "content.*";
    restFrom = "FROM content";

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