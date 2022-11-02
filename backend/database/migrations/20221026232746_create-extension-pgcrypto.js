/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .raw('CREATE SCHEMA pgcrypto')
        .raw('CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA pgcrypto');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .raw('DROP EXTENSION IF EXISTS pgcrypto')
        .raw('DROP SCHEMA IF EXISTS pgcrypto');
};
