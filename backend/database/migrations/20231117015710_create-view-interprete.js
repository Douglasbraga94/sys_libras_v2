/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createView("vw_interprete", (view) => {
    view.columns[
      ("codigoPessoa",
      "codigoSituacao",
      "situacao",
      "descricao",
      "justificativa",
      "dataOficializacao",
      "ativo")
    ];
    view.as(
      knex
        .select(
          "i.codigoPessoa",
          "i.codigoSituacao",
          { situacao: "is.nome" },
          "is.descricao",
          "i.justificativa",
          "i.dataOficializacao",
          "i.ativo"
        )
        .from({ i: "interprete" })
        .innerJoin(
          { is: "interprete_situacao" },
          "i.codigoSituacao",
          "is.codigo"
        )
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropView("vw_interprete")
};
