
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interpretes', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('status').notNull()
      table.string('telefone1').notNull()
      table.string('telefone2')
      table.string('email').notNull()
      table.date('oficializacao').notNull()
      table.string('statusJustificativa')
      table.integer('idcomum').references('id').inTable('comuns')
      table.integer('idadministracao').references('id').inTable('administracoes')
      table.integer('idregional').references('id').inTable('regionais')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('interpretes')
  };
  