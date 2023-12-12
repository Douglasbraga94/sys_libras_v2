module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations
    
    const get = (req, res) => {
        app.db('vw_cidade')
            .select('codigo', 'nome', 'codigoEstado', 'estado', 'uf', 'ordemEstado', 'nomeSemAcento')
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_cidade')
            .select('codigo', 'nome', 'codigoEstado', 'estado', 'uf', 'ordemEstado', 'nomeSemAcento')
            .where({ codigo: req.params.codigo })
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).send(err.message))
    }

    return {get, getById}
    
}

