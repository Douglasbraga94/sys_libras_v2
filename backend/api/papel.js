module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const get = (req, res) => {
        app.db('vw_papel')
            .select('codigo', 'nome', 'prioridade', 'curso', 'ativo')
            .then(papel => res.json(papel))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_papel')
            .select('codigo', 'nome', 'prioridade', 'curso', 'ativo')
            .where({ codigo: req.params.codigo })
            .then(papel => res.json(papel))
            .catch(err => res.status(500).send(err.message))
    }

    return {get, getById}
}