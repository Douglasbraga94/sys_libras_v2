
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const regional = { ...req.body }
        if(req.params.id) regional.id = req.params.id

        try {
            existsOrError(regional.nome, 'Nome da regional não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(regional.id) {
            app.db('regionais')
                .update(regional)
                .where({ id: regional.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('regionais')
                .insert(regional)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
     }

     const get = (req, res) => {
        app.db('regionais')
            .select('id', 'nome')
            //.whereNull('deletedAt')
            .then(regional => res.json(regional))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('regionais')
            .select('id', 'nome')
            .where({ id: req.params.id })
            //.whereNull('deletedAt')
            .first()
            .then(regional => res.json(regional))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da regional não informada.')

            const administracao = await app.db('administracoes')
                .where({ idregional: req.params.id })
            notExistsOrError(administracao, 'regional possui administração cadastrada.')
            const rowsDeleted = await app.db('regionais')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'regional não foi encontrada.')
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