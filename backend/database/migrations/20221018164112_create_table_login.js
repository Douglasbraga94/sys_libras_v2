
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('login', table => {
    table.integer('codigo').primary();
    table.timestamp('dataHoraLogin').defaultTo(knex.fn.now());
    table.integer('codigoUsuario');
    table.integer('codigoPerfil');
  })
  .raw('ALTER TABLE login ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY');
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('login');
};
