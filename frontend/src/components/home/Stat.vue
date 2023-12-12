<template>
    <div class="stat" :class="{ 'hide': item == 'hide' }" @click="onClickStat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ valor }}</span>
        </div>
    </div>
</template>

<script>

import { PAPEL, INTERPRETE_SITUACAO, TURMA_SITUACAO, CARTA_ENCAMINHAMENTO } from '@/enums'

export default {
    name: 'Stat',
    props: ['title', 'item', 'icon', 'color', 'component', 'pessoas', 'papeis', 'turma'],
    emits: ['stat-clicked'],
    data: function () {
        return {
            valor: 0,
            filtros: {}
        }
    },
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    },
    methods: {
        getStats(component, item) {

            if (!component || !item)
                return 0

            const roleCode = this.getRoleCode(component)
            switch (roleCode) {
                case PAPEL.INTERPRETE:
                    if (item == 'total')
                        return this.getTotalNumberByRoleCode(roleCode)
                    else if (item == 'habilitados')
                        return this.getTotalNumberOfInterpretersBySituation(INTERPRETE_SITUACAO.HABILITADO)
                    else if (item == 'nao_hab')
                        return this.getTotalNumberOfInterpretersBySituation(INTERPRETE_SITUACAO.NAO_HABILITADO)
                    else if (item == 'diversos')
                        return this.getTotalNumberOfInterpretersBySituation(INTERPRETE_SITUACAO.DIVERSOS)
                    break
                case PAPEL.SURDO:
                    if (item == 'total')
                        return this.getTotalNumberByRoleCode(roleCode)
                    else if (item == 'batizados')
                        return this.getTotalNumberOfPeopleBaptizedOrNotByRoleCode(PAPEL.SURDO, true)
                    else if (item == 'nao_bat')
                        return this.getTotalNumberOfPeopleBaptizedOrNotByRoleCode(PAPEL.SURDO, false)
                    break
                case PAPEL.ALUNO:
                    if (this.turma) {
                        if (item == 'total')
                            return this.getTotalNumberOfStudents(this.turma.codigo)
                        else if (item == 'batizados')
                            return this.getTotalNumberOfStudentsBaptizedOrNot(this.turma.codigo, true)
                        else if (item == 'nao_bat')
                            return this.getTotalNumberOfStudentsBaptizedOrNot(this.turma.codigo, false)
                        else if (item == 'curso_externo')
                            return this.getTotalNumberOfStudentsWithExternalCourseOrNot(this.turma.codigo, true)
                        else if (item == 'andamento')
                            return this.getTotalNumberOfStudentsBySituation(this.turma.codigo, TURMA_SITUACAO.EM_ANDAMENTO)
                        else if (item == 'aprovado')
                            return this.getTotalNumberOfStudentsBySituation(this.turma.codigo, TURMA_SITUACAO.APROVADO)
                        else if (item == 'desistente')
                            return this.getTotalNumberOfStudentsBySituation(this.turma.codigo, TURMA_SITUACAO.DESISTENTE)
                        else if (item == 'reteste')
                            return this.getTotalNumberOfStudentsBySituation(this.turma.codigo, TURMA_SITUACAO.RETESTE)
                        else if (item == 'assinada')
                            return this.getTotalNumberOfStudentsByForwardingLetter(this.turma.codigo, CARTA_ENCAMINHAMENTO.ASSINADA)
                        else if (item == 'pendente')
                            return this.getTotalNumberOfStudentsByForwardingLetter(this.turma.codigo, CARTA_ENCAMINHAMENTO.PENDENTE)
                        else if (item == 'nao_aplicavel')
                            return this.getTotalNumberOfStudentsByForwardingLetter(this.turma.codigo, CARTA_ENCAMINHAMENTO.NAO_APLICAVEL)
                    }
                    break

            }

        },
        onClickStat() {
            this.$emit('stat-clicked', { component: this.component, item: this.item, turma: this.turma, filtros: this.filtros })
        },
        getRoleCode(nome) {
            if (!this.papeis.some(papel => papel.nome == nome))
                return

            return this.papeis.filter(papel => papel.nome == nome)[0].codigo
        },
        getRoleByName(nome) {
            if (!this.papeis.some(papel => papel.nome === nome))
                return

            return this.papeis.filter(papel => papel.nome === nome)[0]
        },
        getTotalNumberByRoleCode(roleCode) {
            if (!this.pessoas || !roleCode)
                return 0

            return this.pessoas.filter(pessoa => (pessoa.papeis.some(papel => papel.codigo == roleCode))).length

        },
        getTotalNumberOfPeopleBaptizedOrNotByRoleCode(roleCode, isBaptized = true) {
            if (!this.papeis || !roleCode)
                return 0

            return this.pessoas.filter(pessoa => (pessoa.papeis.some(papel => papel.codigo == roleCode) && pessoa.batizado == isBaptized)).length
        },
        getTotalNumberOfInterpretersBySituation(situationCode) {
            if (!this.pessoas)
                return 0

            return this.pessoas.filter(pessoa => (pessoa.interprete && Object.keys(pessoa.interprete).length > 0 && pessoa.interprete.situacao.codigo == situationCode) && pessoa.ativo == true).length

        },
        getTotalNumberOfStudents(classCode) {
            if (!this.pessoas || !this.turma || !classCode)
                return 0

            return this.pessoas.filter(pessoa => pessoa.papeis.some(papel => papel.codigo == PAPEL.ALUNO) && pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo == classCode) && pessoa.ativo == true).length
        },
        getTotalNumberOfStudentsBySituation(classCode, situationCode) {
            if (!this.pessoas || !this.turma || !classCode || !situationCode)
                return 0

            return this.pessoas.filter(pessoa => pessoa.papeis.some(papel => papel.codigo == PAPEL.ALUNO) && pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo == classCode && turmaPessoa.situacao.codigo == situationCode) && pessoa.ativo == true).length
        },
        getTotalNumberOfStudentsBaptizedOrNot(classCode, isBaptized = true) {
            if (!this.papeis || !this.turma)
                return 0

            return this.pessoas.filter(pessoa => (pessoa.papeis.some(papel => papel.codigo == PAPEL.ALUNO) && pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo == classCode) && pessoa.batizado == isBaptized) && pessoa.ativo == true).length
        },
        getTotalNumberOfStudentsWithExternalCourseOrNot(classCode, hasExternalCourse = true) {
            if (!this.papeis || !this.turma)
                return 0

            return this.pessoas.filter(pessoa => (pessoa.papeis.some(papel => papel.codigo == PAPEL.ALUNO) && pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo == classCode) && pessoa.cursoExternoLibras == hasExternalCourse) && pessoa.ativo == true).length
        },
        getTotalNumberOfStudentsByForwardingLetter(classCode, forwardingLetterCode) {
            if (!this.pessoas || !this.turma || !classCode || !forwardingLetterCode)
                return 0

            return this.pessoas.filter(pessoa => pessoa.papeis.some(papel => papel.codigo == PAPEL.ALUNO) && pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo == classCode && turmaPessoa.cartaEncaminhamento.codigo == forwardingLetterCode) && pessoa.ativo == true).length
        },
        setFilter(component, item) {
            let filter = {}

            // console.log('component: ' + component + ' | item: ' + item)

            if (!component || !item)
                return filter

            // Papel
            const role = this.getRoleByName(component)
            filter.papel = role

            // Dados cadastrais
            if (item == 'batizados' || item == 'nao_bat' || item == 'curso_externo') {
                filter.dadosCadastrais = {}
                switch (item) {
                    case 'batizados':
                        filter.dadosCadastrais.batizado = true
                        break
                    case 'nao_bat':
                        filter.dadosCadastrais.batizado = false
                        break
                    case 'curso_externo':
                        filter.dadosCadastrais.cursoExternoLibras = true
                        break
                }
            }

            // Situações específicas de acordo com o papel
            switch (role.codigo) {
                case PAPEL.INTERPRETE:
                    if (item == 'habilitados' || item == 'nao_hab' || item == 'diversos')
                        filter.interprete = {
                            situacao: {
                                codigo: this.getInterpreterSituationCodeByItem(item)
                            }
                        }
                    break
                case PAPEL.ALUNO:
                    if (item == 'andamento' || item == 'aprovado' || item == 'desistente' || item == 'reteste' || item == 'assinada' || item == 'pendente' || item == 'nao_aplicavel') {
                        filter.aluno = {}
                        if (item == 'andamento' || item == 'aprovado' || item == 'desistente' || item == 'reteste') {
                            filter.aluno.situacao = {}
                            filter.aluno.situacao.codigo = this.getStudentSituationCodeByItem(item)
                        }
                        else if (item == 'assinada' || item == 'pendente' || item == 'nao_aplicavel') {
                            filter.aluno.cartaEncaminhamento = {}
                            filter.aluno.cartaEncaminhamento.codigo = this.getStudentForwardingLetterCodeByItem(item)
                        }
                    }
                    break
            }

            // Turma
            if (this.turma)
                filter.turma = this.turma

            return filter
        },
        getInterpreterSituationCodeByItem(item) {

            if (!item)
                return

            if (item == 'habilitados')
                return INTERPRETE_SITUACAO.HABILITADO
            else if (item == 'nao_hab')
                return INTERPRETE_SITUACAO.NAO_HABILITADO
            else if (item == 'diversos')
                return INTERPRETE_SITUACAO.DIVERSOS
            else
                return
        },
        getStudentSituationCodeByItem(item) {

            if (!item)
                return

            if (item == 'andamento')
                return TURMA_SITUACAO.EM_ANDAMENTO
            else if (item == 'aprovado')
                return TURMA_SITUACAO.APROVADO
            else if (item == 'desistente')
                return TURMA_SITUACAO.DESISTENTE
            else if (item == 'reteste')
                return TURMA_SITUACAO.RETESTE
            else
                return
        },
        getStudentForwardingLetterCodeByItem(item) {

            if (!item)
                return

            if (item == 'assinada')
                return CARTA_ENCAMINHAMENTO.ASSINADA
            else if (item == 'pendente')
                return CARTA_ENCAMINHAMENTO.PENDENTE
            else if (item == 'nao_aplicavel')
                return CARTA_ENCAMINHAMENTO.NAO_APLICAVEL
            else
                return
        }

    },
    mounted() {
        this.$set(this, 'valor', this.getStats(this.component, this.item));
        this.$set(this, 'filtros', this.setFilter(this.component, this.item))
    },
}
</script>

<style>
.stat {
    flex: 1;
    display: flex;
    border-radius: 8px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #FFF;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.stat:hover {
    cursor: pointer;
}

.stat-icon {
    display: flex;
    align-items: center;
}

.stat-icon i {
    font-size: 5rem;
}

.stat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: center;
}

.stat-title {
    font-size: 1.2rem;
}

.stat-value {
    font-size: 3rem;
}

.hide {
    visibility: hidden;
}
</style>
