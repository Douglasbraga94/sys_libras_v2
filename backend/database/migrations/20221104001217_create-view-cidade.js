/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_cidade', view => {
            view.columns(['codigo', 'nome', 'codigoEstado', 'estado', 'uf', 'ordemEstado', 'nomeSemAcento']);
            view.as(
                knex.select({ codigo: 'c.Codigo' }, { nome: 'c.Nome' }, { codigoEstado: 'c.CodigoEstado' }, { estado: 'e.Nome' }, { uf: 'e.UF' }, { ordemEstado: 'c.OrdemEstado' }, { nomeSemAcento: 'c.NomeSemAcento' })
                .from({ c: 'relatorio.Cidade' })
                .innerJoin({ e: 'relatorio.Estado' }, 'c.CodigoEstado', 'e.Codigo')
                .where('e.CodigoPais', 1)
                .orderBy('c.NomeSemAcento')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_cidade');
};
