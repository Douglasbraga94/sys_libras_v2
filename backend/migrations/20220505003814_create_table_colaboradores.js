
exports.up = function(knex, Promise) {
    return knex.schema.createTable('colaboradores', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('telefone1').notNull()
      table.string('telefone2')
      table.string('email').notNull()
      table.string('competencia').notNull()
      table.string('observacao')
      table.integer('idcomum').references('id').inTable('comuns')
      table.integer('idadministracao').references('id').inTable('administracoes')
      table.integer('idregional').references('id').inTable('regionais')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('colaboradores')
  };
  