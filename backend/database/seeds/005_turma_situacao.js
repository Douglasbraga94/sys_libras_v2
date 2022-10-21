/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('turma_situacao').del()
  await knex('turma_situacao').insert([
    { codigo: 1, nome: 'Em Andamento', ativo: true },
    { codigo: 2, nome: 'Reteste', ativo: true },
    { codigo: 3, nome: 'Desistente', ativo: true },
    { codigo: 4, nome: 'Aprovado', ativo: true }
  ]);
};
