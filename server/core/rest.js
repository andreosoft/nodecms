
module.exports = function rest(app, Model, uri, filters, role = 100,
    post = app.post(uri, async (req, res, next) => {
        if (await req.can(role, req, res)) {
            const model = new Model();
            let id;
            if (model.load(req.body) && (id = (await model.save(req.user.id)))) {
                return res.json({ status: 'ok', id: id });
            }
            return res.json({ status: 'error' });
        }
    }),
    get = app.get(uri, async (req, res, next) => {
        if (await req.can(role, req, res)) {
            const model = new Model();
            const tableName = model.tableName;
            if (req.query.id) {
                const id = req.query.id;
                q = "SELECT " + model.restOne + " " + model.restFrom + " WHERE " + tableName + ".id = ? LIMIT 1";
                let data = (await db.q(q, id))[0];
                return res.json({ status: 'ok', data: data });
            } else {

                const sort = {
                    key: 'id',
                    order: 'asc'
                }
                try {
                    const sortGet = JSON.parse(req.query.sort);
                    for (const key in sort) {
                        if (sortGet[key] && sortGet[key] != '') {
                            sort[key] = sortGet[key];
                        }
                    }
                } catch (error) {

                }


                const pager = {
                    page: 0,
                    limit: 1000,
                    count: 0

                }
                try {
                    const pagerGet = JSON.parse(req.query.pager);
                    for (const key in pager) {
                        if (pagerGet[key]) {
                            pager[key] = pagerGet[key];
                        }
                    }
                } catch (error) {

                }

                let fString = "";
                let fVal = [];
                let fKeys = [];
                try {
                    [fKeys, fVal] = filters(JSON.parse(req.query.filters))
                }
                catch (error) {

                }

                if (fKeys.length > 0) {
                    fString = " WHERE " + fKeys.join(" AND ");
                }
                const offset = pager.page * pager.limit;
                const s = sort.key + " " + sort.order;
                qBody = " " + model.restFrom + fString;
                qSelect = model.restMany;
                q = "SELECT COUNT(" + model.tableName + ".id) count_id" + qBody;
                pager.count = (await db.q(q, fVal))[0]['count_id'];
                q = "SELECT " + qSelect + " " + qBody + " ORDER BY " + s + " LIMIT " + pager.limit + " OFFSET " + offset;
                let data = await db.q(q, fVal);
                return res.json({ status: 'ok', data: data, pager: pager });
            }
            return res.json({ status: 'error' });
        }
    }), del = app.delete(uri, async (req, res, next) => {
        if (await req.can(role, req, res)) {
            const id = JSON.parse(req.body.ids)
            if (id) {
                const model = new Model();
                model.keyField = id;
                if (await model.delete(req.user.id)) {
                    return res.json({ status: 'ok' });
                }
            }
            return res.json({ status: 'error' });
        }
    }), select = app.get(uri + "/select", async (req, res, next) => {
        if (await req.can(role, req, res)) {
            const model = new Model();
            q = "SELECT id as value, " + Model.viewName + " as text FROM " + model.tableName + " ORDER BY name";
            const data = await db.q(q);
            return res.json({ status: 'ok', data: data });
        }
    }),
) { }