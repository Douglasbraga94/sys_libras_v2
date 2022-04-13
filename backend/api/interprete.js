
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const interprete = { ...req.body }
        if(req.params.id) interprete.id = req.params.id

        try {
            existsOrError(interprete.nome, 'Nome do interprete não informado.')
            existsOrError(interprete.codigo, 'Código não informado.')
            existsOrError(interprete.status, 'Status não informado.')
            existsOrError(interprete.telefone1, 'Pelo meno um telefone deve ser informado.')
            existsOrError(interprete.email, 'Email não informado')
            existsOrError(interprete.oficializacao, 'Data da oficialização não informada')
            existsOrError(interprete.idcomum, 'Comum não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(interprete.id) {
            app.db('interpretes')
                .update(interprete)
                .where({ id: interprete.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('interpretes')
                .insert(interprete)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
     }

     const get = (req, res) => {
        app.db('interpretes')
            .select('id', 'nome', 'codigo', 'status', 'telefone1', 
            'telefone2', 'email', 'oficializacao', 'statusJustificativa', 'idcomum')
            //.whereNull('deletedAt')
            .then(interprete => res.json(interprete))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('interpretes')
            .select('id', 'nome', 'codigo', 'status', 
            'telefone1', 'telefone2', 'email', 'oficializacao', 'statusJustificativa', 'idcomum')
            .where({ id: req.params.id })
            //.whereNull('deletedAt')
            .first()
            .then(interprete => res.json(interprete))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do interprete não informado.')

            const rowsDeleted = await app.db('interpretes')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'Interprete não foi encontrado.')
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