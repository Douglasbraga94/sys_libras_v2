
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const administracao = { ...req.body }
        if(req.params.id) administracao.id = req.params.id

        try {
            existsOrError(administracao.nome, 'Nome da administracao não informada')
            existsOrError(administracao.idregional, 'Regional não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(administracao.id) {
            app.db('administracoes')
                .update(administracao)
                .where({ id: administracao.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        } else {
            app.db('administracoes')
                .insert(administracao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        }
     }

     const get = (req, res) => {
        app.db('administracoes')
            .select('id', 'nome', 'idregional')
            //.whereNull('deletedAt')
            .then(administracao => res.json(administracao))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('administracoes')
            .select('id', 'nome', 'idregional')
            .where({ id: req.params.id })
            //.whereNull('deletedAt')
            .first()
            .then(administracao => res.json(administracao))
            .catch(err => res.status(500).send(err.message))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da administracao não informada.')

            const comum = await app.db('comuns')
                .where({ idadministracao: req.params.id })
            notExistsOrError(comum, 'administracao possui comuns cadastradas.')
            const rowsDeleted = await app.db('administracoes')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'administracao não foi encontrada.')
            }catch(msg) {
                return res.status(400).send(msg)  
            }
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

     return {save, get, getById, remove}
}
