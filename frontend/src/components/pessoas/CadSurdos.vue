<template>
<div class="surdos">
    <div class="surdo-admin" >
        <b-form v-if="isEdit">
            <input id="surdo-id" type="hidden" v-model="surdo.id" />
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Código:" label-for="codigo">
                        <b-form-input id="codigo" type="text"
                            v-model="surdo.codigo" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o código do surdo" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Nome:" label-for="surdo-name">
                        <b-form-input id="surdo-name" type="text"
                            v-model="surdo.nome" required
                            :readonly="mode === 'remove' || mode === 'vizualizar'"
                            placeholder="Informe o Nome do surdo" />
                    </b-form-group>
                </b-col>

                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Principal:" label-for="telefone1">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone1" type="text"
                            v-model="surdo.telefone1" required
                            placeholder="Informe o melhor número" />
                    </b-form-group>
                </b-col>
            </b-row>  

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Telefone Secundário:" 
                        label-for="telefone2">
                        <b-form-input :readonly="mode === 'vizualizar'" id="telefone2" type="text"
                            v-model="surdo.telefone2" required
                            placeholder="Telefone secundário" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Administração:" label-for="administracao">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="surdo-administracao" 
                        v-model="surdo.idadministracao" :options="administracoes" >
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Setor - Comum:" label-for="comum">
                        <b-form-select :disabled = "mode == 'vizualizar'" id="surdo-comum" 
                        v-model="surdo.idcomum" :options="FilteredComuns"> 
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>        

            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="4" sm="12">
                    <b-form-group label="Batizado?" 
                        label-for="Batizado">
                    <b-form-select :disabled = "mode == 'vizualizar'" id="surdo-batismo" v-model="surdo.batismo" :options="options"> 
                    </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row align-h="start" v-show="mode === 'save' || mode === 'vizualizar'">
                <b-col md="6" sm="24">
                    <b-form-group label="Observações:" label-for="observacoes">
                        <b-form-textarea :readonly="mode === 'vizualizar'" id="observacoes" type="text"
                            v-model="surdo.observacao" required
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
                <h3>Surdos Regional Brasília 
                    <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="isAdmin">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                    <span>&nbsp;</span>
                    <button type="button" @click="exportIDSelected" class="btn btn-outline-info btn-lg">
                        <i class="fa fa-id-card"></i>
                    </button>
                    <span>&nbsp;</span>
                    <BotaoDownloadExcel 
                        :dados="dadosPlanilha"
                        planilha="Surdos"
                        arquivo="Controle de Surdos de LIBRAS.xlsx"
                    />
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
                    ref="surdos"
                    @on-selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="surdos"
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
                            <b-button v-b-tooltip.hover title="Vizualizar" variant="success" @click="loadsurdo(data.row, 'vizualizar')" class="mr-2 botoes">
                                <i class="fa fa-eye"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Editar" variant="warning" @click="loadsurdo(data.row)" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button v-b-tooltip.hover title="Excluir" variant="danger" @click="loadsurdo(data.row, 'remove')" class="mr-2 botoes" v-if="isAdmin">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </span>

                        <span v-if="data.column.field == 'idadministracao'">
                            <span>{{findAdministracao(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'idcomum'">
                            <span>{{findComum(data.formattedRow[data.column.field])}}</span>
                        </span>
                        <span v-if="data.column.field == 'batismo'">
                            <span v-b-tooltip.hover :title="data.formattedRow[data.column.field]=='batismo' ? (data.row.batismo) : undefined ">{{data.formattedRow[data.column.field]== 'S' ? 'Sim' : 'Não'}}</span>
                        </span>
                        <span v-if="data.column.field != 'actions' && data.column.field != 'idadministracao' &&
                            data.column.field != 'idcomum' && data.column.field != 'batismo'">
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
import BotaoDownloadExcel from '../exportacao/BotaoDownloadExcel.vue'

export default {
    name: 'Surdos',
    components:{PageTitle, VueGoodTable, Cracha, BotaoDownloadExcel},
    computed: {
        dadosPlanilha() {
            const dados = []
            this.surdos.forEach((obj) => {
                let surdo = {}
                surdo['Id Surdo'] = obj.id;
                surdo['Código'] = obj.codigo
                surdo['Nome'] = obj.nome;
                surdo['Telefone Principal'] = obj.telefone1;
                surdo['Telefone Secundário'] = obj.telefone2;
                surdo['E-mail'] = obj.email;
                surdo['Batizado?'] = obj.batismo;
                surdo['Setor - Comum'] = obj.comum;
                surdo['ADM - Administração'] = obj.administracao;
                surdo['RA - Regional Administrativa'] = obj.regional;
                surdo['Observação'] = obj.observacao;
                dados.push(surdo);
            })
            return dados
        },
        ...mapState(['isAdmin', 'isMenuVisible'])
    } ,
    data: function() {
        return {
            options: [
                { value: null, text: 'Selecione uma opção' },
                { value: 'S',  text: 'Sim' },
                { value: 'N', text: 'Não' },
            ],
            mode: 'save',
            surdo: {},
            surdos: [],
            administracao: 0,
            administracoes: [],
            comuns: [],
            FilteredComuns: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                {label: 'Código',field: 'codigo',},
                {label: 'Batizado?',field: 'batismo',},
                {label: 'Nome',field: 'nome',},
                {label: 'Setor - Comum',field: 'comum', },
                {label: 'Telefone Principal',field: 'telefone1',},
                // {label: 'Telefone 2',field: 'telefone2',width: '150px'},
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
        findComum(value){
            if(this.comuns.length>0){
                let item = this.comuns.find(item=>item.value==value)
                return item.text
            }
        },
        loadSurdos() {
            const url = `${baseApiUrl}/surdoComcomum`
            axios.get(url).then(res => {
                this.surdos = res.data
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
            this.surdo = {}
            this.loadSurdos()
        },
        save() {
            console.log(this.surdo.oficializacao)
            delete this.surdo.vgt_id
            delete this.surdo.originalIndex
            delete this.surdo.comum
            delete this.surdo.administracao
            delete this.surdo.idregional
            delete this.surdo.regional
            const method = this.surdo.id ? 'put' : 'post'
            const id = this.surdo.id ? `/${this.surdo.id}` : ''
            axios[method](`${baseApiUrl}/surdo${id}`, this.surdo)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            delete this.surdo.vgt_id
            delete this.surdo.originalIndex
            const id = this.surdo.id
            axios.delete(`${baseApiUrl}/surdo/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadsurdo(surdo, mode = 'save') {
            this.mode = mode
            this.surdo = { ...surdo }
            this.isEdit = true
        },
        exportID(item, event) {
          this.$loadingService.start();

          event.stopPropagation();
          this.$refs['cracha'].setItens([{
              nome: item.nome,
              codigo: item.codigo,
              comum: this.findComum(item.idcomum),
              tipo: "surdo"
            }]
          );
        },

        exportIDSelected() {
            if(this.$refs['surdos'].selectedRows.length == 0){
                this.showAlert('selecione as linhas que deseja gerar o crachá');
                return
            } 
            this.$loadingService.start();
            this.$refs['cracha'].setItens(this.$refs['surdos'].selectedRows.map(item => {
                return {
                    nome: item.nome,
                    codigo: item.codigo,
                    comum: this.findComum(item.idcomum),
                    tipo: "surdo"
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
        'surdo.idadministracao': function(newVal, oldVal){
            this.FilteredComuns = this.comuns.filter((item) => item.idadministracao == newVal)
        },
    },
    async mounted() {
        //await this.loadRegional()
        await this.loadAdministracao()
        await this.loadComuns()
        this.loadSurdos()
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

