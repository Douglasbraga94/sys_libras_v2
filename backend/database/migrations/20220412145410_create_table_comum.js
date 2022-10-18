
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comuns', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.integer('idadministracao').references('id').inTable('administracoes')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('comuns')
  };
  