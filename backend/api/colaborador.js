
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const colaborador = { ...req.body }
        if(req.params.id) colaborador.id = req.params.id

        try {
            existsOrError(colaborador.nome, 'Informe o nome do colaborador.')
            existsOrError(colaborador.codigo, 'Informe o código do colaborador.')
            existsOrError(colaborador.telefone1, 'Pelo meno um telefone deve ser informado.')
            existsOrError(colaborador.email, 'Email não informado')
            existsOrError(colaborador.idcomum, 'Comum não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(colaborador.id) {
            app.db('colaboradores')
                .update(colaborador)
                .where({ id: colaborador.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        } else {
            app.db('colaboradores')
                .insert(colaborador)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        }
     }

     const get = (req, res) => {
        app.db('colaboradores')
            .select('id', 'nome', 'codigo', 'telefone1', 
            'telefone2', 'email', 'idcomum', 'idadministracao', 'idregional', 'competencia', 'observacao')
            .then(colaborador => res.json(colaborador))
            .catch(err => res.status(500).send(err.message))
    }
    const getColaboradorWhithComum = (req, res) => {
        app.db('colaboradores')
            .join('comuns', 'comuns.id', 'colaboradores.idcomum')
            .join('administracoes','administracoes.id', 'comuns.idadministracao')
            .select('colaboradores.id', 'colaboradores.nome', 'colaboradores.codigo', 'colaboradores.telefone1', 
            'colaboradores.telefone2', 'colaboradores.email', 'colaboradores.idcomum', 
            'colaboradores.idadministracao', 'colaboradores.idregional', 'colaboradores.competencia', 'colaboradores.observacao', 'comuns.nome AS comum')
            .then(colaborador => res.json(colaborador))
            .catch(err => res.status(500).send(err.message))
    }
    

    const getById = (req, res) => {
        app.db('colaboradores')
            .select('id', 'nome', 'codigo',  'telefone1', 
            'telefone2', 'email', 'idcomum', 'idadministracao', 'idregional', 'competencia', 'observacao')
            .where({ id: req.params.id })
            .first()
            .then(colaborador => res.json(colaborador))
            .catch(err => res.status(500).send(err.message))
    }

    const getCompetence = (req, res) => {
        app.db('vw_colaborador_competencia')
            .select('codigo', 'nome', 'ativo')
            .then(competencia => res.json(competencia))
            .catch(err => res.status(500).send(err.message))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Informe o código do colaborador.')

            const rowsDeleted = await app.db('colaboradores')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'O colaborador não foi encontrado.')
            }catch(msg) {
                return res.status(400).send(msg)  
            }
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

     return {save, get, getById, remove, getColaboradorWhithComum, getCompetence}
}
