<template>
    <b-card 
        bg-variant="default"
        border-variant="default"
    >
        <b-card-title v-if="pessoa.dataNascimento || pessoa.batizado">
            <b-badge pill variant="info" v-if="pessoa.dataNascimento">
                {{ idadeInicioCurso }} ANOS
            </b-badge>&nbsp;
            <b-badge pill variant="info" v-if="pessoa.batizado">
                BATIZADO
            </b-badge>
        </b-card-title>
        <b-form-row>
            <b-col>
                <b-form-group :id="'curso-grupo-' + turma.codigo" label="Curso:" :label-for="'curso-' + turma.codigo">
                    <b-form-select :id="'curso-' + turma.codigo" v-model="turma.curso.codigo" :options="optionsCursos"
                        name="curso" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-grupo-' + turma.codigo" label="Turma:" :label-for="'turma-' + turma.codigo">
                    <b-form-select :id="'turma-' + turma.codigo" v-model="turma.codigo" :options="optionsTurmas"
                        name="turma" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'turma-situacao-grupo-' + turma.codigo" label="Situação:"
                    :label-for="'turma-situacao-' + turma.codigo">
                    <b-form-select :id="'turma-situacao-' + turma.codigo" v-model="turma.situacao.codigo"
                        :options="optionsSituacoesTurma" name="turma-situacao-grupo"
                        :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col>
                <b-form-group :id="'carta-encaminhamento-grupo-' + turma.codigo" label="Carta de Encaminhamento:"
                    :label-for="'carta-encaminhamento-' + turma.codigo">
                    <b-form-select :id="'carta-encaminhamento-' + turma.codigo"
                        v-model="turma.cartaEncaminhamento.codigo" :options="optionsEncaminhamentosCarta"
                        name="carta-encaminhamento" :disabled="mode === 'view' || more === 'remove'"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-matricula-grupo' + turma.codigo" label="Data da Matricula:" label-for="data-matricula">
                    <b-form-input :id="'data-matricula' + turma.codigo" type="date" :readonly="mode === 'view' || mode === 'remove'"
                        v-model.trim="turma.dataMatricula"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group :id="'data-teste-grupo' + turma.codigo" label="Data do Teste:" label-for="data-teste">
                    <b-form-input :id="'data-teste' + turma.codigo" type="date" :readonly="mode === 'view' || mode === 'remove'"
                        v-model.trim="turma.dataTeste"></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="12" sm="12">
                <b-form-group :id="'observacoes-grupo' + turma.codigo" label="Observações:" label-for="observacoes">
                    <b-form-textarea :id="'observacoes' + turma.codigo" placeholder="Observações Gerais" type="text"
                        v-model.trim="turma.observacao" :readonly="mode === 'view' || mode === 'remove'"
                        class="observacoes">
                    </b-form-textarea>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-card>
</template>

<script>
import { CURSO } from '@/enums'
import moment from 'moment';

export default {
    name: 'AlunoForm',
    props: ['turma', 'cursos', 'turmas', 'situacoesTurma', 'encaminhamentosCarta', 'mode', 'pessoa'],
    data() {
        return {
            optionsEncaminhamentosCarta: [],
            optionsCursos: [],
            optionsTurmas: [],
            optionsSituacoesTurma: [],
        }
    },
    methods: {
        dateFormat: function (date) {
            return moment(String(date)).format('DD/MM/YYYY');
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
            const turmasCurso = this.turmas.filter(turma => turma.codigoCurso == this.turma.curso.codigo)
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
    },
    mounted() {
        this.fillOptionsCursos()
        this.fillOptionsTurmas()
        this.fillOptionsSituacoesTurma()
        this.fillOptionsEncaminhamentosCarta()
    },
    computed: {
        idadeInicioCurso() {
            if(this.pessoa.dataNascimento) {
                return moment(String(this.turma.dataInicio))
                    .diff(this.pessoa.dataNascimento, 'years')
            }
        }
    },
    watch: {
        'turma.curso.codigo': function (newVal) {
            this.fillOptionsTurmas()
        }
    }

}
</script>

<style>

</style>