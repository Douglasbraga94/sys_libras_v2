/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('evento_ausencia', table => {
            table.integer('codigoEvento').references('codigo').inTable('evento');
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.text('justificativa').notNullable();
            table.timestamp('dataHoraJustificativa').defaultTo(knex.fn.now()).notNullable();
            table.boolean('aprovado', false).notNullable();
            table.boolean('ativo', true).notNullable(); 

            table.primary(['codigoEvento','codigoPessoa']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('evento_ausencia');
};
