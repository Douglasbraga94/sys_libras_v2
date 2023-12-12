
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('usuarios', table => {
        table.timestamp('deletado_em')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('usuarios', table => {
        table.dropColumn('deletado_em')
    })
};
