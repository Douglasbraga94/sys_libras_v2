<template>
    <b-card bg-variant="default" border-variant="default" :title="local.nome">
        <b-card-header v-if="pessoa.dataNascimento || pessoa.batizado">
            <b-badge pill variant="info" v-if="idadeInicioCurso">
                {{ (idadeInicioCurso) ? idadeInicioCurso + ' ANOS' : '' }}
            </b-badge>&nbsp;
            <b-badge pill variant="info" v-if="pessoa.batizado">
                BATIZADO
            </b-badge>
        </b-card-header>
        <b-form-row>
            <b-col>
                <b-form-group :id="'curso-grupo-' + local.codigo" label="Curso:" :label-for="'curso-' + local.codigo">
                    <b-form-select :id="'curso-' + local.codigo" :value="local.curso.codigo"
                        @input="update('curso.codigo', $event)" :options="optionsCursos" name="curso"
                        :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-grupo-' + local.codigo" label="Turma:" :label-for="'turma-' + local.codigo">
                    <b-form-select :id="'turma-' + local.codigo" :value="local.codigo" @input="update('codigo', $event)"
                        :options="optionsTurmas" name="turma" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-situacao-grupo-' + local.codigo" label="Situação:"
                    :label-for="'turma-situacao-' + local.codigo">
                    <b-form-select :id="'turma-situacao-' + local.codigo" :value="local.situacao.codigo"
                        @input="update('situacao.codigo', $event)" :options="optionsSituacoesTurma"
                        name="turma-situacao-grupo" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col>
                <b-form-group :id="'carta-encaminhamento-grupo-' + local.codigo" label="Carta de Encaminhamento:"
                    :label-for="'carta-encaminhamento-' + local.codigo">
                    <b-form-select :id="'carta-encaminhamento-' + local.codigo" :value="local.cartaEncaminhamento.codigo"
                        @input="update('cartaEncaminhamento.codigo', $event)" :options="optionsEncaminhamentosCarta"
                        name="carta-encaminhamento" :disabled="mode === 'view' || mode === 'remove'"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-matricula-grupo' + local.codigo" label="Data da Matricula:"
                    label-for="data-matricula">
                    <b-form-input :id="'data-matricula' + local.codigo" :value="dateFormat(local.dataHoraMatricula)"
                        @input="update('dataHoraMatricula', $event)" type="date"
                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-teste-grupo' + local.codigo" label="Data do Teste:" label-for="data-teste">
                    <b-form-input :id="'data-teste' + local.codigo" :value="dateFormat(local.dataTeste)"
                        @input="update('dataTeste', $event)" type="date"
                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="12" sm="12">
                <b-form-group :id="'observacoes-grupo' + local.codigo" label="Observações:" label-for="observacoes">
                    <b-form-textarea :id="'observacoes' + local.codigo" :value="local.observacao"
                        @input="update('observacao', $event)" placeholder="Observações Gerais" type="text"
                        :readonly="mode === 'view' || mode === 'remove'" class="observacoes">
                    </b-form-textarea>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-card>
</template>

<script>
import { CURSO, CARTA_ENCAMINHAMENTO, TURMA_SITUACAO } from '@/enums'
import moment from 'moment';
import { cloneDeep, tap, set } from 'lodash'

export default {
    name: 'AlunoForm',
    props: {
        value: {
            Type: Object
        },
        cursos: {
            Type: Array
        },
        turmas: {
            Type: Array
        },
        situacoesTurma: {
            Type: Array
        },
        encaminhamentosCarta: {
            Type: Array
        },
        mode: {
            Type: String
        },
        pessoa: {
            Type: Object
        }
    },
    data() {
        return {
            optionsEncaminhamentosCarta: [],
            optionsCursos: [],
            optionsTurmas: [],
            optionsSituacoesTurma: [],
        }
    },
    computed: {
        local() {
            let carta = this.encaminhamentosCarta.filter(carta => carta.codigo === CARTA_ENCAMINHAMENTO.PENDENTE)[0]
            let curso = this.cursos.filter(curso => curso.codigo === CURSO.GEL)[0]
            let situacao = this.situacoesTurma.filter(situacao => situacao.codigo === TURMA_SITUACAO.EM_ANDAMENTO)[0]
            return (this.value && Object.keys(this.value).length > 0) ? this.value : {
                codigo: null,
                nome: null,
                curso: curso,
                localidade: null,
                dataInicio: null,
                dataTermino: null,
                ativo: true,
                situacao: situacao,
                cartaEncaminhamento: carta,
                dataTeste: null,
                dataHoraMatricula: new Date().toISOString().substr(0, 10),
                observacao: null,
            };
        },
        idadeInicioCurso() {
            if (this.pessoa.dataNascimento && this.local.dataInicio) {
                return moment(String(this.local.dataInicio))
                    .diff(this.pessoa.dataNascimento, 'years')
            } else {
                return false
            }
        }
    },
    methods: {
        dateFormat: function (date) {
            if (date === undefined || date === null || date == '')
                return
            return moment(String(date)).format('YYYY-MM-DD');
        },
        fillOptionsCursos() {
            this.optionsCursos = []
            this.cursos.forEach(curso => {
                if (curso.codigo != CURSO.ATUALIZACAO)
                    this.optionsCursos.push({ value: curso.codigo, text: curso.nome, disabled: !curso.ativo })
            })
        },
        fillOptionsTurmas() {
            this.optionsTurmas = []
            const turmasCurso = this.turmas.filter(turma => turma.codigoCurso == this.local.curso.codigo)
            turmasCurso.forEach(turma => {
                if (turma.codigoCurso != CURSO.ATUALIZACAO)
                    this.optionsTurmas.push({ value: turma.codigo, text: turma.nome, disabled: !turma.ativo })
            })

        },
        fillOptionsSituacoesTurma() {
            this.optionsSituacoesTurma = []
            this.situacoesTurma.forEach(situacao => this.optionsSituacoesTurma.push({ value: situacao.codigo, text: situacao.nome, disabled: !situacao.ativo }))
        },
        fillOptionsEncaminhamentosCarta() {
            this.optionsEncaminhamentosCarta = []
            this.encaminhamentosCarta.forEach(carta => this.optionsEncaminhamentosCarta.push({ value: carta.codigo, text: carta.nome, disabled: !carta.ativo }))
        },
        update(key, value) {
            console.log("update aluno: " + key + ":" + value)
            this.$emit("input", tap(cloneDeep(this.local), v => set(v, key, value)))
        }
    },
    created() {
        console.log("created")
        this.update('curso.codigo', this.local.curso.codigo)
    },
    mounted() {
        console.log("mounted")
        this.fillOptionsCursos()
        this.fillOptionsTurmas()
        this.fillOptionsSituacoesTurma()
        this.fillOptionsEncaminhamentosCarta()
    },
    watch: {
        'local.curso.codigo': function (newVal) {
            console.log('watch: local.curso.codigo')
            this.fillOptionsTurmas()
            let curso = this.cursos.filter(curso => curso.codigo === newVal)[0]
            this.update('curso.ativo', curso.ativo)
            this.update('curso.cargaHoraria', curso.cargaHoraria)
            this.update('curso.nome', curso.nome)
            this.update('curso.sigla', curso.sigla)
        },
        'local.codigo': function (newVal) {
            console.log('watch: local.codigo')
            let turma = this.turmas.filter(tur => tur.codigo === newVal)[0]
            console.log('turma: ' + JSON.stringify(turma, null, 2))
            // this.update('ativo', turma.ativo)
            this.update('nome', turma.nome)
            this.update('dataInicio', turma.dataInicio)
            this.update('dataTermino', turma.dataTermino)
        },
        'local.situacao.codigo': function (newVal) {
            console.log('watch: local.situacao.codigo')
            let situacao = this.situacoesTurma.filter(situacao => situacao.codigo === newVal)[0]
            this.local.situacao.ativo = situacao.ativo
            this.local.situacao.nome = situacao.nome
        },
        'local.cartaEncaminhamento.codigo': function (newVal) {
            console.log('watch: local.cartaEncaminhamento.codigo')
            let carta = this.encaminhamentosCarta.filter(carta => carta.codigo === newVal)[0]
            this.local.cartaEncaminhamento.ativo = carta.ativo
            this.local.cartaEncaminhamento.nome = carta.nome
        }
    }

}
</script>

<style></style>