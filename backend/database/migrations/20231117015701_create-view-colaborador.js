/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createView('vw_colaborador', (view) => {
    view.columns[('codigoPessoa', 'codigoCompetencia', 'competencia', 'ativo')];
    view.as(
      knex
        .select('c.codigoPessoa', 'c.codigoCompetencia', { competencia: 'cc.nome'}, 'c.ativo')
        .from({ c: "colaborador" })
        .innerJoin({ cc: "colaborador_competencia" },'c.codigoCompetencia','cc.codigo')
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropView('vw_colaborador');
};
