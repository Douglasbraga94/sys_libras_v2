/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createView('vw_turma', view => {
            view.columns['codigo','nome','dataInicio','dataTermino','ativo','codigoCurso','curso','sigla','cargaHoraria','ativoCurso','codigoLocalidade','localidade','codigoCidade','cidade','codigoEstado','estado','uf','ADM','codigoADM','RGA','codigoRGA']
            view.as(
                knex.select('t.codigo','t.nome','t.dataInicio','t.dataTermino','t.ativo','t.codigoCurso', { curso: 'c.nome'}, 'c.sigla','c.cargaHoraria',{ ativoCurso: 'c.ativo'},'t.codigoLocalidade',{ localidade: 'l.nome'},'l.codigoCidade','l.cidade','l.codigoEstado','l.estado','l.uf','l.ADM','l.codigoADM','l.RGA','l.codigoRGA')
                .from({ t: 'turma' })
                .innerJoin({ c: 'curso' },'t.codigoCurso','c.codigo')
                .innerJoin({ l: 'vw_localidade' },'t.codigoLocalidade','l.codigo')
                .orderBy('t.nome')
            )
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_turma')
};
