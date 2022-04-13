module.exports = app =>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .put(app.api.user.save)
        .delete(app.api.user.remove)
        .get(app.api.user.getById)
    
    app.route('/regional')
        .post(app.api.regional.save)
        .get(app.api.regional.get)

    app.route('/regional/:id')
        .put(app.api.regional.save)
        .delete(app.api.regional.remove)
        .get(app.api.regional.getById)

    }