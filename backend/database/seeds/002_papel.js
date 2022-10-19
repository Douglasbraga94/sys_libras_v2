
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('papel').del()
    .then(function () {
      // Inserts seed entries
      return knex('papel').insert([
        { codigo: 1, nome: 'Ministério', prioridade: 1, curso: false, ativo: true },
        { codigo: 2, nome: 'Surdo', prioridade: 2, curso: false, ativo: true },
        { codigo: 3, nome: 'Colaborador', prioridade: 3, curso: false, ativo: true },
        { codigo: 4, nome: 'Intérprete', prioridade: 4, curso: false, ativo: true },
        { codigo: 5, nome: 'Aluno', prioridade: 5, curso: true, ativo: true },
        { codigo: 6, nome: 'Candidato', prioridade: 6, curso: true, ativo: true },
        { codigo: 7, nome: 'Visitante', prioridade: 7, curso: false, ativo: true }
      ]);
    });
};
