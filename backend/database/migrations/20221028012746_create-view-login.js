/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_login', view => {
            view.columns['codigo', 'dataHoraLogin', 'codigoUsuario', 'nome', 'codigoPerfil', 'perfil', 'ativo'];
            view.as(
                knex.select('l.codigo', 'l.dataHoraLogin', 'u.nome', 'l.codigoPerfil', { perfil: 'p.nome' }, { ativo: 'l.ativo' })
                .from({ l: 'login' })
                .innerJoin({ u: 'usuario' }, 'l.codigoUsuario',  'u.codigo')
                .innerJoin({ p: 'perfil' }, 'l.codigoPerfil', 'p.codigo')
            );
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView("vw_login");
};
