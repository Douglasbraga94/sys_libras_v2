<template>
<div class="interpretes">
    <PageTitle icon="fa fa-users" main="Intérpretes de Libras - CCB"
            sub="Controle de intérpretes de LIBRAS" />
    <div class="interprete-admin" >
        <b-form v-if="isEdit">
            <input id="interprete-id" type="hidden" v-model="interprete.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Código:" label-for="codigo">
                        <b-form-input id="codigo" type="text"
                            v-model="interprete.codigo" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o código do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome:" label-for="interprete-name">
                        <b-form-input id="interprete-name" type="text"
                            v-model="interprete.nome" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="E-mail:" label-for="interprete-email">
                        <b-form-input id="interprete-email" type="text"
                            v-model="interprete.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row align-h="start" v-show="mode === 'save'">
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Principal:" label-for="telefone1">
                        <b-form-input id="telefone1" type="number"
                            v-model="interprete.telefone1" required
                            placeholder="Informe o melhor número..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Secundário:" 
                        label-for="telefone2">
                        <b-form-input id="telefone2" type="number"
                            v-model="interprete.telefone2" required
                            placeholder="Telefone secundário..." />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <label>Status:</label>
                    <b-form-select id="interprete-status" v-show="mode === 'save'" v-model="interprete.status" :options="options"> 
                    </b-form-select>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save'">
                <b-col md="4" sm="12">
                    <label>Administração:</label>
                    <b-form-select id="interprete-administracao" v-show="mode === 'save'" 
                    v-model="interprete.idadministracao" :options="administracoes" ><!--@change="setComum(administracao,$event)"--> 
                    </b-form-select>
                </b-col>
                <b-col md="4" sm="12">
                    <label>Comum:</label>
                    <b-form-select id="interprete-comum" v-show="mode === 'save'" 
                    v-model="interprete.idcomum" :options="FilteredComuns"> 
                    </b-form-select>
                </b-col>
                <b-col md="4" sm="12" v-if="interprete.status == 'diversos'">
                    <b-form-group label="Justificativa Status Diverso:" label-for="statusJustificativa">
                        <b-form-input id="statusJustificativa" type="text"
                            v-model="interprete.statusJustificativa" required
                             />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save'">
                <b-col md="4" sm="12">
                    <b-form-group label="Oficialização:" label-for="oficializacao">
                        <b-form-input id="oficializacao" type="date"
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
        <div v-show="!isEdit">
            <div class="card-header">
                <h3>Intérpretes Regional Brasília 
                    <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg">
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
                        <b-button variant="primary" @click="exportID(data.row, $event)" class="mr-2">
                            <i class="fa fa-id-card"></i>
                        </b-button>
                        <b-button variant="warning" @click="loadinterprete(data.row)" class="mr-2">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button variant="danger" @click="loadinterprete(data.row, 'remove')">
                            <i class="fa fa-trash"></i>
                        </b-button>
                    </span>
                    
                    <span v-if="data.column.field == 'idadministracao'">
                        <span>{{findAdministracao(data.formattedRow[data.column.field])}}</span>
                    </span>
                    <span v-if="data.column.field == 'idcomum'">
                        <span>{{findComum(data.formattedRow[data.column.field])}}</span>
                    </span>
                    <span v-if="data.column.field == 'oficializacao'">
                        <span>{{dateFormat(data.formattedRow[data.column.field])}}</span>
                    </span>
                    <span v-if="data.column.field == 'status'">
                        <span>{{data.formattedRow[data.column.field]!='Habilitado' ? (data.formattedRow[data.column.field]=='nao_hab' ? 'Não Habilitado' : 'Diversos') : data.formattedRow[data.column.field]}}</span>
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

export default {
    name: 'Interpretes',
    components:{PageTitle, VueGoodTable, Cracha},
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
                {label: 'Nome',field: 'nome',},
                {label: 'Administração',field: 'idadministracao',},
                {label: 'Comum',field: 'idcomum',},
                {label: 'telefone1',field: 'telefone1',},
                {label: 'telefone2',field: 'telefone2',},
                {label: 'email',field: 'email',},
                {label: 'oficializacao',field: 'oficializacao', },
                {label: 'Ações',field: 'actions',},
            ],
        }
    },
    methods: {
        print(){
            /**
             * A variavel 'this.$refs['interpretes'].selectedRows'
             * Contém as linhas selecionadas na tabela
             */
            alert(JSON.stringify(this.$refs['interpretes'].selectedRows))
        },
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
            const url = `${baseApiUrl}/interprete`
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
            delete this.interprete.vgt_id
            delete this.interprete.originalIndex
            typeof this.interprete.telefone1 == 'string' ? this.interprete.telefone1 = parseInt(this.interprete.telefone1) : this.interprete.telefone1;
            (!this.interprete.telefone2 || this.interprete.telefone2.length == 0) ? delete this.interprete.telefone2 : this.interprete.telefone2
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
            this.mode = mode
            this.interprete = { ...interprete }
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
                timer: 1500
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
</style>

</style>
