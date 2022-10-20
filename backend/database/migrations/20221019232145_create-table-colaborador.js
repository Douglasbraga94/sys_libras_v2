/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('colaborador', table => {
            table.integer('codigoPessoa').references('codigo').inTable('pessoa');
            table.integer('codigoCompetencia').references('codigo').inTable('colaborador_competencia'); 
            table.boolean('ativo', true).notNullable();
            table.primary('codigoPessoa');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
