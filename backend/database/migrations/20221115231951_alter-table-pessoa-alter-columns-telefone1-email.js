/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .alterTable('pessoa', table => {
            table.string('telefone1', 25).nullable().alter()
            table.string('email', 255).nullable().alter()
        })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('pessoa', table => {
        table.string('telefone1', 25).notNullable().alter()
        table.string('email', 255).notNullable().alter()
    })  
};
