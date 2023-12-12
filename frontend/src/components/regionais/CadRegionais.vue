<template>
<div class="regionais">
    <div class="regional-admin" >
        <b-form v-if="isEdit">
            <input id="regional-id" type="hidden" v-model="regional.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome da Regional:" label-for="regional-name">
                        <b-form-input id="regional-name" type="text"
                            v-model="regional.nome" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome da regional..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <div v-show="!isEdit">
            <div class="card-header">
                <h3>Regionais
                    <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="isAdmin">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                    <span>&nbsp;</span>
                    <BotaoDownloadExcel 
                        :dados="dadosPlanilha"
                        planilha="Regionais"
                        arquivo="Controle das Regionais.xlsx"
                    />
                </h3>
            </div>
            <div >
            <vue-good-table
                :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'bottom',
                    perPageDropdown: [3, 5, 10],
                    dropdownAllowAll: true,
                    setCurrentPage: 1,
                    jumpFirstOrLast : true,
                    firstLabel : 'Primeira',
                    lastLabel : 'Última',
                    nextLabel: 'Próxima',
                    prevLabel: 'Anterior',
                    rowsPerPageLabel: 'Linhas por página',
                    ofLabel: 'de',
                    pageLabel: 'Página', // for 'pages' mode
                    allLabel: 'Todas',
                }"
                ref="regionais"
                @on-selected-rows-change="selectionChanged"
                :columns="columns"
                :rows="regionais"
                :select-options="{ enabled: true, 
                    selectionText: 'Linhas selecionadas',
                    disableSelectInfo: true}"
                :search-options="{ enabled: true, placeholder: 'Procurar...', }"
                styleClass="vgt-table striped hover">
                <template slot="table-row" slot-scope="data">
                    <span v-if="data.column.field == 'actions'">
                        <div v-if="isAdmin"> 
                            <b-button variant="warning" @click="loadregional(data.row)" class="mr-2">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button variant="danger" @click="loadregional(data.row, 'remove')">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </div>
                        <div v-else>
                            --
                        </div>
                    </span>
                    <span v-else>
                    {{data.formattedRow[data.column.field]}}
                    </span>
                </template>
            </vue-good-table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import { mapState } from 'vuex'
import BotaoDownloadExcel from '../exportacao/BotaoDownloadExcel.vue'

export default {
    name: 'regionais',
    components:{PageTitle, VueGoodTable,BotaoDownloadExcel},
    computed: {
        dadosPlanilha() {
            const dados = []
            this.regionais.forEach((obj) => {
                let regional = {}
                regional['RA - Regional Administrativa'] = obj.nome;
                dados.push(regional);
            })
            return dados
        },
        ...mapState(['isAdmin'])
    },
    data: function() {
        return {
            mode: 'save',
            regional: {},
            regionais: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'RA - Regional Administrativa',field: 'nome',},
                {label: 'Ações',field: 'actions',}
      ],
        }
    },
    methods: {
        loadregionais() {
            const url = `${baseApiUrl}/regional`
            axios.get(url).then(res => {
                this.regionais = res.data
            })
        },
        reset() {
            this.isEdit = false
            this.mode = 'save'
            this.regional = {}
            this.loadregionais()
        },
        save() {
            delete this.regional.vgt_id
            delete this.regional.vgtSelected
            delete this.regional.originalIndex
            const method = this.regional.id ? 'put' : 'post'
            const id = this.regional.id ? `/${this.regional.id}` : ''
            axios[method](`${baseApiUrl}/regional${id}`, this.regional)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.regional.vgt_id
            delete this.regional.originalIndex
            const id = this.regional.id
            axios.delete(`${baseApiUrl}/regional/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadregional(regional, mode = 'save') {
            this.mode = mode
            this.regional = { ...regional }
            this.isEdit = true
        }
    },
    async mounted() {
        this.loadregionais()
        console.log(this.isAdmin ? "{label: 'Ações',field: 'actions',}" : "{label: '#',field: 'null'}")
    }
}
</script>

<style>

</style>