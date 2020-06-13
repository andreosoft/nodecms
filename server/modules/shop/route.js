const Catalog = require('./Catalog.js')
const Category = require('./Category.js')
const rest = require(config.paths.core + '/rest.js');

exports.route = function (app) {
    
    rest(app, Catalog, '/shop/products', filters = function (filters) {
        let fKeys = [];
        let fVal = [];
        for (const key in filters) {
            if (filters[key] != '') {
                switch (key) {
                    case 'id':
                        fKeys.push("id = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'status':
                        fKeys.push("status = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'name':
                        fKeys.push("name LIKE ?");
                        fVal.push("%" + filters[key] + "%");
                        break;

                    default:
                        break;
                }
            }
        }
        return [fKeys, fVal];
    });

    rest(app, Category, '/shop/categories', filters = function (filters) {
        let fKeys = [];
        let fVal = [];
        for (const key in filters) {
            if (filters[key] != '') {
                switch (key) {
                    case 'id':
                        fKeys.push("id = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'status':
                        fKeys.push("status = ?");
                        fVal.push(filters[key]);
                        break;
                    case 'name':
                        fKeys.push("name LIKE ?");
                        fVal.push("%" + filters[key] + "%");
                        break;

                    default:
                        break;
                }
            }
        }
        return [fKeys, fVal];
    });

    
}