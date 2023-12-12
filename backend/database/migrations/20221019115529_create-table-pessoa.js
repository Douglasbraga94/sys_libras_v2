
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('pessoa', table => {
        table.integer('codigo').primary();
        table.string('nome', 255).notNullable();
        table.string('telefone1', 25).notNullable();
        table.string('telefone2', 25).nullable();
        table.string('email', 255).notNullable();
        table.integer('codigoLocalidade').references('Codigo').inTable('relatorio.Localidade');
        table.date('dataNascimento').notNullable(); 
        table.date('dataBatismo').nullable();
        table.boolean('batizado', false).notNullable();
        table.boolean('cursoExternoLibras', false).notNullable();
        table.boolean('ativo', true).notNullable();        
    })
    .raw('ALTER TABLE pessoa ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY');
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('pessoa');
};
