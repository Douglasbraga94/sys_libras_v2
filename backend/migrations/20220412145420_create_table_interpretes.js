
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interpretes', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('status').notNull()
      table.bigint('telefone1').notNull()
      table.bigint('telefone2')
      table.string('email').notNull()
      table.date('oficializacao').notNull()
      table.string('statusJustificativa')
      table.integer('idcomum').references('id').inTable('comuns')
      table.integer('idadministracao').references('id').inTable('administracoes')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('interpretes')
  };
  