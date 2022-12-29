module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const get = (req, res) => {
        app.db('vw_pessoa_json')
            .select()
            .then(pessoa => res.json(pessoa[0].dados))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_pessoa_json')
            .select()
            .whereJsonObject('pessoa', { codigo : req.params.codigo  })
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).send(err.message))
    }

    return {get, getById}
}