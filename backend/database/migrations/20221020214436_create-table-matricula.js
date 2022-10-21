/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('matricula', table => {
            table.integer('codigoTurma').references('codigo').inTable('turma');
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.timestamp('dataHoraMatricula').defaultTo(knex.fn.now()).notNullable();
            table.boolean('ativo', true).notNullable();

            table.primary(['codigoTurma','codigoPessoa']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('matricula');
};
