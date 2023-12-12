
exports.up = function(knex, Promise) {
    return knex.schema.createTable('surdos', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('telefone1').notNull()
      table.string('telefone2')
      table.string('batismo', 1).notNull()
      table.string('observacao', 1000)
      table.integer('idcomum').references('id').inTable('comuns')
      table.integer('idadministracao').references('id').inTable('administracoes')
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('surdos');
};
