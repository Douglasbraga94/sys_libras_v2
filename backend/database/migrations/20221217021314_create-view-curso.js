/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_curso', view => {
            view.columns(['codigo'], ['nome'], ['sigla'], ['cargaHoraria'], ['ativo'])
            view.as(
                knex.select('codigo', 'nome', 'sigla', 'cargaHoraria', 'ativo')
                .from('curso')
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
        .dropView('vw_curso')
};
