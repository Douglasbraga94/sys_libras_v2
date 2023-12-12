/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('evento_presenca', table => {
            table.integer('codigoEvento').references('codigo').inTable('evento');
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.timestamp('dataHoraPresenca').defaultTo(knex.fn.now()).notNullable();
            table.integer('codigoPapel').references('codigo').inTable('papel');
            table.integer('quantidadeAcompanhante').defaultTo(0);
            table.boolean('ativo', true).notNullable();

            table.primary(['codigoEvento','codigoPessoa','dataHoraPresenca']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('evento_presenca');
};
