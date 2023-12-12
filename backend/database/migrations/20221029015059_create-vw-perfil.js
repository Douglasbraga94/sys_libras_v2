/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_perfil', view => {
            view.columns['codigo', 'nome', 'admin', 'ativo'];
            view.as(
                knex.select('codigo', 'nome', 'admin', 'ativo')
                .from('perfil')
                .orderBy('codigo')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_perfil');
};
