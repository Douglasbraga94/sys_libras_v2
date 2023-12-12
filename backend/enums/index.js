module.exports = {

    PAPEL: Object.freeze({
        "MINISTERIO" : 1,
        "SURDO" : 2,
        "COLABORADOR" : 3,
        "INTERPRETE" : 4,
        "ALUNO" : 5,
        "CANDIDATO" : 6,
        "VISITANTE" : 7
    }),
    
    INTERPRETE_SITUACAO: Object.freeze({
        "HABILITADO" : 1,
        "NAO_HABILITADO" : 2, 
        "DIVERSOS" : 3
    }),
    
    COLABORADOR_COMPETENCIA: Object.freeze({
        "MINISTERIO" : 1, 
        "ADMINISTRATIVO" : 2, 
        "ENSINO" : 3, 
        "INFORMATICA" : 4
    }),
    
    CURSO: Object.freeze({
        "GEL" : 1,
        "GELS" : 2, 
        "ATUALIZACAO" : 3,
        "ADAPTACAO" : 4
    }),
    
    TURMA_SITUACAO: Object.freeze({
        "EM_ANDAMENTO" : 1,
        "RETESTE" : 2,
        "DESISTENTE" : 3,
        "APROVADO" : 4
    }),
    
    CARTA_ENCAMINHAMENTO: Object.freeze({
        "ASSINADA"  : 1, 
        "PENDENTE" : 2, 
        "NAO_APLICAVEL" : 3
    }),

    PERFIL: Object.freeze({
        "ADMINISTRADOR": 1,
        "COLABORADOR" : 2
    })
}
