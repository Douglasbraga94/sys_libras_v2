/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('interprete', table => {
        table.integer('codigoPessoa').references('codigo').inTable('pessoa');
        table.integer('codigoSituacao').references('codigo').inTable('interprete_situacao');
        table.string('justificativa', 255).nullable();
        table.date('dataOficializacao').notNullable();
        table.boolean('ativo', true).notNullable();

        table.primary('codigoPessoa');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('interprete');
};
