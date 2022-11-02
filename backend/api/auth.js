const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require( 'bcrypt-nodejs')

module.exports = app =>{
//Modulo responsavel pela autenticação do usuario
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('vw_usuario')
            .where({ email: req.body.email })
            .andWhere({ ativo: true })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        const bindVars = {
            _email: req.body.email, 
            _senha: req.body.senha, 
            _autenticado: null
        }

        const result = await app.db.raw(
            'Call autentica_usuario(:_email,:_senha,:_autenticado)',
            bindVars
        )
        .then(ret => ret)
        .catch(err => {
            console.log(err);
            throw err;
        });

        const isMatch = result.rows[0]._autenticado;

        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            codigo: user.codigo,
            nome: user.nome,
            email: user.email,
            admin: user.admin,
            ministerio: user.ministerio,
            codigoPerfil: user.codigoPerfil,
            perfil: user.perfil,
            iat: now,
            exp: now + (60 * 60 * 24 )
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })        

        

    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }


}