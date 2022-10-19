/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('interprete_situacao').del()
  await knex('interprete_situacao').insert([
    { codigo: 1, nome: 'Habilitado', descricao: 'Passou na Prova e é Batizado', ativo: true },
    { codigo: 2, nome: 'Não Habilitado', descricao: 'Passou na Prova, mas não é Batizado', ativo: true },
    { codigo: 3, nome: 'Diversos', descricao: 'Várias situações que requerem justificativa', ativo: true }
  ]);
};
