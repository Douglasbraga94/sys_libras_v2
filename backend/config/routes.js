const admin = require('./admin')
module.exports = app =>{
//API's Publicas
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/signup', app.api.user.save)


//API's com acesso restrito... Precisa inserir Authorization bearer ao head com o Token

    app.route('/usuario')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
    
    app.route('/usuario/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .delete(admin(app.api.user.remove))
        .get(admin(app.api.user.getById))

    app.route('/perfil')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.perfil.get))
        
    app.route('/perfil/:codigo')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.perfil.getById))
    
    app.route('/regional')
        .all(app.config.passport.authenticate())
        .post(app.api.regional.save)
        .get(app.api.regional.get)

    app.route('/regional/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.regional.save)
        .delete(app.api.regional.remove)
        .get(app.api.regional.getById)

    app.route('/interprete')
        .post(app.api.interprete.save)
        .get(app.api.interprete.get)
        
    app.route('/interpreteComComum')
        .get(app.api.interprete.getInterpretesWhithComum)
     
    app.route('/surdoComcomum')
        .get(app.api.surdo.getSurdosWhithComum)

    app.route('/colaboradorComcomum')
        .get(app.api.colaborador.getColaboradorWhithComum)

    app.route('/GELAlvoradaComcomum')
        .get(app.api.GELAlvorada.getGELAlvoradaWhithComum)

    app.route('/GELGuaraComcomum')
        .get(app.api.GELGuara.getGELGuaraWhithComum)
        
    app.route('/LetramentoComcomum')
        .get(app.api.Letramento.getLetramentoWhithComum)
        
    app.route('/interprete/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.interprete.save)
        .delete(app.api.interprete.remove)
        .get(app.api.interprete.getById)
    
    app.route('/colaborador')
        .post(app.api.colaborador.save)
        .get(app.api.colaborador.get)

    app.route('/colaborador/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.colaborador.save)
        .delete(app.api.colaborador.remove)
        .get(app.api.colaborador.getById) 

    app.route('/surdo')
        .post(app.api.surdo.save)
        .get(app.api.surdo.get)

    app.route('/surdo/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.surdo.save)
        .delete(app.api.surdo.remove)
        .get(app.api.surdo.getById) 

    app.route('/comum')
        .all(app.config.passport.authenticate())
        .post(app.api.comum.save)
        .get(app.api.comum.get)

    app.route('/comum/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.comum.save)
        .delete(app.api.comum.remove)
        .get(app.api.comum.getById)

    app.route('/comumComAdministracao')
        .all(app.config.passport.authenticate())
        .post(app.api.comum.save)
        .get(app.api.comum.getComumWithAdministracao)

    app.route('/administracao')
        .all(app.config.passport.authenticate())
        .post(app.api.administracao.save)
        .get(app.api.administracao.get)

    app.route('/administracao/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.administracao.save)
        .delete(app.api.administracao.remove)
        .get(app.api.administracao.getById)

    app.route('/GELGuara')
        .post(app.api.GELGuara.save)
        .get(app.api.GELGuara.get)

    app.route('/GELGuara/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.GELGuara.save)
        .delete(app.api.GELGuara.remove)
        .get(app.api.GELGuara.getById) 

    app.route('/GELAlvorada')
        .post(app.api.GELAlvorada.save)
        .get(app.api.GELAlvorada.get)

    app.route('/GELAlvorada/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.GELAlvorada.save)
        .delete(app.api.GELAlvorada.remove)
        .get(app.api.GELAlvorada.getById) 

    app.route('/Letramento')
        .post(app.api.Letramento.save)
        .get(app.api.Letramento.get)

    app.route('/Letramento/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.Letramento.save)
        .delete(app.api.Letramento.remove)
        .get(app.api.Letramento.getById) 
    }