module.exports = app => {    
    const { existsOrError, notExistsOrError, equalsOrError} = app.api.validations

    const get = async (req, res) => {
        app.db('vw_perfil')
            .select('codigo', 'nome', 'admin', 'ativo')            
            .then(perfil => res.json(perfil))
            .catch(err => res.status(500).send(err.message));
    }

    const getById = async (req, res) => {
        app.db('vw_perfil')
            .select('codigo', 'nome', 'admin', 'ativo')
            .where({ codigo: req.params.codigo })
            .first()
            .then(perfil => res.json(perfil))
            .catch(err => res.status(500).send(err.message))
    }

    return {get, getById}
}