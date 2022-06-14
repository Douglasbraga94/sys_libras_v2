
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const surdo = { ...req.body }
        if(req.params.id) surdo.id = req.params.id

        try {
            existsOrError(surdo.nome, 'Informe o nome.')
            existsOrError(surdo.codigo, 'Informe o código.')
            existsOrError(surdo.telefone1, 'Pelo meno um telefone deve ser informado.')
            existsOrError(surdo.batismo, 'Informe o Batismo')
            existsOrError(surdo.idcomum, 'Comum não foi informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(surdo.id) {
            app.db('surdos')
                .update(surdo)
                .where({ id: surdo.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        } else {
            app.db('surdos')
                .insert(surdo)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        }
     }

     const get = (req, res) => {
        app.db('surdos')
            .select('id', 'nome', 'codigo', 'telefone1', 
            'telefone2', 'idcomum', 'idadministracao', 'batismo', 'observacao')
            .then(surdo => res.json(surdo))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('surdos')
        .select('id', 'nome', 'codigo', 'telefone1', 
        'telefone2', 'idcomum', 'idadministracao', 'batismo', 'observacao')
            .where({ id: req.params.id })
            .first()
            .then(surdo => res.json(surdo))
            .catch(err => res.status(500).send(err.message))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Informe o código.')

            const rowsDeleted = await app.db('surdos')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'O surdo não foi encontrado.')
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
