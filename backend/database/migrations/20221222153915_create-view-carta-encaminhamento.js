/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_carta_encaminhamento', view => {
            view.columns['codigo','nome','ativo']
            view.as(
                knex.select('codigo','nome','ativo')
                .from('carta_encaminhamento')
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
        .dropView('vw_carta_encaminhamento')
};
