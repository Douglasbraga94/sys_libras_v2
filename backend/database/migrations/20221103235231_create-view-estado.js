/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_estado', view => {
            view.columns(['codigo', 'nome', 'uf', 'codigoPais', 'nomeSemAcento']);
            view.as(
                knex.select({ codigo: 'Codigo'}, { nome: 'Nome' }, { uf: 'UF' }, { codigoPais: 'CodigoPais'}, { nomeSemAcento: 'NomeSemAcento' })
                .from('relatorio.Estado')
                .where('CodigoPais', 1)
                .orderBy('NomeSemAcento')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_estado');
};
