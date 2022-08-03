
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const aluno = { ...req.body }
        if(req.params.id) aluno.id = req.params.id

        try {
            existsOrError(aluno.codigo, 'Informe o código.')
            existsOrError(aluno.nome, 'Informe o nome.')
            existsOrError(aluno.email, 'Informe o email.')
            existsOrError(aluno.telefone1, 'Pelo meno um telefone deve ser informado.')
            existsOrError(aluno.cartaEncaminhamento, 'Informe a situação da Carta de Encaminhamento.')
            existsOrError(aluno.status, 'Informe o Status do aluno.')
            existsOrError(aluno.surdo, 'Informe se o aluno é surdo ou não.')
            existsOrError(aluno.idcomum, 'Comum não foi informada.')
            existsOrError(aluno.dataNascimento, 'Informe a data de Nascimento.')
            existsOrError(aluno.dataBatismo, 'Informe a data de Batismo.')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(aluno.id) {
            app.db('Letramento')
                .update(aluno)
                .where({ id: aluno.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        } else {
            app.db('Letramento')
                .insert(aluno)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err.message))
        }
     }

     const get = (req, res) => {
        app.db('Letramento')
            .select('id', 'nome', 'codigo', 'telefone1', 
            'telefone2', 'email', 'surdo', 'status', 'cartaEncaminhamento', 'idadeInicioCurso',
            'dataBatismo', 'dataNascimento', 'idcomum', 'idadministracao', 'observacao')
            .then(aluno => res.json(aluno))
            .catch(err => res.status(500).send(err.message))
    }

    const getLetramentoWhithComum = (req, res) => {
        app.db('Letramento')
        .join('comuns', 'comuns.id', 'Letramento.idcomum')
        .join('administracoes','administracoes.id','comuns.idadministracao')
        .join('regionais','regionais.id','administracoes.idregional')
            .select('Letramento.id', 'Letramento.nome', 'Letramento.codigo', 'Letramento.telefone1', 
            'Letramento.telefone2', 'Letramento.email', 'Letramento.surdo', 'Letramento.status', 
            'Letramento.cartaEncaminhamento', 'Letramento.idadeInicioCurso','Letramento.dataBatismo',
            'Letramento.dataNascimento','Letramento.idcomum', 'Letramento.idadministracao', 
            'Letramento.observacao', 'comuns.nome AS comum','administracoes.nome AS administracao', 
            'administracoes.idregional','regionais.nome AS regional')
            .then(aluno => res.json(aluno))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('Letramento')
        .select('id', 'nome', 'codigo', 'telefone1', 
        'telefone2','email', 'surdo', 'status', 'cartaEncaminhamento', 'idadeInicioCurso', 
        'dataBatismo', 'dataNascimento', 'idcomum', 'idadministracao', 'observacao')
            .where({ id: req.params.id })
            .first()
            .then(aluno => res.json(aluno))
            .catch(err => res.status(500).send(err.message))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Informe o código.')

            const rowsDeleted = await app.db('Letramento')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'O aluno não foi encontrado.')
            }catch(msg) {
                return res.status(400).send(msg)  
            }
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

     return {save, get, getById, remove, getLetramentoWhithComum}
}
