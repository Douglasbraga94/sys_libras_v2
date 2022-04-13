
exports.up = function(knex, Promise) {
    return knex.schema.createTable('administracoes', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.integer('idregional').references('id').inTable('regionais')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('administracoes')
  };
  