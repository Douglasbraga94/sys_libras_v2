/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('curso').del()
  await knex('curso').insert([
    { codigo: 1, nome: 'Grupo de Ensino em LIBRAS', sigla: 'GEL', cargaHoraria: undefined, ativo: true  },
    { codigo: 2, nome: 'Letramento', sigla: undefined, cargaHoraria: undefined, ativo: true  },
    { codigo: 3, nome: 'Atualização', sigla: undefined, cargaHoraria: undefined, ativo: true  },
    { codigo: 4, nome: 'Adaptação', sigla: undefined, cargaHoraria: undefined, ativo: true  }
  ]);
};
