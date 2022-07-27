
exports.up = function(knex, Promise) {
    return knex.schema.createTable('GELGuara', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('codigo').notNull()
      table.string('telefone1').notNull()
      table.string('telefone2')
      table.string('email').notNull()
      table.string('surdo', 1).notNull()
      table.string('status').notNull()
      table.string('cartaEncaminhamento').notNull()
      table.integer('idadeInicioCurso')
      table.date('dataBatismo').notNull()
      table.date('dataNascimento').notNull()
      table.string('observacao', 1000)
      table.integer('idcomum').references('id').inTable('comuns')
      table.integer('idadministracao').references('id').inTable('administracoes')
      })
  };
  
  exports.down = function(knex, Promise) {
  
  };
  
