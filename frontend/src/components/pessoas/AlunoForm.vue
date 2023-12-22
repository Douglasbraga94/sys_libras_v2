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
                <b-form-group :id="'curso-grupo-' + local.turma.codigo" label="Curso:"
                    :label-for="'curso-' + local.turma.codigo">
                    <b-form-select :id="'curso-' + local.turma.codigo" :value="local.turma.curso.codigo"
                        @input="update('turma.curso.codigo', $event)" :options="optionsCursos" name="curso"
                        :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-grupo-' + local.turma.codigo" label="Turma:"
                    :label-for="'turma-' + local.turma.codigo">
                    <b-form-select :id="'turma-' + local.turma.codigo" :value="local.turma.codigo"
                        @input="update('turma.codigo', $event)" :options="optionsTurmas" name="turma"
                        :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-situacao-grupo-' + local.turma.codigo" label="Situação:"
                    :label-for="'turma-situacao-' + local.turma.codigo">
                    <b-form-select :id="'turma-situacao-' + local.turma.codigo" :value="local.situacao.codigo"
                        @input="update('situacao.codigo', $event)" :options="optionsSituacoesTurma"
                        name="turma-situacao-grupo" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col>
                <b-form-group :id="'carta-encaminhamento-grupo-' + local.turma.codigo" label="Carta de Encaminhamento:"
                    :label-for="'carta-encaminhamento-' + local.turma.codigo">
                    <b-form-select :id="'carta-encaminhamento-' + local.turma.codigo"
                        :value="local.cartaEncaminhamento.codigo" @input="update('cartaEncaminhamento.codigo', $event)"
                        :options="optionsEncaminhamentosCarta" name="carta-encaminhamento"
                        :disabled="mode === 'view' || mode === 'remove'"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-matricula-grupo' + local.turma.codigo" label="Data da Matricula:"
                    label-for="data-matricula">
                    <b-form-input :id="'data-matricula' + local.turma.codigo" :value="dateFormat(local.dataHoraMatricula)"
                        @input="update('dataHoraMatricula', $event)" type="date"
                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-teste-grupo' + local.turma.codigo" label="Data do Teste:" label-for="data-teste">
                    <b-form-input :id="'data-teste' + local.turma.codigo" :value="dateFormat(local.dataTeste)"
                        @input="update('dataTeste', $event)" type="date"
                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="12" sm="12">
                <b-form-group :id="'observacoes-grupo' + local.turma.codigo" label="Observações:" label-for="observacoes">
                    <b-form-textarea :id="'observacoes' + local.turma.codigo" :value="local.observacao"
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
        },
        localidades: {
            Type: Array
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
            let turma = this.turmas.find(turma => turma.codigoCurso === curso.codigo && turma.ativo === true)
            let localidade = this.localidades.filter(localidade => localidade.codigo === turma.codigoLocalidade)[0]
            let situacao = this.situacoesTurma.filter(situacao => situacao.codigo === TURMA_SITUACAO.EM_ANDAMENTO)[0]
            return (this.value && Object.keys(this.value).length > 0) ? this.value : {
                turma: {
                    codigo: turma.codigo,
                    nome: turma.nome,
                    curso: curso,
                    localidade: localidade,
                    dataInicio: (turma.dataInicio) ? this.dateFormat(turma.dataInicio) : null,
                    dataTermino: (turma.dataTermino) ? this.dateFormat(turma.dataTermino) : null,
                    ativo: turma.ativo
                },
                situacao: situacao,
                cartaEncaminhamento: carta,
                dataTeste: null,
                dataHoraMatricula: this.dateFormat(new Date()),
                observacao: null,
                ativo: true
            };
        },
        idadeInicioCurso() {
            if (this.pessoa.dataNascimento && this.local.turma.dataInicio) {
                return moment(String(this.local.turma.dataInicio))
                    .diff(this.pessoa.dataNascimento, 'years')
            } else {
                return false
            }
        }
    },
    methods: {
        dateFormat: function (date) {
            if (date === undefined || date === null || date == '')
                return date
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
            const turmasCurso = this.turmas.filter(turma => turma.codigoCurso == this.local.turma.curso.codigo)
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
        this.update('turma.curso.codigo', this.local.turma.curso.codigo)
        this.fillOptionsCursos()
        this.fillOptionsTurmas()
        this.fillOptionsSituacoesTurma()
        this.fillOptionsEncaminhamentosCarta()
    },
    watch: {
        'local.turma.curso.codigo': function (newVal, oldVal) {
            console.log('watch: local.turma.curso.codigo')
            this.fillOptionsTurmas()
            let curso = this.cursos.filter(curso => curso.codigo === newVal)[0]
            const dadosAtualizados = {
                codigo: curso.codigo,
                nome: curso.nome,
                sigla: curso.sigla,
                cargaHoraria: curso.cargaHoraria,
                ativo: curso.ativo
            }
            this.update('turma.curso', dadosAtualizados)
        },
        'local.turma.codigo': function (newVal, oldVal) {
            console.log('watch: local.turma.codigo')
            let turma = this.turmas.filter(turma => turma.codigo === newVal)[0]
            let localidade = this.localidades.filter(localidade => localidade.codigo === turma.codigoLocalidade)[0]
            let curso = this.cursos.filter(curso => curso.codigo === turma.codigoCurso)[0]
            const dadosAtualizados = {
                codigo: turma.codigo,
                nome: turma.nome,
                curso: curso,
                localidade: localidade,
                dataInicio: (turma.dataInicio) ? this.dateFormat(turma.dataInicio) : null,
                dataTermino: (turma.dataTermino) ? this.dateFormat(turma.dataTermino) : null,
                ativo: turma.ativo
            }
            this.update('turma', dadosAtualizados)
        },
        'local.situacao.codigo': function (newVal, oldVal) {
            console.log('watch: local.situacao.codigo')
            let situacao = this.situacoesTurma.filter(situacao => situacao.codigo === newVal)[0]
            const dadosAtualizados = {
                codigo: situacao.codigo,
                nome: situacao.nome,
                ativo: situacao.ativo
            }
            this.update('situacao', dadosAtualizados)
        },
        'local.cartaEncaminhamento.codigo': function (newVal, oldVal) {
            console.log('watch: local.cartaEncaminhamento.codigo')
            let carta = this.encaminhamentosCarta.filter(carta => carta.codigo === newVal)[0]
            const dadosAtualizados = {
                codigo: carta.codigo,
                nome: carta.nome,
                ativo: carta.ativo
            }
            this.update('cartaEncaminhamento', dadosAtualizados)
        }
    }

}
</script>

<style></style>