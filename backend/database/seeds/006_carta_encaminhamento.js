/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('carta_encaminhamento').del()
  await knex('carta_encaminhamento').insert([
    { codigo: 1, nome: 'Assinada', ativo: true },
    { codigo: 2, nome: 'Pendente', ativo: true },
    { codigo: 3, nome: 'N/A', ativo: true }
  ]);
};
