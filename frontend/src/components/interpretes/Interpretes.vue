<template>
<div class="interpretes">
    <PageTitle icon="fa fa-users" main="Intérpretes de Libras - CCB"
            sub="Controle de Intérpretes de LIBRAS" />
    <div class="interprete-admin" >
        <b-form v-if="isEdit">
            <input id="interprete-id" type="hidden" v-model="interprete.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Código:" label-for="codigo">
                        <b-form-input id="codigo" type="text"
                            v-model="interprete.codigo" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o código do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome:" label-for="interprete-name">
                        <b-form-input id="interprete-name" type="text"
                            v-model="interprete.nome" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="E-mail:" label-for="interprete-email">
                        <b-form-input id="interprete-email" type="text"
                            v-model="interprete.email" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Principal:" label-for="telefone1">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone1" type="text"
                            v-model="interprete.telefone1" required
                            placeholder="Informe o melhor número..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Secundário:" 
                        label-for="telefone2">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone2" type="text"
                            v-model="interprete.telefone2" required
                            placeholder="Telefone secundário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Status:" 
                        label-for="Status">
                    <b-form-select :disabled = "mode == 'vizualizar'" id="interprete-status" v-model="interprete.status" :options="options"> 
                    </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Administração:" label-for="administracao">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="interprete-administracao" 
                        v-model="interprete.idadministracao" :options="administracoes" ><!--@change="setComum(administracao,$event)"--> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Setor - Comum:" label-for="comum">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="interprete-comum" 
                        v-model="interprete.idcomum" :options="FilteredComuns"> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12" v-if="interprete.status == 'diversos'">
                    <b-form-group label="Justificativa Status Diverso:" label-for="statusJustificativa">
                        <b-form-input :readonly="mode === 'vizualizar'" id="statusJustificativa" type="text"
                            v-model="interprete.statusJustificativa" required
                             />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Oficialização:" label-for="oficializacao">
                        <b-form-input :readonly="mode === 'vizualizar'" id="oficializacao" type="date"
                            v-model="interprete.oficializacao" required
                             />
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
                <h3>Intérpretes Regional Brasília 
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
                    ref="interpretes"
                    @on-selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="interpretes"
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
                            <b-button v-b-tooltip.hover title="Vizualizar" variant="success" @click="loadinterprete(data.row, 'vizualizar')" class="mr-2 botoes">
                                <i class="fa fa-eye"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Editar" variant="warning" @click="loadinterprete(data.row)" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Excluir" variant="danger" @click="loadinterprete(data.row, 'remove')" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </span>
                        
                        <span v-if="data.column.field == 'idadministracao'">
                            <span>{{findAdministracao(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <!-- <span v-if="data.column.field == 'idcomum'">
                            <span>{{data.formattedRow[data.column.field]}}</span>
                        </span> -->
                        <span v-if="data.column.field == 'oficializacao'">
                            <span>{{dateFormat(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'status'">
                            <span v-b-tooltip.hover :title="data.formattedRow[data.column.field]=='diversos' ? (data.row.statusJustificativa) : undefined ">{{data.formattedRow[data.column.field]!='Habilitado' ? (data.formattedRow[data.column.field]=='nao_hab' ? 'Não Habilitado' : 'Diversos') : data.formattedRow[data.column.field]}}</span>
                        </span>
                        <span v-if="data.column.field != 'actions' && data.column.field != 'idadministracao' &&
                            data.column.field != 'idcomum' && data.column.field != 'oficializacao' && data.column.field != 'status'">
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
    name: 'Interpretes',
    components:{PageTitle, VueGoodTable, Cracha},
    computed:mapState(['isAdmin', 'isMenuVisible']),
    data: function() {
        return {
            options: [
                { value: null, text: 'Selecione o Status' },
                { value: 'Habilitado', text: 'Habilitado' },
                { value: 'nao_hab', text: 'Não Habilitado' },
                { value: 'diversos', text: 'Diverso'}
            ],
            mode: 'save',
            interprete: {},
            interpretes: [],
            administracao: 0,
            administracoes: [],
            comuns: [],
            FilteredComuns: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'Código',field: 'codigo',},
                {label: 'Status',field: 'status',},
                {label: 'Nome',field: 'nome', width: '150px'},
                // {label: 'Administração',field: 'idadministracao',},
                {label: 'Setor - Comum',field: 'comum', },
                {label: 'Telefone Principal',field: 'telefone1',},
                // {label: 'Telefone 2',field: 'telefone2',width: '150px'},
                // {label: 'E-mail',field: 'email',},
                // {label: 'Oficialização',field: 'oficializacao', },
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
        findComum(value){
            if(this.comuns.length>0){
                let item = this.comuns.find(item=>item.value==value)
                return item.text
            }  
        },
        loadinterpretes() {
            
            const url = `${baseApiUrl}/interpreteComComum`
            axios.get(url).then(res => {
                this.interpretes = res.data
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
            this.interprete = {}
            this.loadinterpretes()
        },
        save() {
            console.log(this.interprete.oficializacao)
            delete this.interprete.vgt_id
            delete this.interprete.originalIndex
            delete this.interprete.comum
            // typeof this.interprete.telefone1 == 'string' ? this.interprete.telefone1 = parseInt(this.interprete.telefone1) : this.interprete.telefone1;
            // (!this.interprete.telefone2 || this.interprete.telefone2.length == 0) ? delete this.interprete.telefone2 : this.interprete.telefone2
            const method = this.interprete.id ? 'put' : 'post'
            const id = this.interprete.id ? `/${this.interprete.id}` : ''
            axios[method](`${baseApiUrl}/interprete${id}`, this.interprete)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.interprete.vgt_id
            delete this.interprete.originalIndex
            const id = this.interprete.id
            axios.delete(`${baseApiUrl}/interprete/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadinterprete(interprete, mode = 'save') {
            debugger

            this.mode = mode
            this.interprete = { ...interprete }
            let arr = this.interprete.oficializacao.split('-')
            this.interprete.oficializacao = arr[0] +'-'+arr[1]+'-'+arr[2].substring(0, 2);
            this.isEdit = true
        },
      
        exportID(item, event) {
          this.$loadingService.start();

          event.stopPropagation();
          this.$refs['cracha'].setItens([{
              nome: item.nome,
              codigo: item.codigo,
              comum: this.findComum(item.idcomum),
              tipo: "interprete"
            }]
          );
        },

        exportIDSelected() {
            if(this.$refs['interpretes'].selectedRows.length == 0){
                this.showAlert('selecione as linhas que deseja gerar o crachá');
                return
            } 
            this.$loadingService.start();
            this.$refs['cracha'].setItens(this.$refs['interpretes'].selectedRows.map(item => {
                return {
                    nome: item.nome,
                    codigo: item.codigo,
                    comum: this.findComum(item.idcomum),
                    tipo: "interprete"
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
        'interprete.idadministracao': function(newVal, oldVal){
            this.FilteredComuns = this.comuns.filter((item) => item.idadministracao == newVal)
        },
        
    },
    async mounted() {
        await this.loadAdministracao()
        await this.loadComuns()
        this.loadinterpretes()
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
</style>
