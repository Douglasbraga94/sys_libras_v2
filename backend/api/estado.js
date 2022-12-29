module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations
    
    const get = (req, res) => {
        app.db('vw_estado')
            .select('codigo', 'nome', 'uf', 'codigoPais', 'nomeSemAcento')
            .then(estado => res.json(estado))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_estado')
            .select('codigo', 'nome', 'uf', 'codigoPais', 'nomeSemAcento')
            .where({ codigo: req.params.codigo })
            .then(estado => res.json(estado))
            .catch(err => res.status(500).send(err.message))
    }

    return {get, getById}
}