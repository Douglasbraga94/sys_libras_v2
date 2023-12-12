/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_colaborador_competencia', view => {
            view.columns(['codigo', 'nome', 'ativo']);
            view.as(
                knex.select('codigo', 'nome', 'ativo')
                .from('colaborador_competencia')
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
        .dropView('vw_colaborador_competencia');
};
