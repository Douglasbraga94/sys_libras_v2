/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('atividade_situacao', table => {
            table.integer('codigo').primary();
            table.string('nome', 255).notNullable();
            table.boolean('ativo', true).notNullable();
        })
        .raw('ALTER TABLE atividade_situacao ALTER COLUMN codigo ADD GENERATED BY DEFAULT AS IDENTITY');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('atividade_situacao')
};
