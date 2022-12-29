module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const get = (req, res) => {
        app.db('vw_turma')
            .select('codigo','nome','dataInicio','dataTermino','ativo','codigoCurso','curso','sigla','cargaHoraria','ativoCurso','codigoLocalidade','localidade','codigoCidade','cidade','codigoEstado','estado','uf','ADM','codigoADM','RGA','codigoRGA')
            .then(turma => res.json(turma))
            .catch(err =>res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_turma')
            .select('codigo','nome','dataInicio','dataTermino','ativo','codigoCurso','curso','sigla','cargaHoraria','ativoCurso','codigoLocalidade','localidade','codigoCidade','cidade','codigoEstado','estado','uf','ADM','codigoADM','RGA','codigoRGA')
            .where({ codigo: req.params.codigo })
            .then(turma => res.json(turma))
            .catch(err =>res.status(500).send(err.message))
    }

    const getState = (req, res) => {
        app.db('vw_turma_situacao')
            .select('codigo', 'nome', 'ativo')
            .then(situacao => res.json(situacao))
            .catch(err => res.status(500).send(err.message))
    }

    const getLetterForwarding = (req, res) => {
        app.db('vw_carta_encaminhamento')
            .select('codigo', 'nome', 'ativo')
            .then(carta => res.json(carta))
            .catch(err => res.status(500).send(err.message))
    }

    return { get, getById, getState, getLetterForwarding }
}