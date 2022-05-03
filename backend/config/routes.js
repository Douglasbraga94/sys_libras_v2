const admin = require('./admin')

function apiWrapper(api) {
    return (req, res) => {
        try {
            api(req, res);
        } catch (e) {
            console.log("Ocorreu um erro na chamada da api:", e);
        }
    }
}

module.exports = app =>{
//API's Publicas
    app.post('/signin', apiWrapper(app.api.auth.signin))
    app.post('/validateToken', apiWrapper(app.api.auth.validateToken))
    app.post('/signup', apiWrapper(app.api.user.save))


//API's com acesso restrito... Precisa inserir Authorization bearer ao head com o Token

    app.route('/usuario')
        .all(app.config.passport.authenticate())
        .post(apiWrapper(admin(app.api.user.save)))
        .get(apiWrapper(admin(app.api.user.get)))
    
    app.route('/usuario/:id')
        .all(app.config.passport.authenticate())
        .put(apiWrapper(app.api.user.save))
        .delete(apiWrapper(admin(app.api.user.remove)))
        .get(apiWrapper(admin(app.api.user.getById)))
    
    app.route('/regional')
        .all(app.config.passport.authenticate())
        .post(apiWrapper(app.api.regional.save))
        .get(apiWrapper(app.api.regional.get))

    app.route('/regional/:id')
        .all(app.config.passport.authenticate())
        .put(apiWrapper(app.api.regional.save))
        .delete(apiWrapper(app.api.regional.remove))
        .get(apiWrapper(app.api.regional.getById))

    app.route('/interprete')
        .post(apiWrapper(app.api.interprete.save))
        .get(apiWrapper(app.api.interprete.get))

    app.route('/interprete/:id')
        .all(app.config.passport.authenticate())
        .put(apiWrapper(app.api.interprete.save))
        .delete(apiWrapper(app.api.interprete.remove))
        .get(apiWrapper(app.api.interprete.getById))

    app.route('/comum')
        .all(app.config.passport.authenticate())
        .post(apiWrapper(app.api.comum.save))
        .get(apiWrapper(app.api.comum.get))

    app.route('/comum/:id')
        .all(app.config.passport.authenticate())
        .put(apiWrapper(app.api.comum.save))
        .delete(apiWrapper(app.api.comum.remove))
        .get(apiWrapper(app.api.comum.getById))

    app.route('/administracao')
        .all(app.config.passport.authenticate())
        .post(apiWrapper(app.api.administracao.save))
        .get(apiWrapper(app.api.administracao.get))

    app.route('/administracao/:id')
        .all(app.config.passport.authenticate())
        .put(apiWrapper(app.api.administracao.save))
        .delete(apiWrapper(app.api.administracao.remove))
        .get(apiWrapper(app.api.administracao.getById))

    }
