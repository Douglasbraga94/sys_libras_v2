<template>
    <b-card bg-variant="default" border-variant="default">
        <b-form-row>
            <b-col md="6" sm="12">
                <b-form-group id="colaborador-competencia-grupo" label="Competência:"
                    label-for="colaborador-competencia">
                    <b-form-select id="colaborador-competencia" :value="local.competencia.codigo" @input="update('competencia.codigo', $event)"
                        :options="optionsCompetenciasColaborador" name="colaborador-competencia-grupo"
                        :disabled="mode === 'view' || mode === 'remove'">
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="6" sm="12"></b-col>
        </b-form-row>
    </b-card>
</template>

<script>
import { COLABORADOR_COMPETENCIA } from '@/enums'
import { cloneDeep, tap, set } from 'lodash'

export default {
    name: 'ColaboradorForm', 
    props: ['value','competenciasColaborador', 'mode'],
    data() {
        return {
            optionsCompetenciasColaborador: []
        }
    }, 
    computed: {
        local() {
            const competencia = this.competenciasColaborador.filter(competencia => competencia.codigo === COLABORADOR_COMPETENCIA.ENSINO)[0]
            return this.value ? this.value : {
                ativo: true, 
                competencia: {
                    ativo: competencia.ativo, 
                    codigo: competencia.codigo, 
                    nome: competencia.nome
                }
            }
        }
    },
    methods: {
        fillOptionsCompetenciasColaborador() {
            this.optionsCompetenciasColaborador = []
            this.competenciasColaborador.forEach(competencia => this.optionsCompetenciasColaborador.push({ value: competencia.codigo, text: competencia.nome, disabled: !competencia.ativo }))
        },
        update(key, value) {
            this.$emit('input', tap(cloneDeep(this.local), v => set(v, key, value)))
        }
    }, 
    mounted() {
        this.fillOptionsCompetenciasColaborador()
    },
    watch: {
        'local.competencia.codigo': function (newVal) {
            const competencia = this.competenciasColaborador.filter(competencia => competencia.codigo === newVal)[0]
            this.local.competencia.ativo = competencia.ativo
            this.local.competencia.nome = competencia.nome
        }
    }
}
</script>

<style>

</style>