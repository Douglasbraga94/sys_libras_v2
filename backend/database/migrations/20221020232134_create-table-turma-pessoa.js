/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('turma_pessoa', table => {
            table.integer('codigoTurma').references('codigo').inTable('turma');
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.integer('codigoSituacao').references('codigo').inTable('turma_situacao');
            table.integer('codigoCartaEncaminhamento').references('codigo').inTable('carta_encaminhamento');
            table.date('dataTeste').nullable();
            table.text('observacao').nullable();
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
        .dropTable('turma_pessoa');
};
