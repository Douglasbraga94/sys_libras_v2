/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('atividade_pessoa', table => {
            table.integer('codigoAtividade').references('codigo').inTable('atividade');
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.integer('codigoSituacao').references('codigo').inTable('atividade_situacao');
            table.boolean('ativo', true).notNullable();

            table.primary(['codigoAtividade', 'codigoPessoa']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('atividade_pessoa');
};
