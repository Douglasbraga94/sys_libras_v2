/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("perfil").where('codigo', 3).update({admin: false})
  // await knex("perfil").insert([
  //   { codigo: 3, nome: "Ministério", admin: false, ativo: true }
  // ]);
};
