<template>
    <b-card bg-variant="default" border-variant="default">
        <b-form-row>
            <b-col md="6" sm="12">
                <b-form-group id="interprete-situacao-grupo" label="Situação:" label-for="interprete-situacao"
                    v-b-tooltip.hover.top="local.situacao.descricao">
                    <b-form-select id="interprete-situacao" :value="local.situacao.codigo"
                        @input="update('situacao.codigo', $event)" :options="optionsSituacoesInterprete"
                        name="interprete-situacao-grupo" :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="6" sm="12">
                <b-form-group id="data-oficializacao-grupo" label="Data de Oficialização:" label-for="data-oficializacao">
                    <b-form-input id="data-oficializacao" type="date" :readonly="mode === 'view' || mode === 'remove'"
                        :value="local.dataOficializacao" @input="update('dataOficializacao', $event)"></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="12" sm="12">
                <b-form-group v-if="showJustificativa" id="interprete-situacao-justificativa-grupo" label="Justificativa:"
                    label-for="interprete-situacao-justificativa">
                    <b-form-textarea id="interprete-situacao-justificativa" placeholder="Justificativa" type="text"
                        :value="local.justificativa" @input="update('justificativa', $event)"
                        :readonly="mode === 'view' || mode === 'remove'" class="observacoes" required>
                    </b-form-textarea>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-card>
</template>

<script>
import { INTERPRETE_SITUACAO } from '@/enums'
import { cloneDeep, tap, set } from 'lodash'

export default {
    name: 'InterpreteForm',
    props: ['value','situacoesInterprete', 'mode'],
    data() {
        return {
            optionsSituacoesInterprete: [],
        }
    },
    computed: {
        local() {
            const situacao = this.situacoesInterprete.filter(situacao => situacao.codigo === INTERPRETE_SITUACAO.HABILITADO)[0]
            return this.value ? this.value : {
                ativo: true,
                dataOficializacao: null,
                justificativa: null,
                situacao: {
                    ativo: situacao.ativo,
                    codigo: situacao.codigo,
                    descricao: situacao.descricao,
                    nome: situacao.nome
                }
            }
        },
        showJustificativa() {
            if (this.local)
                return this.local.situacao.codigo === INTERPRETE_SITUACAO.DIVERSOS
        },
    },
    methods: {
        fillOptionsSituacoesInterprete() {
            this.optionssituacoesInterprete = []
            this.situacoesInterprete.forEach(situacao => this.optionsSituacoesInterprete.push({ value: situacao.codigo, text: situacao.nome, disabled: !situacao.ativo }))
        },
        update(key, value) {
            this.$emit('input', tap(cloneDeep(this.local), v => set(v, key, value)))
        }
    },
    mounted() {
        this.fillOptionsSituacoesInterprete()
    },
    watch: {
        'local.situacao.codigo': function (newVal) {
            const situacao = this.situacoesInterprete.filter(situacao => situacao.codigo === newVal)[0]
            this.local.situacao.ativo = situacao.ativo;
            this.local.situacao.descricao = situacao.descricao;
            this.local.situacao.nome = situacao.nome;
        },
    },
}
</script>

<style></style>