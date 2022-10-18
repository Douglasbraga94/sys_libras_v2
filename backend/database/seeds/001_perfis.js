
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('perfil').del()
    .then(function () {
      // Inserts seed entries
      return knex('perfil').insert([
        { codigo: 1, nome: 'Administrador', admin: true, ativo: true}, 
        { codigo: 2, nome: 'Colaborador', admin: false, ativo: true}        
      ]);
    });
};
