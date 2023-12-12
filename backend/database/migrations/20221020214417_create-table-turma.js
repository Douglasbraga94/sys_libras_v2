/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('turma', table => {
            table.integer('codigo').primary();
            table.string('nome', 255).notNullable();
            table.integer('codigoCurso').references('codigo').inTable('curso');
            table.integer('codigoLocalidade').references('Codigo').inTable('relatorio.Localidade');
            table.date('dataInicio').notNullable();
            table.date('dataTermino').nullable();
            table.boolean('ativo', true).notNullable();
        })
        .raw('ALTER TABLE turma ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('turma');
};
