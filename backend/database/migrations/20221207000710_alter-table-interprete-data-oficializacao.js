/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .alterTable('interprete', table => {
            table.date('dataOficializacao').nullable().alter();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .altertable('interprete', table => {
            table.date('dataOficializacao').notNullable().alter();
        })
};
