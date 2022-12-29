module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    const get = (req, res) => {
        app.db('vw_localidade')
            .select('codigo', 'nome', 'endereco', 'complemento', 'central', 'cep', 'bairro', 'telefone1', 'telefone2', 'telefone3', 'observacao', 'codigoCidade', 'cidade', 'ordemEstado', 'codigoEstado', 'estado', 'uf', 'codigoRGE', 'RGE','codigoRRM', 'RRM','codigoADM', 'ADM', 'codigoRGA', 'RGA', 'codigoRelatorio','diasCultosConcatenado','nomeSemAcento','tipoImovel')
            .then(localidade => res.json(localidade))
            .catch(err => res.status(500).send(err.message))
    }

    const getById = (req, res) => {
        app.db('vw_localidade')
            .select('codigo', 'nome', 'endereco', 'complemento', 'central', 'cep', 'bairro', 'telefone1', 'telefone2', 'telefone3', 'observacao', 'codigoCidade', 'cidade', 'ordemEstado', 'codigoEstado', 'estado', 'uf', 'codigoRGE', 'RGE','codigoRRM', 'RRM','codigoADM', 'ADM', 'codigoRGA', 'RGA', 'codigoRelatorio','diasCultosConcatenado','nomeSemAcento','tipoImovel')
            .where({ codigo: req.params.codigo })
            .then(localidade => res.json(localidade))
            .catch(err => res.status(500).send(err.message))        
    }

    return {get, getById}
}