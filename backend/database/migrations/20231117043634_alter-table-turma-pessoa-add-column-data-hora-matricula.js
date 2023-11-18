/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("turma_pessoa", (table) => {
    table.timestamp("dataHoraMatricula").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("turma_pessoa", (table) => {
    table.dropColumn("dataHoraMatricula");
  });
};
