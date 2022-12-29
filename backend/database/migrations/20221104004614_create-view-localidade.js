/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_localidade', view => {
            view.columns['codigo', 'nome', 'endereco', 'complemento', 'central', 'cep', 'bairro', 'telefone1', 'telefone2', 'telefone3', 'observacao', 'codigoCidade', 'cidade', 'ordemEstado', 'codigoEstado', 'estado', 'uf', 'codigoRGE', 'RGE', 'codigoRRM', 'RRM', 'codigoADM', 'ADM', 'codigoRGA', 'RGA', 'codigoRelatorio', 'diasCultosConcatenado', 'nomeSemAcento','tipoImovel'];
            view.as(
                knex.select({ codigo: 'l.Codigo' }, { nome: 'l.Nome' }, { endereco: 'l.Endereco' }, { complemento: 'l.Complemento' }, { central: 'l.Central' }, { cep: 'l.Cep' }, { bairro: 'l.Bairro' }, { telefone1: 'l.Telefone1' }, { telefone2: 'l.Telefone2' }, { telefone3: 'l.Telefone3' }, { observacao: 'l.Observacao' }, { codigoCidade: 'l.CodigoCidade' }, { cidade: 'c.Nome' }, { ordemEstado: 'c.OrdemEstado' }, { codigoEstado: 'c.CodigoEstado' }, { estado: 'e.Nome' },  { uf: 'e.UF' }, { codigoRGE: 'l.CodigoRGE' }, { RGE: 'rge.Nome' }, { codigoRRM: 'l.CodigoRRM' }, { RRM: 'rrm.Nome' }, { codigoADM: 'l.CodigoADM' }, { ADM: 'adm.Nome' }, { codigoRGA: 'adm.CodigoRGA' }, { RGA: 'rga.Nome' }, { codigoRelatorio: 'l.CodigoRelatorio' }, { diasCultosConcatenado: 'l.DiasCultosConcatenado' }, { nomeSemAcento: 'l.NomeSemAcento' }, { tipoImovel: 'l.TipoImovel' })
                .from({ l: 'relatorio.Localidade' })
                .innerJoin({ c: 'relatorio.Cidade' }, 'l.CodigoCidade', 'c.Codigo')
                .innerJoin({ e: 'relatorio.Estado' }, 'c.CodigoEstado', 'e.Codigo')
                .innerJoin({ rge: 'relatorio.RGE' }, 'l.CodigoRGE', 'rge.Codigo')
                .innerJoin({ rrm: 'relatorio.RRM' }, 'l.CodigoRRM', 'rrm.Codigo')
                .innerJoin({ adm: 'relatorio.ADM' }, 'l.CodigoADM', 'adm.Codigo')
                .innerJoin({ rga: 'relatorio.RGA' }, 'adm.CodigoRGA', 'rga.Codigo')
                .where('e.CodigoPais', 1)
                .orderBy('l.NomeSemAcento')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_localidade');
};
