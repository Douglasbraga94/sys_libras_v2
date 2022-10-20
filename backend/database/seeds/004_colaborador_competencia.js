/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('colaborador_competencia').del()
  await knex('colaborador_competencia').insert([
    { codigo: 1, nome: 'Ministério', ativo: true },
    { codigo: 2, nome: 'Administrativo', ativo: true },
    { codigo: 3, nome: 'Ensino', ativo: true },
    { codigo: 4, nome: 'Informática', ativo: true },
  ]);
};
