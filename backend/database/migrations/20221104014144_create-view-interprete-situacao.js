/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_interprete_situacao', view => {
            view.columns(['codigo', 'nome', 'descricao', 'ativo']);
            view.as(
                knex.select('codigo', 'nome', 'descricao', 'ativo')
                .from('interprete_situacao')
                .orderBy('nome')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_interprete_situacao');
};
