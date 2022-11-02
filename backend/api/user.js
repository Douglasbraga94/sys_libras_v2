const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }


     const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.codigo) user.codigo = req.params.codigo

        try {
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.senha, 'Senha não informada')
            existsOrError(user.ministerio, 'Ministerio não informado')
            existsOrError(user.codigoPerfil, 'Perfil não informado')

            const userFromDB = await app.db('vw_usuario')
                .where({ email: user.email })
                .first()

            if(!user.codigo) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.senha = encryptPassword(user.senha)

        const bindVars = {
            _codigo: (user.codigo) ? user.codigo : null,
            _codigoPerfil: user.codigoPerfil,
            _nome: user.nome,
            _email: user.email, 
            _senha: user.senha, 
            _ministerio: user.ministerio,
            _ativo: true,
            _gravado: null
        }

        const result = await app.db.raw(
            'Call grava_usuario(:_codigo, :_codigoPerfil,:_nome, :_email, :_senha, :_ministerio, :_ativo, :_gravado)',
            bindVars
        )
        .then(ret => (ret.rows[0]._gravado) ? res.status(204).send() : req.status(404).send())
        .catch(err => res.status(500).send(err.message));
     }

     const get = (req, res) => {
        app.db('vw_usuario')
            .select('codigo', 'codigoPerfil', 'perfil', 'nome', 'email', 'admin', 'ministerio')
            .where({ ativo: true})
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_usuario')
            .select('codigo', 'codigoPerfil', 'perfil', 'nome', 'email', 'admin', 'ministerio', 'senha')
            .where({ codigo: req.params.codigo })
            .andWhere({ ativo: true })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err.message))
    }

    const remove = async (req, res) => {

        const bindVars = {
            _codigo: req.params.codigo,
            _codigoPerfil: null,
            _nome: null,
            _email: null, 
            _senha: null, 
            _ministerio: null,
            _ativo: false,
            _gravado: null
        }

        const result = await app.db.raw(
            'Call grava_usuario(:_codigo, :_codigoPerfil,:_nome, :_email, :_senha, :_ministerio, :_ativo, :_gravado)',
            bindVars
        )
        .then(ret => (ret.rows[0]._gravado) ? res.status(204).send() : req.status(404).send())
        .catch(err => res.status(500).send(err.message));        

        // try {

        //     const rowsUpdated = await app.db('usuarios')
        //         .update({deletado_em: new Date()})
        //         .where({ id: req.params.id })
        //     try{
        //         existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
        //     }catch(msg) {
        //         return res.status(400).send(msg)  
        //     }
        //     res.status(204).send()
        // } catch(msg) {
        //     res.status(400).send(msg)
        // }
    }

     return {save, get, getById, remove}
}
