<template>
<div class="alunos">
    <div class="aluno-admin" >
        <b-form v-if="isEdit">
            <input id="aluno-id" type="hidden" v-model="aluno.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Código:" label-for="codigo">
                        <b-form-input id="codigo" type="text"
                            v-model="aluno.codigo" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o código do aluno" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome:" label-for="aluno-name">
                        <b-form-input id="aluno-name" type="text"
                            v-model="aluno.nome" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o Nome do aluno" />
                    </b-form-group>
                </b-col>

                <b-col md="4" sm="12">
                    <b-form-group label="E-mail:" label-for="aluno-email">
                        <b-form-input id="aluno-email" type="text"
                            v-model="aluno.email" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>  

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">

                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Principal:" label-for="telefone1">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone1" type="text"
                            v-model="aluno.telefone1" required
                            placeholder="Informe o melhor número" />
                    </b-form-group>
                </b-col>

                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Secundário:" 
                        label-for="telefone2">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone2" type="text"
                            v-model="aluno.telefone2" required
                            placeholder="Telefone secundário" />
                    </b-form-group>
                </b-col>
                
                <b-col md="4" sm="12">
                    <b-form-group label="Idade de Inicio do curso:" label-for="idadeInicioCurso">
                        <b-form-input id="idadeInicioCurso" type="text"
                            v-model="aluno.idadeInicioCurso" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Idade que o aluno começou o curso" />
                    </b-form-group>
                </b-col>
            </b-row>  

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Carta de Encaminhamento:" 
                        label-for="cartaEncaminhamento">
                    <b-form-select :disabled = "mode == 'vizualizar'" id="cartaEncaminhamento" 
                    v-model="aluno.cartaEncaminhamento" :options="optionsCartaEncaminhamento"> 
                    </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Status" 
                        label-for="Status">
                    <b-form-select :disabled = "mode == 'vizualizar'" id="status" 
                    v-model="aluno.status" :options="optionsStatus"> 
                    </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Surdo?" 
                        label-for="Surdo">
                    <b-form-select :disabled = "mode == 'vizualizar'" id="surdo" 
                    v-model="aluno.surdo" :options="optionsSurdo"> 
                    </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Administração:" label-for="administracao">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="aluno-administracao" 
                        v-model="aluno.idadministracao" :options="administracoes" >
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Setor - Comum:" label-for="comum">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="aluno-comum" 
                        v-model="aluno.idcomum" :options="FilteredComuns"> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Data de Nascimento:" label-for="dataNascimento">
                        <b-form-input :readonly="mode === 'vizualizar'" id="dataNascimento" type="date"
                            v-model="aluno.dataNascimento" required
                             />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Data de Batismo:" label-for="Data de Batisto">
                        <b-form-input :readonly="mode === 'vizualizar'" id="dataBatismo" type="date"
                            v-model="aluno.dataBatismo" required
                             />
                    </b-form-group>
                </b-col>
            </b-row>        
            
            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="6" sm="24">
                    <b-form-group label="Observações:" label-for="observacoes">
                        <b-form-textarea :readonly="mode === 'vizualizar'" id="observacoes" type="text"
                            v-model="aluno.observacao" required
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
                <h3>Grupo de Estudos de LIBRAS - Alvorada
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
                    ref="alunos"
                    @on-selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="alunos"
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
                            <b-button v-b-tooltip.hover title="Vizualizar" variant="success" @click="loadaluno(data.row, 'vizualizar')" class="mr-2 botoes">
                                <i class="fa fa-eye"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Editar" variant="warning" @click="loadaluno(data.row)" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Excluir" variant="danger" @click="loadaluno(data.row, 'remove')" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </span>
                        
                        <span v-if="data.column.field == 'idadministracao'">
                            <span>{{findAdministracao(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'idcomum'">
                            <span>{{findComum(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'surdo'">
                            <span v-b-tooltip.hover :title="data.formattedRow[data.column.field]=='surdo' ? (data.row.surdo) : undefined ">{{data.formattedRow[data.column.field]== 'S' ? 'Sim' : 'Não'}}</span>
                        </span>
                        <span v-if="data.column.field == 'dataNascimento'">
                            <span>{{dateFormat(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'dataBatismo'">
                            <span>{{dateFormat(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field != 'actions' && data.column.field != 'idadministracao' &&
                            data.column.field != 'idcomum' && data.column.field != 'dataNascimento' && data.column.field != 'surdo' && data.column.field != 'dataBatismo'">
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
import PageTitle from '../../tamplate/PageTitle.vue'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Cracha from '../../tamplate/Cracha.vue'
import { mapState } from 'vuex'
    
export default {
    name: 'alunos',
    components:{PageTitle, VueGoodTable, Cracha},
    computed:mapState(['isAdmin', 'isMenuVisible']),
    data: function() {
        return {
            optionsSurdo: [
                { value: null, text: 'Selecione uma opção' },
                { value: 'S',  text: 'Sim' },
                { value: 'N', text: 'Não' },
            ],
            optionsCartaEncaminhamento: [
                { value: null, text: 'Selecione uma opção' },
                { value: 'Pendente',  text: 'Pendente' },
                { value: 'Assinada', text: 'Assinada' },
                { value: 'N/A', text: 'N/A' },
            ],
            optionsStatus: [
                { value: null, text: 'Selecione uma opção' },
                { value: 'Em Andamento',  text: 'Em Andamento' },
                { value: 'Acompanhando', text: 'Acompanhando' },
                { value: 'Aprovado', text: 'Aprovado' },
                { value: 'Reteste', text: 'Reteste' },
                { value: 'Desistente', text: 'Desistente' },
                { value: 'N/A', text: 'N/A' },
            ],
            mode: 'save',
            aluno: {},
            alunos: [],
            administracao: 0,
            administracoes: [],
            comuns: [],
            FilteredComuns: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'Código',field: 'codigo',},
                {label: 'Nome',field: 'nome',},
                {label: 'Telefone Principal',field: 'telefone1',},
                {label: 'Status',field: 'status',},
                {label: 'Setor - Comum',field: 'comum', },
                // {label: 'Telefone 2',field: 'telefone2',width: '150px'},
                {label: 'Administração',field: 'idadministracao',},
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
        loadalunos() {
            
            const url = `${baseApiUrl}/GELAlvoradaComcomum`
            axios.get(url).then(res => {
                this.alunos = res.data
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
            this.aluno = {}
            this.loadalunos()
        },
        save() {
            delete this.aluno.vgt_id
            delete this.aluno.originalIndex
            delete this.aluno.comum
            const method = this.aluno.id ? 'put' : 'post'
            const id = this.aluno.id ? `/${this.aluno.id}` : ''
            axios[method](`${baseApiUrl}/GELAlvorada${id}`, this.aluno)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.aluno.vgt_id
            delete this.aluno.originalIndex
            const id = this.aluno.id
            axios.delete(`${baseApiUrl}/GELAlvorada/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadaluno(aluno, mode = 'save') {
            debugger

            this.mode = mode
            this.aluno = { ...aluno }
            let arr = this.aluno.dataNascimento.split('-')
            this.aluno.dataNascimento = arr[0] +'-'+arr[1]+'-'+arr[2].substring(0, 2);
            let arr2 = this.aluno.dataBatismo.split('-')
            this.aluno.dataBatismo = arr2[0] +'-'+arr2[1]+'-'+arr2[2].substring(0, 2);
            this.isEdit = true
        },
      
        exportID(item, event) {
          this.$loadingService.start();

          event.stopPropagation();
          this.$refs['cracha'].setItens([{
              nome: item.nome,
              codigo: item.codigo,
              comum: this.findComum(item.idcomum),
              tipo: "aluno"
            }]
          );
        },

        exportIDSelected() {
            if(this.$refs['alunos'].selectedRows.length == 0){
                this.showAlert('selecione as linhas que deseja gerar o crachá');
                return
            } 
            this.$loadingService.start();
            this.$refs['cracha'].setItens(this.$refs['alunos'].selectedRows.map(item => {
                return {
                    nome: item.nome,
                    codigo: item.codigo,
                    comum: this.findComum(item.idcomum),
                    tipo: "aluno"
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
        'aluno.idadministracao': function(newVal, oldVal){
            this.FilteredComuns = this.comuns.filter((item) => item.idadministracao == newVal)
        },
        
    },
    async mounted() {
        //await this.loadRegional()
        await this.loadAdministracao()
        await this.loadComuns()
        this.loadalunos()
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

