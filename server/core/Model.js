module.exports = class Model {
    model = {};
    _fields = {};
    _oldFields = {};
    tableName = "";
    restOne = " * ";
    restMany = " * ";
    
    constructor() {
        return this;
    }

    getOne(id) {
        return new Promise(resolve => {
            let q = "SELECT " + this.tableName + ".* FROM " + this.tableName + " WHERE id = ? AND status = 1 LIMIT 1";
            db.query(q, [id], (err, result, fields) => {
                if (err) throw err;
                if (result.length == 1) {
                    this._fields = this._oldFields = result[0];
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
        })
    }

    load(data) {
        for (const el of this.model) {
            const elName = el.name;
            if (data[elName] !== null) {
                this._fields[elName] = data[elName];
            }
        }
        return true;
    }

    delete() {
        return new Promise(async resolve => {
            const d = this.keyField;
            let q = "DELETE FROM " + this.tableName + " WHERE id = ?";
            const result = (await db.q(q, d));
            return resolve(true);
        })
    };

    save() {
        return new Promise(async resolve => {
            if (this.isNew) {
                let f = "";
                let v = "";
                let d = [];
                let tr = "";
                let fist = true;
                for (const key in this._fields) {
                    f = f + tr + key;
                    v = v + tr + '?';
                    d.push(this._fields[key]);
                    if (fist) { tr = ', '; fist = false; }

                }
                if (d.length > 0) {
                    let q = "INSERT INTO " + this.tableName + " (" + f + ") VALUES (" + v + ")";
                    const result = await db.q(q, d);
                    this.keyField = result.insertId;
                    return resolve(this.keyField);
                }
            } else {
                let f = "";
                let d = [];
                let tr = "";
                let fist = true;
                for (const key in this._fields) {
                    f = f + tr + "`" + key + "` = ?";
                    d.push(this._fields[key]);
                    if (fist) { tr = ', '; fist = false; }
                }
                if (d.length > 0) {
                    d.push(this.keyField);
                    let q = "UPDATE " + this.tableName + " SET " + f + " WHERE id = ?";
                    const result = await db.q(q, d);
                    return resolve(this.keyField);
                }
            }
            return resolve(false);
        });
    }

    get fields() {
        return this._fields;
    }

    get isNew() {
        if (this._fields.id && this._fields.id > 0) {
            return false;
        } else {
            return true;
        }
    }

    get keyField() {
        return this._fields.id;
    }

    set keyField(key) {
        this._fields.id = key;
    }

}