/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .raw(`
            CREATE VIEW vw_pessoa_json
            AS
            select
                array_to_json(array_agg(row_to_json(t))) as dados
            from
            (
                select
                    p.codigo
                    ,p.nome
                    ,p.telefone1
                    ,p.telefone2
                    ,p.email
                    ,(
                        select 
                            row_to_json(t)
                        from 
                        (
                            select
                                l.codigo 
                                ,l.nome 
                                ,l.endereco
                                ,l.complemento
                                ,l.central
                                ,l.cep
                                ,l.bairro
                                ,l.telefone1
                                ,l.telefone2
                                ,l.telefone3
                                ,l.observacao
                                ,l."codigoCidade"
                                ,l.cidade
                                ,l."ordemEstado"
                                ,l."codigoEstado"
                                ,l.estado
                                ,l.uf
                                ,l."codigoRGE"
                                ,l."RGE"
                                ,l."codigoRRM"
                                ,l."RRM"
                                ,l."codigoADM"
                                ,l."ADM"
                                ,l."codigoRGA"
                                ,l."RGA"
                                ,l."codigoRelatorio"
                                ,l."diasCultosConcatenado"
                                ,l."nomeSemAcento"
                                ,l."tipoImovel"
                            from
                                vw_localidade l 
                            where 	
                                l.codigo = p."codigoLocalidade"
                        ) t
                    ) as localidade
                    ,p."dataNascimento"
                    ,p."dataBatismo"
                    ,p.batizado
                    ,p."cursoExternoLibras"
                    ,p.ativo
                    ,p.observacao
                    ,(
                        select
                            row_to_json(t)
                        from
                        (
                            select
                                codigo
                                ,nome
                                ,prioridade
                                ,curso
                                ,ativo
                            from
                                papel 
                            where
                                prioridade in (
                                    select
                                        min(pap.prioridade) as prioridade_min
                                    from
                                        pessoa_papel pp
                                    inner join
                                        papel pap
                                        on pp."codigoPapel" = pap.codigo
                                            and pap.ativo = true						
                                    where
                                        pp."codigoPessoa" = p.codigo
                                        and pp.ativo = true
                                )
                                and codigo in (select pp."codigoPapel" from pessoa_papel pp where pp."codigoPessoa" = p.codigo)				
                        ) t
                    ) as papel
                    ,(
                        select
                            array_to_json(array_agg(row_to_json(t)))
                        from
                        (
                            select
                                pap.codigo
                                ,pap.nome
                                ,pap.prioridade
                                ,pap.curso
                                ,pap.ativo
                            from
                                pessoa_papel pp
                            inner join
                                papel pap
                                on pp."codigoPapel" = pap.codigo
                                    and pap.ativo = true				
                            where
                                pp."codigoPessoa" = p.codigo
                                and pp.ativo = true				    
                            order by
                                pap.prioridade
                        ) t
                    ) as papeis
                    ,(
                        select
                            row_to_json(t)
                        from
                        (
                            select
                                ( 
                                    select
                                        row_to_json(t) 
                                    from 
                                    (
                                        select
                                            cc.codigo
                                            ,cc.nome
                                            ,cc.ativo
                                        from
                                            colaborador_competencia cc
                                        where
                                            cc.codigo = c."codigoCompetencia"
                                            and cc.ativo = true
                                    ) t
                                ) as competencia
                                ,c.ativo
                            from
                                colaborador c				
                            where
                                c."codigoPessoa" = p.codigo
                                and c.ativo = true					
                        ) t
                    ) as colaborador
                    ,(
                        select 
                            row_to_json(t)
                        from 
                        ( 
                            select
                                (
                                    select 
                                        row_to_json(t)
                                    from 
                                    (
                                        select 
                                            isi.codigo 
                                            ,isi.nome
                                            ,isi.descricao
                                            ,isi.ativo
                                        from 
                                            interprete_situacao isi
                                        where
                                            isi.codigo = i."codigoSituacao"
                                            and isi.ativo = true
                                    ) t
                                ) as situacao
                                ,i.justificativa
                                ,i."dataOficializacao"
                                ,i.ativo
                            from
                                interprete i 
                            where 
                                i."codigoPessoa" = p.codigo
                                and i.ativo = true
                        ) t
                        
                    ) as interprete
                    , (
                        select
                            array_to_json(array_agg(row_to_json(t)))
                        from
                        (
                            select 
                                tu.codigo
                                ,tu.nome
                                , (
                                    select 
                                        row_to_json(t)
                                    from 
                                    (
                                        select
                                            cur.codigo
                                            ,cur.nome
                                            ,cur.sigla
                                            ,cur."cargaHoraria"
                                            ,cur.ativo
                                        from
                                            curso cur
                                        where
                                            cur.codigo = tu."codigoCurso"
                                            and cur.ativo = true
                                    ) t
                                ) as curso
                                ,(
                                    select 
                                        row_to_json(t)
                                    from 
                                    (
                                        select
                                            l.codigo 
                                            ,l.nome 
                                            ,l.endereco
                                            ,l.complemento
                                            ,l.central
                                            ,l.cep
                                            ,l.bairro
                                            ,l.telefone1
                                            ,l.telefone2
                                            ,l.telefone3
                                            ,l.observacao
                                            ,l."codigoCidade"
                                            ,l.cidade
                                            ,l."ordemEstado"
                                            ,l."codigoEstado"
                                            ,l.estado
                                            ,l.uf
                                            ,l."codigoRGE"
                                            ,l."RGE"
                                            ,l."codigoRRM"
                                            ,l."RRM"
                                            ,l."codigoADM"
                                            ,l."ADM"
                                            ,l."codigoRGA"
                                            ,l."RGA"
                                            ,l."codigoRelatorio"
                                            ,l."diasCultosConcatenado"
                                            ,l."nomeSemAcento"
                                            ,l."tipoImovel"
                                        from
                                            vw_localidade l 
                                        where 	
                                            l.codigo = tu."codigoLocalidade"
                                    ) t
                                ) as localidade				
                                ,tu."dataInicio"
                                ,tu."dataTermino"
                                ,tu.ativo
                                ,(
                                    select 
                                        row_to_json(t)
                                    from 
                                    (
                                        select
                                            tsi.codigo
                                            ,tsi.nome
                                            ,tsi.ativo
                                        from
                                            turma_situacao tsi
                                        where
                                            tsi.codigo = tp."codigoSituacao"
                                            and tsi.ativo = true							
                                    ) t
                                ) as situacao
                                , (
                                    select 
                                        row_to_json(t)
                                    from 
                                    (
                                        select 
                                            ce.codigo
                                            ,ce.nome
                                            ,ce.ativo
                                        from 
                                            carta_encaminhamento ce
                                        where
                                            ce.codigo = tp."codigoCartaEncaminhamento"
                                            and ce.ativo = true
                                    ) t
                                ) as "cartaEncaminhamento"
                                ,tp."dataTeste"
                                ,m."dataHoraMatricula"
                                ,tp.observacao
                                ,tp.ativo
                            from 
                                turma_pessoa tp
                            inner join
                                turma tu
                                on tp."codigoTurma" = tu.codigo
                                    and tu.ativo = true
                                    and current_date between tu."dataInicio" and coalesce(tu."dataTermino", current_date) 
                            left join 
                                matricula m 
                                on tu.codigo = m."codigoTurma"
                                    and m.ativo = true
                            where
                                tp."codigoPessoa" = p.codigo
                                and tp.ativo = true 
                        ) t
                    ) as turmas
                from
                    pessoa p
                where
                    p.ativo = true
                order by
                    p.nome
            ) t
        `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropView('vw_pessoa_json')
};
