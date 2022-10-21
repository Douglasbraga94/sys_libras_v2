/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('atividade_situacao').del()
  await knex('atividade_situacao').insert([
    { codigo: 1, nome: 'Entregue', ativo: true },
    { codigo: 2, nome: 'Não Entregue', ativo: true }
  ]);
};
