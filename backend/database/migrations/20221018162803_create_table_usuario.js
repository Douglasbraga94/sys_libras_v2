
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('usuario', table => {
    table.integer('codigo').primary();
    table.integer('codigoPerfil').references('codigo').inTable('perfil');
    table.string('nome', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('senha', 255).notNullable();
    table.string('ministerio', 255);
    table.boolean('ativo', true).notNullable();
  })
  .raw('ALTER TABLE usuario ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY');
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('usuario');
};
