/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createView("vw_pessoa_papel", (view) => {
    view.columns[
      ("codigoPessoa",
      "nome",
      "telefone1",
      "telefone2",
      "email",
      "codigoLocalidade",
      "localidade",
      "codigoCidade",
      "cidade",
      "codigoEstado",
      "estado",
      "uf",
      "codigoRGE",
      "RGE",
      "codigoRRM",
      "RRM",
      "codigoADM",
      "ADM",
      "codigoRGA",
      "RGA",
      "dataNascimento",
      "dataBatismo",
      "batizado",
      "cursoExternoLibras",
      "observacao",
      "codigoPapel",
      "papel",
      "prioridade",
      "curso",
      "ativo")
    ];
    view.as(
      knex
        .select(
          "pp.codigoPessoa",
          "p.nome",
          "p.telefone1",
          "p.telefone2",
          "p.email",
          "p.codigoLocalidade",
          { localidade: "l.nome" },
          "l.codigoCidade",
          "l.cidade",
          "l.codigoEstado",
          "l.estado",
          "l.uf",
          "l.codigoRGE",
          "l.RGE",
          "l.codigoRRM",
          "l.RRM",
          "l.codigoADM",
          "l.ADM",
          "l.codigoRGA",
          "l.RGA",
          "p.dataNascimento",
          "p.dataBatismo",
          "p.batizado",
          "p.cursoExternoLibras",
          "p.observacao",
          "pp.codigoPapel",
          { papel: "pap.nome" },
          "pap.prioridade",
          "pap.curso",
          "pp.ativo"
        )
        .from({ pp: "pessoa_papel" })
        .innerJoin({ p: "pessoa" }, "pp.codigoPessoa", "p.codigo")
        .innerJoin({ pap: "papel" }, "pp.codigoPapel", "pap.codigo")
        .innerJoin({ l: "vw_localidade" }, "p.codigoLocalidade", "l.codigo")
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropView("vw_pessoa_papel");
};
