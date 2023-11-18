/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
            CREATE OR REPLACE VIEW vw_turma_pessoa
            AS
            SELECT
                tp."codigoTurma"
                ,tp."codigoPessoa"
                ,tp."codigoSituacao"
                ,tp."codigoCartaEncaminhamento"
                ,tp."dataTeste"
                ,tp.observacao
                ,tp.ativo
                ,t."codigoCurso"
                ,t."codigoLocalidade"
                ,t."dataInicio"
                ,t."dataTermino"
                ,c.nome as curso
                ,c.sigla
                ,c."cargaHoraria"
                ,tp."dataHoraMatricula"
                ,p.nome
                ,p.telefone1
                ,p.telefone2
                ,p.email
                ,p."codigoLocalidade" as "codigoLocalidadePessoa"
                ,p."dataNascimento"
                ,p."dataBatismo"
                ,p.batizado
                ,p."cursoExternoLibras"
            FROM
                turma_pessoa tp
            INNER JOIN
                turma t
                ON tp."codigoTurma" = t.codigo
            INNER JOIN
                curso c
                ON t."codigoCurso" = c.codigo
            INNER JOIN
                pessoa p
                ON tp."codigoPessoa" = p.codigo
            WHERE
                CURRENT_DATE BETWEEN t."dataInicio" AND COALESCE(t."dataTermino", CURRENT_DATE)
                AND t.ativo = true
                AND c.ativo = true
        `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
            CREATE VIEW vw_turma_pessoa
            AS
            SELECT
                tp."codigoTurma"
                ,tp."codigoPessoa"
                ,tp."codigoSituacao"
                ,tp."codigoCartaEncaminhamento"
                ,tp."dataTeste"
                ,tp.observacao
                ,tp.ativo
                ,t."codigoCurso"
                ,t."codigoLocalidade"
                ,t."dataInicio"
                ,t."dataTermino"
                ,c.nome as curso
                ,c.sigla
                ,c."cargaHoraria"
            FROM
                turma_pessoa tp
            INNER JOIN
                turma t
                ON tp."codigoTurma" = t.codigo
            INNER JOIN
                curso c
                ON t."codigoCurso" = c.codigo
            WHERE
                CURRENT_DATE BETWEEN t."dataInicio" AND COALESCE(t."dataTermino", CURRENT_DATE)
                AND t.ativo = true
                AND c.ativo = true        
        `);
};
