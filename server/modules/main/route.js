exports.route = function (app) {
    app.get('/', (req, res, next) => {
        return res.status(500).json({ error: 'no ddd hello ^)' })
        return res.sendStatus(404);
        return res.redirect('/admin')
        return res.send('111')
    });
}