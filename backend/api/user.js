const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }


     const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        // if(!req.originalUrl.startsWith('/usuarios')) user.admin = false
        // if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.senha, 'Senha não informada')
            existsOrError(user.ministerio, 'Ministerio não informado')

            const userFromDB = await app.db('usuarios')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.senha = encryptPassword(user.senha)

        if(user.id) {
            app.db('usuarios')
                .update(user)
                .where({ id: user.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('usuarios')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
     }

     const get = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin', 'ministerio')
            //.whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin', 'ministerio')
            .where({ id: req.params.id })
            //.whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {

            const rowsUpdated = await app.db('usuarios')
                .update({deletado_em: new Date()})
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
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