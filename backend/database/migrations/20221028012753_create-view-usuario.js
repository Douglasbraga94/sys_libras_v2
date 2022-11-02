/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_usuario', view => {
            view.columns['codigo', 'codigoPerfil', 'perfil', 'admin', 'nome', 'email','senha', 'ministerio', 'ativo'];
            view.as(
                knex.select('u.codigo', 'u.codigoPerfil', { perfil: 'p.nome' }, 'p.admin', 'u.nome', 'u.email', 'u.senha', 'u.ministerio', { ativo: 'u.ativo' })
                .from({ u: 'usuario' })
                .innerJoin({ p: 'perfil' }, 'u.codigoPerfil', 'p.codigo')
                .orderBy('u.codigo')
            );
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_usuario');
};
