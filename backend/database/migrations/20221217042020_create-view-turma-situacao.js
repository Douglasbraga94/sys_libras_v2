/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_turma_situacao', view => {
            view.columns['codigo','nome','ativo']
            view.as(
                knex.select('codigo', 'nome', 'ativo')
                .from('turma_situacao')
                .orderBy('nome')
            )
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_turma_situacao')
};
