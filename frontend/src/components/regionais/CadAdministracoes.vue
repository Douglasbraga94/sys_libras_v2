<template>
<div class="administracoes">
    <div class="administracao-admin" >
        <b-form v-if="isEdit">
            <input id="administracao-id" type="hidden" v-model="administracao.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Regional:" label-for="administracao-name">
                        <b-form-select id="regional-administracao" :readonly="mode === 'remove'"
                        v-model="administracao.idregional" :options="regionais"> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome da administracao:" label-for="administracao-name">
                        <b-form-input id="administracao-name" type="text"
                            v-model="administracao.nome" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome da administracao..." />
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
                <h3>administracoes
                    <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="isAdmin">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                </h3>
            </div>
            <div >
            <vue-good-table
                ref="administracoes"
                @on-selected-rows-change="selectionChanged"
                :columns="columns"
                :rows="administracoes"
                :select-options="{ enabled: true, 
                    selectionText: 'Linhas selecionadas',
                    disableSelectInfo: true}"
                :search-options="{ enabled: true, placeholder: 'Procurar...', }"
                styleClass="vgt-table striped hover">
                <template slot="table-row" slot-scope="data">
                    <span v-if="data.column.field == 'actions'">
                        <div v-if="isAdmin"> 
                            <b-button variant="warning" @click="loadadministracao(data.row)" class="mr-2">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button variant="danger" @click="loadadministracao(data.row, 'remove')">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </div>
                        <div v-else>
                            --
                        </div>
                    </span>
                    <span v-if="data.column.field == 'idregional'">
                        <span>{{findRegional(data.formattedRow[data.column.field])}}</span>
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
import PageTitle from '../tamplate/PageTitle.vue'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import { mapState } from 'vuex'

export default {
    name: 'administracoes',
    components:{PageTitle, VueGoodTable},
    computed:mapState(['isAdmin']),
    data: function() {
        return {
            mode: 'save',
            administracao: {},
            administracoes: [],
            regionais: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'Código',field: 'id',},
                {label: 'Regional',field: 'idregional',},
                {label: 'Nome',field: 'nome',},
                {label: 'Ações',field: 'actions',}
      ],
        }
    },
    methods: {
        loadadministracoes() {
            const url = `${baseApiUrl}/administracao`
            axios.get(url).then(res => {
                this.administracoes = res.data
            })
        },
        async loadRegionais() {
            const url = `${baseApiUrl}/regional`
            await axios.get(url).then(res => {
                this.regionais[0] = {}
                this.regionais[0].value = null
                this.regionais[0].text = 'Selecione a Regional'
                for (let index = 1; index <= res.data.length; index++) {
                    this.regionais[index] = {}
                    this.regionais[index].value = res.data[index-1].id
                    this.regionais[index].text = res.data[index-1].nome
                }
            })
        },
        findRegional(value){
            console.log(value)
            if(this.regionais.length>0){
                let item = this.regionais.find(item=>item.value==value)
                console.log(item)
                return item.text
            }  
        },
        reset() {
            this.isEdit = false
            this.mode = 'save'
            this.administracao = {}
            this.loadadministracoes()
        },
        save() {
            const method = this.administracao.id ? 'put' : 'post'
            const id = this.administracao.id ? `/${this.administracao.id}` : ''
            axios[method](`${baseApiUrl}/administracao${id}`, this.administracao)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.administracao.vgt_id
            delete this.administracao.originalIndex
            const id = this.administracao.id
            axios.delete(`${baseApiUrl}/administracao/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadadministracao(administracao, mode = 'save') {
            this.mode = mode
            this.administracao = { ...administracao }
            this.isEdit = true
        }
    },
    async mounted() {
        await this.loadRegionais()
        this.loadadministracoes()
    }
}
</script>

<style>

</style>