
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interpretes', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('status').notNull()
      table.integer('telefone1').notNull()
      table.integer('telefone2').notNull()
      table.string('email').notNull()
      table.date('oficializacao').notNull()
      table.string('statusJustificativa')
      table.integer('idcomum').references('id').inTable('comuns')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('interpretes')
  };
  