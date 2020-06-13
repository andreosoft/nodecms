const Model = require(config.paths.core + '/Model.js');

module.exports = class Upload extends Model {
    model = [
        { name: 'id' },
        { name: 'name' },
        { name: 'file' },
        { name: 'type' },
        { name: 'info' },
        { name: 'status' }
    ];

    tableName = "uploads";

    restMany = "uploads.*";
    restOne = "uploads.*";
    restFrom = "FROM uploads";

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