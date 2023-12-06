<template>
    <div class="home">
        <div v-if="showStats">
            <PageTitle icon="fa fa-home" :main="title" :sub="subtitle" />
            <div v-if="!carregarCadastro">
                <div v-if="!showClassDetail">
                    <h3>Intérpretes</h3>
                    <div class="stats">
                        <Stat title="Total de Intérpretes" item="total" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-user" color="#4682B4" :component="getRoleName(PapelEnum.INTERPRETE)"
                            @stat-clicked="onStatClicked" key="interprete-total" />
                        <Stat title="Habilitados" item="habilitados" :pessoas="pessoas" :papeis="papeis" icon="fa fa-user"
                            color="#3bc480" :component="getRoleName(PapelEnum.INTERPRETE)" @stat-clicked="onStatClicked"
                            key="interprete-habilitado" />
                        <Stat title="Nâo Habilitados" item="nao_hab" :pessoas="pessoas" :papeis="papeis" icon="fa fa-user"
                            color="#d54d50" :component="getRoleName(PapelEnum.INTERPRETE)" @stat-clicked="onStatClicked"
                            key="interprete-nao-habilitado" />
                        <Stat title="Diversos" item="diversos" :pessoas="pessoas" :papeis="papeis" icon="fa fa-user"
                            color="#d0d009" :component="getRoleName(PapelEnum.INTERPRETE)" @stat-clicked="onStatClicked"
                            key="interprete-diversos" />
                    </div>
                    <h3>Surdos</h3>
                    <div class="stats">
                        <Stat title="Total de Surdos" item="total" :pessoas="pessoas" :papeis="papeis" icon="fa fa-deaf"
                            color="#4682B4" :component="getRoleName(PapelEnum.SURDO)" @stat-clicked="onStatClicked"
                            key="surdo-total" />
                        <Stat title="Batizados" item="batizados" :pessoas="pessoas" :papeis="papeis" icon="fa fa-deaf"
                            color="#3bc480" :component="getRoleName(PapelEnum.SURDO)" @stat-clicked="onStatClicked"
                            key="surdo-batizado" />
                        <Stat title="Não Batizados" item="nao_bat" :pessoas="pessoas" :papeis="papeis" icon="fa fa-deaf"
                            color="#d54d50" :component="getRoleName(PapelEnum.SURDO)" @stat-clicked="onStatClicked"
                            key="surdo-nao-batizado" />
                        <Stat title="Não Batizados" item="hide" :pessoas="pessoas" :papeis="papeis" icon="fa fa-deaf"
                            color="#d54d50" :component="getRoleName(PapelEnum.SURDO)" @stat-clicked="onStatClicked"
                            key="surdo-hide" />
                    </div>
                    <h3>Alunos</h3>
                    <div class="stats">
                        <Stat v-for="(turma, indice) in turmas" :key="'turma-' + turma.codigo" :turma="turma"
                            :title="turma.nome" item="total" :pessoas="pessoas" :papeis="papeis" icon="fa fa-graduation-cap"
                            :color="getStatColorByIndex(indice)" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" />
                    </div>
                </div>
                <div v-else>
                    <button type="button" @click="resetFilter()" class="btn btn-secondary btn-sm m-1">
                        <i class="fa fa-chevron-circle-left"> Voltar</i> </button>
                    <h3>Alunos</h3>
                    <div class="stats">
                        <Stat title="Total de Alunos" item="total" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-graduation-cap" color="#4682B4"
                            :component="getRoleName(PapelEnum.ALUNO)" @stat-clicked="onStatClicked"
                            :key="'aluno-total-turma=' + filtros.turma.codigo" />
                        <Stat title="Batizados" item="batizados" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-graduation-cap" color="#3bc480" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-batizado-turma-' + filtros.turma.codigo" />
                        <Stat title="Não Batizados" item="nao_bat" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-graduation-cap" color="#d54d50"
                            :component="getRoleName(PapelEnum.ALUNO)" @stat-clicked="onStatClicked"
                            :key="'aluno-nao-batizado-turma-' + filtros.turma.codigo" />
                        <Stat title="Com Curso Externo" item="curso_externo" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-graduation-cap" color="#d0d009"
                            :component="getRoleName(PapelEnum.ALUNO)" @stat-clicked="onStatClicked"
                            :key="'aluno-curso-externo-turma-' + filtros.turma.codigo" />
                    </div>
                    <h3>Situação</h3>
                    <div class="stats">
                        <Stat title="Em Andamento" item="andamento" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-leanpub" color="#4682B4" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-em-andamento-turma-' + filtros.turma.codigo" />
                        <Stat title="Aprovados" item="aprovado" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-leanpub" color="#3bc480" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-aprovado-turma-' + filtros.turma.codigo" />
                        <Stat title="Desistentes" item="desistente" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-leanpub" color="#d54d50" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-desistente-turma-' + filtros.turma.codigo" />
                        <Stat title="Reteste" item="reteste" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-leanpub" color="#d0d009" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-reteste-turma-' + filtros.turma.codigo" />
                    </div>
                    <h3>Carta de Encaminhamento</h3>
                    <div class="stats">
                        <Stat title="Assinadas" item="assinada" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-file-text" color="#4682B4" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-carta-assinada-turma-' + filtros.turma.codigo" />
                        <Stat title="Pendentes" item="pendente" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-file-text" color="#3bc480" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-carta-pendente-turma-' + filtros.turma.codigo" />
                        <Stat title="Não Aplicável" item="nao_aplicavel" :turma="filtros.turma" :pessoas="pessoas"
                            :papeis="papeis" icon="fa fa-file-text" color="#d54d50"
                            :component="getRoleName(PapelEnum.ALUNO)" @stat-clicked="onStatClicked"
                            :key="'aluno-carta-nao-aplicavel-turma-' + filtros.turma.codigo" />
                        <Stat title="Não Aplicável" item="hide" :turma="filtros.turma" :pessoas="pessoas" :papeis="papeis"
                            icon="fa fa-file-text" color="#d0d009" :component="getRoleName(PapelEnum.ALUNO)"
                            @stat-clicked="onStatClicked" :key="'aluno-carta-hide-turma-' + filtros.turma.codigo" />

                    </div>
                </div>
            </div>
            <div v-else>
                <button type="button" @click="resetFilter()" class="btn btn-secondary btn-sm m-1">
                    <i class="fa fa-chevron-circle-left"> Voltar</i>
                </button>
                <pessoa-cadastro :filtros="filtros" v-show="carregarCadastro" key="pessoa-cadastro-dashboard" />
            </div>

        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import Stat from './Stat'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { PAPEL } from '@/enums'
import PessoaCadastro from '../pessoas/PessoaCadastro'

export default {
    name: 'Home',
    components: { PageTitle, Stat, PessoaCadastro },
    data: function () {
        return {
            papeis: [],
            turmas: [],
            filtros: {},
            PapelEnum: PAPEL,
            pessoas: [],
            component: null,
            item: null,
            turma: null,
            carregarCadastro: false
        }
    },
    computed: {
        showStats() {
            return (
                this.papeis && Object.keys(this.papeis).length > 0
                && this.pessoas && Object.keys(this.pessoas).length > 0
                && this.turmas && Object.keys(this.turmas).length > 0) ? true : false
        },
        showClassDetail() {
            return (
                this.filtros && Object.keys(this.filtros).length > 0
                && this.filtros.papel && Object.keys(this.filtros.papel).length > 0 && this.filtros.papel.codigo === PAPEL.ALUNO
                && this.filtros.turma && Object.keys(this.filtros.turma).length > 0) ? true : false
        },
        title() {
            if (!this.filtros.turma || Object.keys(this.filtros.turma).length === 0)
                return "Dashboard"
            else if (this.filtros.turma && Object.keys(this.filtros.turma).length > 0) {
                return "Dashboard - " + this.filtros.turma.nome
            }
        },
        subtitle() {
            var prefixo = "Relatório"
            var sufixo = ""
            if (this.filtros.papel && Object.keys(this.filtros.papel).length > 0) {
                switch (this.filtros.papel.codigo) {
                    case PAPEL.INTERPRETE:
                        if (this.item == 'total')
                            sufixo = " - Total de " + this.filtros.papel.plural
                        else if (this.item == 'habilitados')
                            sufixo = " - " + this.filtros.papel.plural + " Habilitados"
                        else if (this.item == 'nao_hab')
                            sufixo = " - " + this.filtros.papel.plural + " Não Habilitados"
                        else if (this.item == 'diversos')
                            sufixo = " - " + this.filtros.papel.plural + " Diversos "
                        break
                    case PAPEL.SURDO:
                        if (this.item == 'total')
                            sufixo = " - Total de " + this.filtros.papel.plural
                        else if (this.item == 'batizados')
                            sufixo = " - Total de " + this.filtros.papel.plural + " Batizados"
                        else if (this.item == 'nao_bat')
                            sufixo = " - Total de " + this.filtros.papel.plural + " Não Batizados"
                        break
                    case PAPEL.ALUNO:
                        if (this.turma && this.carregarCadastro) {
                            if (this.item == 'total')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - Total de " + this.filtros.papel.plural
                            else if (this.item == 'batizados')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Batizados"
                            else if (this.item == 'nao_bat')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Não Batizados"
                            else if (this.item == 'curso_externo')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Com Curso Externo de Libras"
                            else if (this.item == 'andamento')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Em Andamento"
                            else if (this.item == 'aprovado')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Aprovados"
                            else if (this.item == 'desistente')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Desistentes"
                            else if (this.item == 'reteste')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Reteste"
                            else if (this.item == 'assinada')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Com Carta Assinada"
                            else if (this.item == 'pendente')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Com Carta Pendente"
                            else if (this.item == 'nao_aplicavel')
                                sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome + " - " + this.filtros.papel.plural + " Sem Carta - Não Aplicável"
                        } else if (this.turma && !this.carregarCadastro) {
                            sufixo = " do " + this.filtros.turma.curso + " - " + this.filtros.turma.nome
                        }
                        break
                }
            } else {
                sufixo = " do Sistema"
            }
            var subtitulo = prefixo + sufixo
            return subtitulo
        },
    },
    methods: {
        onStatClicked(payload) {
            console.log('onStatClicked')
            if (payload) {
                const component = payload.component
                const item = payload.item
                const turma = payload.turma
                const filtros = payload.filtros
                const exibirDetalhesTurmaAnterior = this.showClassDetail

                if (item != 'hide') {
                    this.$set(this, 'filtros', filtros)
                    this.$set(this, 'component', component)
                    this.$set(this, 'item', item)
                    if (turma) this.$set(this, 'turma', turma)
                }

                if (!this.component || !this.item || !this.filtros)
                    this.carregarCadastro = false
                else {
                    switch (this.filtros.papel.codigo) {
                        case PAPEL.INTERPRETE:
                        case PAPEL.SURDO:
                            this.carregarCadastro = true
                            break
                        case PAPEL.ALUNO:
                            this.carregarCadastro = (this.turma && exibirDetalhesTurmaAnterior && this.showClassDetail) ? true : false
                            break
                    }
                }


                console.log('home - component: ' + component + ' | item: ' + item)
                console.log('filtros home: ' + JSON.stringify(this.filtros, null, 2))

            }

        },
        async loadPessoas() {
            const url = `${baseApiUrl}/pessoa`
            await axios.get(url).then(res => {
                this.pessoas = res.data
            })
        },
        async loadPapeis() {
            const url = `${baseApiUrl}/papel`
            await axios.get(url).then(res => {
                this.papeis = res.data.filter((papel, indice, arr) => {
                    arr[indice].plural = this.getPluralRole(papel.codigo, papel.nome)
                    return papel.ativo == true
                })
            })
        },
        async loadTurmas() {
            const url = `${baseApiUrl}/turma`
            await axios.get(url).then(res => {
                this.turmas = res.data.filter(turma => turma.ativo == true)
            })
        },
        getRole(codigoPapel) {
            if (!this.papeis || Object.keys(this.papeis).length === 0)
                return

            return this.papeis.filter(papel => papel.codigo === codigoPapel)[0]
        },
        getRoleName(codigoPapel) {
            if (!this.papeis || Object.keys(this.papeis).length === 0)
                return

            return this.papeis.filter(papel => papel.codigo === codigoPapel)[0].nome
        },
        getRoleCode(nome) {
            if (!this.papeis.some(papel => papel.nome === nome))
                return

            return this.papeis.filter(papel => papel.nome === nome)[0].codigo
        },
        getStatColorByIndex(index) {
            let color = ""
            switch (index) {
                case 0:
                    color = "#4682B4"
                    break
                case 1:
                    color = "#3bc480"
                    break
                case 2:
                    color = "#d54d50"
                    break
                case 3:
                    color = "#d0d009"
                    break
                default:
                    color = "#4682B4"
                    break
            }
            return color
        },
        getPluralRole(codigoPapel, papel) {
            let pluralRole = "";
            if (papel) {

                switch (codigoPapel) {
                    case PAPEL.ALUNO:
                        pluralRole = papel + "s"
                        break
                    case PAPEL.CANDIDATO:
                        pluralRole = papel + "s"
                        break
                    case PAPEL.COLABORADOR:
                        pluralRole = papel + "es"
                        break
                    case PAPEL.INTERPRETE:
                        pluralRole = papel + "s"
                        break
                    case PAPEL.MINISTERIO:
                        pluralRole = papel
                        break
                    case PAPEL.SURDO:
                        pluralRole = papel + "s"
                        break
                    case PAPEL.VISITANTE:
                        pluralRole = papel + "s"
                        break
                }
            } else {
                pluralRole = "Pessoas"
            }
            return pluralRole
        },
        resetFilter() {

            // Botão Voltar acionado redirecionando o fluxo para o dashboard geral
            if ((this.carregarCadastro && !this.showClassDetail)
                || (!this.carregarCadastro && this.showClassDetail)) {
                this.component = null
                this.item = null
                this.$set(this, 'turma', null)
                for (const key of Object.keys(this.filtros)) {
                    this.$delete(this.filtros, key)
                }
                // Botão Voltar acionado redirecionando o fluxo para o dashboard da turma
            } else if (this.carregarCadastro && this.showClassDetail && this.turma && Object.keys(this.turma).length > 0) {

                // Configura a exibição para o primeiro item padrão - total
                this.item = "total"
                for (const key of Object.keys(this.filtros)) {
                    if (key != "turma" && key != "papel")
                        this.$delete(this.filtros, key)
                }

            }
            this.carregarCadastro = false
        }

    },

    async created() {
        await this.loadPapeis()
        await this.loadTurmas()
        await this.loadPessoas()
    }

}
</script>

<style>
.stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>
