/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("perfil").insert([
    { codigo: 3, nome: "Ministério", admin: true, ativo: true }
  ]);
};
