module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations
    
    const get = (req, res) => {
        app.db('vw_curso')
            .select('codigo','nome','sigla','cargaHoraria','ativo')
            .then(curso => res.json(curso))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_curso')
            .select('codigo','nome','sigla','cargaHoraria','ativo')
            .where({ codigo: req.params.codigo })
            .then(curso => res.json(curso))
            .catch(err => res.status(500).send(err.message))
    }

    return { get, getById }
}