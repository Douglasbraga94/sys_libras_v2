/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_papel', view => {
            view.columns(['codigo', 'nome', 'prioridade', 'curso', 'ativo']);
            view.as(
                knex.select('codigo', 'nome', 'prioridade', 'curso', 'ativo')
                .from('papel')
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
        .dropView('vw_papel');
};
