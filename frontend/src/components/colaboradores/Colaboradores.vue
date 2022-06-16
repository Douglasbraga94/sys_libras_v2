<template>
<div class="colaboradores">
    <PageTitle icon="fa fa-users" main="Colaboradores de Libras - CCB"
            sub="Controle de Colaboradores de LIBRAS" />
    <div class="colaborador-admin" >
        <b-form v-if="isEdit">
            <input id="colaborador-id" type="hidden" v-model="colaborador.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Código:" label-for="codigo">
                        <b-form-input id="codigo" type="text"
                            v-model="colaborador.codigo" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o código do Colaborador" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome:" label-for="colaborador-name">
                        <b-form-input id="colaborador-name" type="text"
                            v-model="colaborador.nome" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o Nome do Colaborador" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="E-mail:" label-for="colaborador-email">
                        <b-form-input id="colaborador-email" type="text"
                            v-model="colaborador.email" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o E-mail do Colaborador" />
                    </b-form-group>
                </b-col>
            </b-row>  

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Principal:" label-for="telefone1">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone1" type="text"
                            v-model="colaborador.telefone1" required
                            placeholder="Informe o melhor número" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Secundário:" 
                        label-for="telefone2">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone2" type="text"
                            v-model="colaborador.telefone2" required
                            placeholder="Telefone secundário" />
                    </b-form-group>
                </b-col>

                <b-col md="4" sm="12">
                    <b-form-group label="Competência:" label-for="colaborador-competencia">
                        <b-form-input :readonly="mode === 'vizualizar'" id="competencia" type="text"
                            v-model="colaborador.competencia" required
                            placeholder="Informe a competência do colaborador" />
                    </b-form-group>
                </b-col>
            </b-row>        

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Regional:" label-for="regional">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="colaborador-regional" 
                        v-model="colaborador.idregional" :options="regionais" > 
                        </b-form-select>
                    </b-form-group>
                </b-col>

                <b-col md="4" sm="12">
                    <b-form-group label="Administração:" label-for="administracao">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="colaborador-administracao" 
                        v-model="colaborador.idadministracao" :options="administracoes" >
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Setor - Comum:" label-for="comum">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="colaborador-comum" 
                        v-model="colaborador.idcomum" :options="FilteredComuns"> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="6" sm="24">
                    <b-form-group label="Observações:" label-for="observacoes">
                        <b-form-textarea :readonly="mode === 'vizualizar'" id="observacoes" type="text"
                            v-model="colaborador.observacao" required
                            placeholder="Observações" />
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
        <div v-show="!isEdit" :class="{'tabela_hide': !isMenuVisible, 'tabela': isMenuVisible}">
            <div class="card-header">
                <h3>Colaboradores Regional Brasília 
                    <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="isAdmin">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                    <span>&nbsp;</span>
                    <button type="button" @click="exportIDSelected" class="btn btn-outline-info btn-lg">
                        <i class="fa fa-id-card"></i>
                    </button>
                </h3>
            </div>
            <div >
                <Cracha ref="cracha" v-on:complete="onCompleteExport"></Cracha>
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
                    ref="colaboradores"
                    @on-selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="colaboradores"
                    :select-options="{ enabled: true, 
                        selectionText: 'Linhas selecionadas',
                        disableSelectInfo: true}"
                    :search-options="{ enabled: true, placeholder: 'Procurar...', }"
                    styleClass="vgt-table striped hover">
                    
                    <template slot="table-row" slot-scope="data">
                        <span v-if="data.column.field == 'actions'">
                            <b-button v-b-tooltip.hover title="Imprimir Crachá" variant="primary" @click="exportID(data.row, $event)" class="mr-2 botoes">
                                <i class="fa fa-id-card"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Vizualizar" variant="success" @click="loadcolaborador(data.row, 'vizualizar')" class="mr-2 botoes">
                                <i class="fa fa-eye"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Editar" variant="warning" @click="loadcolaborador(data.row)" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Excluir" variant="danger" @click="loadcolaborador(data.row, 'remove')" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </span>
                        
                        <span v-if="data.column.field == 'idadministracao'">
                            <span>{{findAdministracao(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'idcomum'">
                            <span>{{findComum(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'idregional'">
                            <span>{{findRegional(data.formattedRow[data.column.field])}}</span>
                        </span>
                        
                        <span v-if="data.column.field != 'actions' && data.column.field != 'idadministracao' &&
                            data.column.field != 'idcomum' && data.column.field != 'idregional'">
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
import moment from 'moment';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Cracha from '../tamplate/Cracha.vue'
import { mapState } from 'vuex'
    
export default {
    name: 'colaboradores',
    components:{PageTitle, VueGoodTable, Cracha},
    computed:mapState(['isAdmin', 'isMenuVisible']),
    data: function() {
        return {
            mode: 'save',
            colaborador: {},
            colaboradores: [],
            administracao: 0,
            administracoes: [],
            regional: 0,
            regionais: [],
            comuns: [],
            FilteredComuns: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'Código',field: 'codigo',},
                {label: 'Competência',field: 'competencia',},
                {label: 'Nome',field: 'nome', width: '150px'},
                {label: 'Setor - Comum',field: 'comum', },
                {label: 'Telefone Principal',field: 'telefone1',},
                // {label: 'Telefone 2',field: 'telefone2',width: '150px'},
                // {label: 'E-mail',field: 'email',},
                //{label: 'Regional',field: 'idregional',},
                //{label: 'Administração',field: 'idadministracao',},
                {label: 'Ações',field: 'actions', },
            ],
        }
    },
    
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
        dateFormat: function(date) {
        		return moment(String(date)).format('DD/MM/YYYY');
        	},
        findAdministracao(value){
            if(this.administracoes.length>0){
                let item = this.administracoes.find(item=>item.value==value)
                return item.text
            }  
        },
        findRegional(value){
            if(this.regionais.length>0){
                let item = this.regionais.find(item=>item.value==value)
                return item.text
            }  
        },
        findComum(value){
            if(this.comuns.length>0){
                let item = this.comuns.find(item=>item.value==value)
                return item.text
            }  
        },
        loadcolaboradores() {
            
            const url = `${baseApiUrl}/colaboradorComcomum`
            axios.get(url).then(res => {
                this.colaboradores = res.data
            })
        },
        async loadAdministracao() {
            const url = `${baseApiUrl}/administracao`
            await axios.get(url).then(res => {
                this.administracoes[0] = {}
                this.administracoes[0].value = null
                this.administracoes[0].text = 'Selecione a administração'
                for (let index = 1; index <= res.data.length; index++) {
                    this.administracoes[index] = {}
                    this.administracoes[index].value = res.data[index-1].id
                    this.administracoes[index].text = res.data[index-1].nome
                }
            })
        },
        async loadRegional() {
            const url = `${baseApiUrl}/regional`
            await axios.get(url).then(res => {
                this.regionais[0] = {}
                this.regionais[0].value = null
                this.regionais[0].text = 'Selecione a regional'
                for (let index = 1; index <= res.data.length; index++) {
                    this.regionais[index] = {}
                    this.regionais[index].value = res.data[index-1].id
                    this.regionais[index].text = res.data[index-1].nome
                }
            })
        },
        async loadComuns() {
            const url = `${baseApiUrl}/comum`
            await axios.get(url).then(res => {
                this.comuns[0] = {}
                this.comuns[0].value = null
                this.comuns[0].text = 'Selecione a Comum'
                for (let index = 1; index <= res.data.length; index++) {
                    this.comuns[index] = {}
                    this.comuns[index].value = res.data[index-1].id
                    this.comuns[index].text = res.data[index-1].nome
                    this.comuns[index].idadministracao = res.data[index-1].idadministracao
                }
            })
        },
        async setComum(item,event) {
        },
        reset() {
            this.isEdit = false
            this.mode = 'save'
            this.colaborador = {}
            this.loadcolaboradores()
        },
        save() {
            console.log(this.colaborador.oficializacao)
            delete this.colaborador.vgt_id
            delete this.colaborador.originalIndex
            delete this.colaborador.comum
            const method = this.colaborador.id ? 'put' : 'post'
            const id = this.colaborador.id ? `/${this.colaborador.id}` : ''
            axios[method](`${baseApiUrl}/colaborador${id}`, this.colaborador)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.colaborador.vgt_id
            delete this.colaborador.originalIndex
            const id = this.colaborador.id
            axios.delete(`${baseApiUrl}/colaborador/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadcolaborador(colaborador, mode = 'save') {
            debugger

            this.mode = mode
            this.colaborador = { ...colaborador }
            this.isEdit = true
        },
      
        exportID(item, event) {
          this.$loadingService.start();

          event.stopPropagation();
          this.$refs['cracha'].setItens([{
              nome: item.nome,
              codigo: item.codigo,
              comum: this.findComum(item.idcomum),
              tipo: "colaborador"
            }]
          );
        },

        exportIDSelected() {
            if(this.$refs['colaboradores'].selectedRows.length == 0){
                this.showAlert('selecione as linhas que deseja gerar o crachá');
                return
            } 
            this.$loadingService.start();
            this.$refs['cracha'].setItens(this.$refs['colaboradores'].selectedRows.map(item => {
                return {
                    nome: item.nome,
                    codigo: item.codigo,
                    comum: this.findComum(item.idcomum),
                    tipo: "colaborador"
                };
            }));
        },

        onCompleteExport() {
          this.$loadingService.stop();
        },
        showAlert(msg) {
            const options = {
                icon: 'error',
                tittle: 'Oops...',
                text: msg,
                timer: 2500
            }
            this.$swal(options);
        },
    },
    watch:{
        'colaborador.idadministracao': function(newVal, oldVal){
            this.FilteredComuns = this.comuns.filter((item) => item.idadministracao == newVal)
        },
        
    },
    async mounted() {
        await this.loadRegional()
        await this.loadAdministracao()
        await this.loadComuns()
        this.loadcolaboradores()
    }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}

.tabela_hide{
    width: 92vw;
    transition: all 0.25s;
}

.tabela{
    width: 83vw;
    transition: all 0.25s;
}
.botoes{
    margin: 4px;
}
#observacoes{
    height: 15vw;
}
</style>

