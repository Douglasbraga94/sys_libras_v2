
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('pessoa_papel', table => {
        table.integer('codigoPessoa').references('codigo').inTable('pessoa');
        table.integer('codigoPapel').references('codigo').inTable('papel');
        table.boolean('ativo', true).notNullable();
        
        table.primary(['codigoPessoa','codigoPapel']);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('pessoa_papel');
};
