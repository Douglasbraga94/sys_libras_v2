/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('carta_encaminhamento', table => {
            table.integer('codigo').primary();
            table.string('nome', 255).notNullable();
            table.boolean('ativo', true).notNullable();
        })
        .raw('ALTER TABLE carta_encaminhamento ALTER COLUMN codigo ADD GENERATED BY DEFAULT AS IDENTITY');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('carta_encaminhamento');
};
