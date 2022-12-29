<template>
    <div class="pessoa">
        <div class="pessoa-admin">
            <b-form v-if="isEdit">
                <form-wizard :title="pessoa.nome" :subtitle="pessoa.papel.nome" nextButtonText="Próximo"
                    backButtonText="Voltar" finishButtonText="Finalizar" color="#004b97" shape="circle">
                    <tab-content title="Dados Cadastrais">
                        <b-form-row>
                            <b-col md="12" sm="12">
                                <b-card bg-variant="light">
                                    <b-form-group label="Dados Cadastrais" label-size="lg"
                                        label-class="font-weight-bold pt-0" class="mb-0">
                                        <b-form-row>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="codigo-grupo" label="Código:" label-for="codigo">
                                                    <b-form-input id="codigo" type="text" v-model="pessoa.codigo"
                                                        :readonly="true"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="nome-grupo" label="Nome:" label-for="nome">
                                                    <b-form-input id="nome" type="text" v-model.trim="pessoa.nome"
                                                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="email-grupo" label="E-mail:" label-for="email">
                                                    <b-form-input id="email" type="text" v-model.trim="pessoa.email"
                                                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                        <b-form-row>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="telefone1-grupo" label="Telefone Principal:"
                                                    label-for="telefone1">
                                                    <b-form-input id="telefone1" type="text"
                                                        v-model.trim="pessoa.telefone1"
                                                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="telefone2-grupo" label="Telefone Secundário:"
                                                    label-for="telefone2">
                                                    <b-form-input id="telefone2" type="text"
                                                        v-model.trim="pessoa.telefone2"
                                                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="data-nascimento-grupo" label="Data de Nascimento:"
                                                    label-for="data-nascimento">
                                                    <b-form-input id="data-nascimento" type="date"
                                                        :readonly="mode === 'view' || mode === 'remove'"
                                                        v-model.trim="pessoa.dataNascimento"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                        <b-form-row>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="batizado-grupo" label="Batizado:"
                                                    label-for="batizado">
                                                    <b-form-radio-group id="batizado" name="batizado"
                                                        v-model="pessoa.batizado"
                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                        <b-form-radio value="true">Sim</b-form-radio>
                                                        <b-form-radio value="false">Não</b-form-radio>
                                                    </b-form-radio-group>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="data-batismo-grupo" label="Data de Batismo:"
                                                    label-for="data-batismo">
                                                    <b-form-input id="data-batismo" type="date"
                                                        v-model.trim="pessoa.dataBatismo"
                                                        :readonly="mode === 'view' || mode === 'remove'"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="4" sm="12">
                                                <b-form-group id="curso-externo-libras-grupo"
                                                    label="Curso Externo de Libras:" label-for="curso-externo-libras">
                                                    <b-form-radio-group id="curso-externo-libras"
                                                        name="curso-externo-libras" v-model="pessoa.cursoExternoLibras"
                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                        <b-form-radio value="true">Sim</b-form-radio>
                                                        <b-form-radio value="false">Não</b-form-radio>
                                                    </b-form-radio-group>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                        <b-form-row>
                                            <b-col md="12" sm="12">
                                                <b-card bg-variant="light">
                                                    <b-form-group id="comum-grupo" label="Comum Congregação"
                                                        label-class="font-weight-bold pt-0" class="mb-0">
                                                        <b-form-row>
                                                            <b-col>
                                                                <b-form-group id="estado-grupo" label="Estado:"
                                                                    label-for="estado">
                                                                    <b-form-select id="estado"
                                                                        v-model="pessoa.localidade.codigoEstado"
                                                                        :options="optionsEstados"
                                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                                    </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col>
                                                                <b-form-group id="cidade-grupo" label="Cidade:"
                                                                    label-for="cidade">
                                                                    <b-form-select id="cidade"
                                                                        v-model="pessoa.localidade.codigoCidade"
                                                                        :options="optionsCidades"
                                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                                    </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col>
                                                                <b-form-group id="localidade-grupo" label="Localidade:"
                                                                    label-for="localidade">
                                                                    <b-form-select id="localidade"
                                                                        v-model="pessoa.localidade.codigo"
                                                                        :options="optionsLocalidades"
                                                                        :disabled="mode === 'view' || mode === 'remove'"></b-form-select>
                                                                </b-form-group>
                                                                <b-tooltip target="localidade-grupo" placement="top"
                                                                    triggers="hover">
                                                                    <strong>{{ localidade.ADM }}</strong>
                                                                    <span v-if="localidade.central"><br>{{
                                                                            localidade.central
                                                                    }}</span>
                                                                    <span v-if="localidade.endereco"><br>{{
                                                                            localidade.endereco
                                                                    }}</span>
                                                                    <span v-if="localidade.complemento"><br>{{
                                                                            localidade.complemento
                                                                    }}</span>
                                                                    <span v-if="localidade.diasCultosConcatenado"><br>{{
                                                                            localidade.diasCultosConcatenado
                                                                    }}</span>
                                                                </b-tooltip>
                                                            </b-col>
                                                        </b-form-row>
                                                    </b-form-group>
                                                </b-card>
                                            </b-col>
                                        </b-form-row>
                                        <b-form-row>
                                            <b-col md="12" sm="12">
                                                <b-form-group id="observacoes-grupo" label="Observações:"
                                                    label-for="observacoes">
                                                    <b-form-textarea id="observacoes" placeholder="Observações Gerais"
                                                        type="text" v-model.trim="pessoa.observacao"
                                                        :readonly="mode === 'view' || mode === 'remove'"
                                                        class="observacoes">
                                                    </b-form-textarea>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-form-row>
                    </tab-content>
                    <tab-content title="Papéis">
                        <b-form-row>
                            <b-col md="12" sm="12">
                                <b-card bg-variant="light">
                                    <b-form-group label="Selecione os Papéis da Pessoa" label-size="lg"
                                        label-class="font-weight-bold pt-0" class="mb-0">
                                        <b-form-checkbox-group id="papeis-grupo" v-model="codigosPapeisSelected"
                                            :options="optionsPapeis" name="papeis-grupo" stacked
                                            @change="setTabsWizard($event)"
                                            :disabled="mode === 'view' || mode === 'remove'"></b-form-checkbox-group>
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-form-row>
                    </tab-content>
                    <tab-content title="Aluno" v-if="showTabAluno">
                        <b-form-row>
                            <b-col md="12" sm="12">
                                <b-card bg-variant="light">
                                    <b-form-group id="aluno-grupo" label="Dados do Aluno" label-size="lg"
                                        label-class="font-weight-bold pt-0" class="mb-0">
                                        <b-form-row>
                                            <b-col md="12" sm="12">
                                                <AlunoForm v-for="turma in pessoa.turmas" :key="turma.codigo"
                                                    :turma="turma" :cursos="cursos" :turmas="turmas"
                                                    :situacoesTurma="situacoesTurma"
                                                    :encaminhamentosCarta="encaminhamentosCarta" :mode="mode" 
                                                    :pessoa = "dadosCadastrais"/>
                                            </b-col>
                                        </b-form-row>
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-form-row>
                    </tab-content>
                    <tab-content title="Colaborador" v-if="showTabColaborador">
                        <b-form-row>
                            <b-col md="12" sm="12">
                                <b-card bg-variant="light">
                                    <b-form-group label="Dados do Colaborador" label-size="lg"
                                        label-class="font-weight-bold pt-0" class="mb-0">
                                        <b-form-row>
                                            <b-col md="6" sm="12">
                                                <b-form-group id="colaborador-competencia-grupo" label="Competência:"
                                                    label-for="colaborador-competencia">
                                                    <b-form-select id="colaborador-competencia"
                                                        v-model="pessoa.colaborador.competencia.codigo"
                                                        :options="optionsCompetenciasColaborador"
                                                        name="colaborador-competencia-grupo"
                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                    </b-form-select>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6" sm="12"></b-col>
                                        </b-form-row>
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-form-row>
                    </tab-content>
                    <tab-content title="Intérprete" v-if="showTabInterprete">
                        <b-form-row>
                            <b-col md="12" sm="12">
                                <b-card bg-variant="light">
                                    <b-form-group label="Dados do Intérprete" label-size="lg"
                                        label-class="font-weight-bold pt-0" class="mb-0">
                                        <b-form-row>
                                            <b-col md="6" sm="12">
                                                <b-form-group id="interprete-situacao-grupo" label="Situação:"
                                                    label-for="interprete-situacao"
                                                    v-b-tooltip.hover.top="situacaoInterpreteSelected.descricao">
                                                    <b-form-select id="interprete-situacao"
                                                        v-model="pessoa.interprete.situacao.codigo"
                                                        :options="optionsSituacoesInterprete"
                                                        name="interprete-situacao-grupo"
                                                        :disabled="mode === 'view' || mode === 'remove'">
                                                    </b-form-select>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6" sm="12">
                                                <b-form-group id="data-oficializacao-grupo"
                                                    label="Data de Oficialização:" label-for="data-oficializacao">
                                                    <b-form-input id="data-oficializacao" type="date"
                                                        :readonly="mode === 'view' || mode === 'remove'"
                                                        v-model.trim="pessoa.interprete.dataOficializacao"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                        <b-form-row>
                                            <b-col md="12" sm="12">
                                                <b-form-group v-if="showJustificativa"
                                                    id="interprete-situacao-justificativa-grupo" label="Justificativa:"
                                                    label-for="interprete-situacao-justificativa">
                                                    <b-form-textarea id="interprete-situacao-justificativa"
                                                        placeholder="Justificativa" type="text"
                                                        v-model.trim="pessoa.interprete.justificativa"
                                                        :readonly="mode === 'view' || mode === 'remove'"
                                                        class="observacoes" required>
                                                    </b-form-textarea>
                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-form-row>
                    </tab-content>
                </form-wizard>
                <b-row>
                    <b-col xs="12">
                        <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    </b-col>
                </b-row>
            </b-form>
            <hr>
            <div v-show="!isEdit" :class="{ 'tabela_hide': !isMenuVisible, 'tabela': isMenuVisible }">
                <div class="card-header">
                    <h3>Pessoas Regional Brasília
                        <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="isAdmin">
                            <i class="fa fa-plus-circle"></i>
                        </button>
                        <span>&nbsp;</span>
                        <button type="button" @click="exportIDSelected" class="btn btn-outline-info btn-lg">
                            <i class="fa fa-id-card"></i>
                        </button>
                        <span>&nbsp;</span>
                        <BotaoDownloadExcel :dados="dadosPlanilha" planilha="Pessoas"
                            arquivo="Controle de Pessoas de LIBRAS.xlsx" />
                    </h3>
                </div>
                <div>
                    <Cracha ref="cracha" v-on:complete="onCompleteExport"></Cracha>
                    <vue-good-table :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 5,
                        position: 'bottom',
                        perPageDropdown: [3, 5, 10],
                        dropdownAllowAll: true,
                        setCurrentPage: 1,
                        jumpFirstOrLast: true,
                        firstLabel: 'Primeira',
                        lastLabel: 'Última',
                        nextLabel: 'Próxima',
                        prevLabel: 'Anterior',
                        rowsPerPageLabel: 'Linhas por página',
                        ofLabel: 'de',
                        pageLabel: 'Página', // for 'pages' mode
                        allLabel: 'Todas',
                    }" ref="pessoas" @on-selected-rows-change="selectionChanged" :columns="columns" :rows="pessoas"
                        :select-options="{
                            enabled: true,
                            selectionText: 'Linhas selecionadas',
                            disableSelectInfo: true
                        }" :search-options="{ enabled: true, placeholder: 'Procurar...', }"
                        styleClass="vgt-table striped hover">

                        <template slot="table-row" slot-scope="data">
                            <span v-if="data.column.field == 'actions'">
                                <b-button v-b-tooltip.hover title="Imprimir Crachá" variant="primary"
                                    @click="exportID(data.row, $event)" class="mr-2 botoes">
                                    <i class="fa fa-id-card"></i>
                                </b-button>
                                <b-button v-b-tooltip.hover title="Vizualizar" variant="success"
                                    @click="loadPessoa(data.row, 'view')" class="mr-2 botoes">
                                    <i class="fa fa-eye"></i>
                                </b-button>
                                <b-button v-b-tooltip.hover title="Editar" variant="warning"
                                    @click="loadPessoa(data.row)" class="mr-2 botoes" v-if="isAdmin">
                                    <i class="fa fa-pencil"></i>
                                </b-button>
                                <b-button v-b-tooltip.hover title="Excluir" variant="danger"
                                    @click="loadPessoa(data.row, 'remove')" class="mr-2 botoes" v-if="isAdmin">
                                    <i class="fa fa-trash"></i>
                                </b-button>
                            </span>

                            <!-- <span v-if="data.column.field == 'batizado'">
                                <span v-b-tooltip.hover :title="data.formattedRow[data.column.field]=='batizado' ? (data.row.batizado) : undefined ">{{isBaptized(data.formattedRow[data.column.field])}}</span>
                            </span> -->
                            <span v-else>
                                {{ data.formattedRow[data.column.field] }}
                            </span>
                        </template>

                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { PAPEL, INTERPRETE_SITUACAO, CURSO } from '@/enums'
import moment from 'moment';
import { VueGoodTable } from 'vue-good-table'
import Cracha from '../template/Cracha.vue'
import { mapState } from 'vuex'
import BotaoDownloadExcel from '../exportacao/BotaoDownloadExcel.vue'
import AlunoForm from './AlunoForm.vue'

export default {
    name: 'PessoaWizard',
    components: { FormWizard, TabContent, VueGoodTable, Cracha, BotaoDownloadExcel, AlunoForm },
    data() {
        return {
            estados: [],
            cidades: [],
            localidades: [],
            localidade: {},
            papeis: [],
            pessoas: [],
            pessoa: {},
            cursos: [],
            turmas: [],
            situacoesTurma: [],
            encaminhamentosCarta: [],
            situacoesInterprete: [],
            competenciasColaborador: [],
            optionsEstados: [],
            optionsCidades: [],
            optionsLocalidades: [],
            optionsPapeis: [],
            optionsSituacoesInterprete: [],
            optionsCompetenciasColaborador: [],
            isEdit: false,
            selectionChanged: [],
            columns: [
                { label: 'Código', field: 'codigo', },
                // { label: 'Batizado?', field: 'batizado',},
                { label: 'Nome', field: 'nome', },
                { label: 'Papel', field: 'papel.nome' },
                { label: 'Comum Congregação', field: 'comum' },
                { label: 'Telefone Principal', field: 'telefone1', },
                { label: 'Ações', field: 'actions', },
            ],
        }
    },
    computed: {
        dadosPlanilha() {
            const dados = []
            // this.surdos.forEach((obj) => {
            //     let surdo = {}
            //     surdo['Id Surdo'] = obj.id;
            //     surdo['Código'] = obj.codigo
            //     surdo['Nome'] = obj.nome;
            //     surdo['Telefone Principal'] = obj.telefone1;
            //     surdo['Telefone Secundário'] = obj.telefone2;
            //     surdo['E-mail'] = obj.email;
            //     surdo['Batizado?'] = obj.batismo;
            //     surdo['Setor - Comum'] = obj.comum;
            //     surdo['ADM - Administração'] = obj.administracao;
            //     surdo['RA - Regional Administrativa'] = obj.regional;
            //     surdo['Observação'] = obj.observacao;
            //     dados.push(surdo);
            // })
            return dados
        },
        codigosPapeisSelected() {
            let codigosPapeisFiltered = []
            if (this.pessoa.papeis) {
                this.pessoa.papeis.forEach(papel => codigosPapeisFiltered.push(papel.codigo))
            }
            return codigosPapeisFiltered
        },
        showTabAluno() {
            return this.codigosPapeisSelected.includes(PAPEL.ALUNO)
        },
        showTabColaborador() {
            return this.codigosPapeisSelected.includes(PAPEL.COLABORADOR)
        },
        showTabInterprete() {
            return this.codigosPapeisSelected.includes(PAPEL.INTERPRETE)
        },
        situacaoInterpreteSelected() {
            if (this.pessoa.interprete)
                return this.situacoesInterprete.filter(situacao => situacao.codigo == this.pessoa.interprete.situacao.codigo)[0]
        },
        showJustificativa() {
            if (this.pessoa.interprete)
                return this.pessoa.interprete.situacao.codigo == INTERPRETE_SITUACAO.DIVERSOS
        },
        dadosCadastrais() {
            if (this.pessoa) {
                return {
                    nome: this.pessoa.nome,
                    dataNascimento: this.pessoa.dataNascimento,
                    dataBatismo: this.pessoa.dataBatismo,
                    batizado: this.pessoa.batizado,
                    cursoExternoLibras: this.pessoa.cursoExternoLibras,
                    ativo: this.pessoa.ativo
                }
            }

        },
        ...mapState(['isAdmin', 'isMenuVisible'])
    },
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
        dateFormat: function (date) {
            return moment(String(date)).format('DD/MM/YYYY');
        },
        reset() {
            this.isEdit = false
            this.mode = 'save'
            this.pessoa = {}
            this.loadPessoas()
        },
        exportID(item, event) {
            this.$loadingService.start();

            event.stopPropagation();
            this.$refs['cracha'].setItens([{
                nome: item.nome,
                codigo: item.codigoExibicao,
                comum: item.localidade,
                tipo: item.papel.nome.toLowerCase()
            }]
            );
        },

        exportIDSelected() {
            if (this.$refs['pessoas'].selectedRows.length == 0) {
                this.showAlert('selecione as linhas que deseja gerar o crachá');
                return
            }
            this.$loadingService.start();
            this.$refs['cracha'].setItens(this.$refs['pessoas'].selectedRows.map(item => {
                return {
                    nome: item.nome,
                    codigo: item.codigoExibicao,
                    comum: item.localidade,
                    tipo: item.papel.nome.toLowerCase()
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

        loadPessoa(pessoa, mode = 'save') {
            this.mode = mode
            this.pessoa = { ...pessoa }
            this.isEdit = true
        },

        async loadPessoas() {
            const url = `${baseApiUrl}/pessoa`
            await axios.get(url).then(res => {
                this.pessoas = res.data
                this.pessoas.forEach(pessoa => {
                    pessoa.ehBatizado = this.isBaptized(pessoa.batizado)
                    pessoa.comum = this.setComum(pessoa.localidade)
                    pessoa.codigoExibicao = pessoa.codigo.toString().padStart(6, '0')
                })
            })
        },
        async loadEstados() {
            const url = `${baseApiUrl}/estado`
            await axios.get(url).then(res => {
                this.estados = res.data
                this.fillOptionsEstados()
            })

        },
        async loadCidades() {
            const url = `${baseApiUrl}/cidade`
            await axios.get(url).then(res => {
                this.cidades = res.data
            })
        },
        async loadLocalidades() {
            const url = `${baseApiUrl}/localidade`
            await axios.get(url).then(res => {
                this.localidades = res.data
            })

        },
        async loadPapeis() {
            const url = `${baseApiUrl}/papel`
            await axios.get(url).then(res => {
                this.papeis = res.data.filter(papel => papel.ativo == true)
                this.fillOptionsPapeis()
            })

        },
        async loadSituacoesInterprete() {
            const url = `${baseApiUrl}/interpreteSituacao`
            await axios.get(url).then(res => {
                this.situacoesInterprete = res.data
                this.fillOptionsSituacoesInterprete()
            })
        },
        async loadCompetenciasColaborador() {
            const url = `${baseApiUrl}/colaboradorCompetencia`
            await axios.get(url).then(res => {
                this.competenciasColaborador = res.data
                this.fillOptionsCompetenciasColaborador()
            })
        },

        async loadCursos() {
            const url = `${baseApiUrl}/curso`
            await axios.get(url).then(res => {
                this.cursos = res.data
            })
        },
        async loadTurmas() {
            const url = `${baseApiUrl}/turma`
            await axios.get(url).then(res => {
                this.turmas = res.data
            })
        },
        async loadSituacoesTurma() {
            const url = `${baseApiUrl}/turmaSituacao`
            await axios.get(url).then(res => {
                this.situacoesTurma = res.data
            })
        },
        async loadEncaminhamentosCarta() {
            const url = `${baseApiUrl}/cartaEncaminhamento`
            await axios.get(url).then(res => {
                this.encaminhamentosCarta = res.data
            })

        },
        fillOptionsEstados() {
            if (this.estados.length > 0) {
                this.optionsEstados = []
                this.estados.forEach(estado => {
                    this.optionsEstados.push({ value: estado.codigo, text: estado.nome })
                })
            }
        },
        fillOptionsCidades(codigoEstado) {
            if (codigoEstado) {
                this.optionsCidades = []
                this.optionsLocalidades = []
                const cidadesEstado = this.cidades.filter(cidade => cidade.codigoEstado == codigoEstado)
                cidadesEstado.forEach(cidade => this.optionsCidades.push({ value: cidade.codigo, text: cidade.nome }))
            }
        },
        fillOptionsLocalidades(codigoCidade) {
            if (codigoCidade) {
                this.optionsLocalidades = []
                const localidadesCidade = this.localidades.filter(localidade => localidade.codigoCidade == codigoCidade)
                localidadesCidade.forEach(localidade => this.optionsLocalidades.push({ value: localidade.codigo, text: localidade.nome }))
            }
        },
        fillOptionsPapeis() {
            this.optionsPapeis = []
            this.papeis.forEach(papel => this.optionsPapeis.push({ value: papel.codigo, text: papel.nome }))
        },
        fillOptionsSituacoesInterprete() {
            this.optionssituacoesInterprete = []
            this.situacoesInterprete.forEach(situacao => this.optionsSituacoesInterprete.push({ value: situacao.codigo, text: situacao.nome, disabled: !situacao.ativo }))
        },
        fillOptionsCompetenciasColaborador() {
            this.optionsCompetenciasColaborador = []
            this.competenciasColaborador.forEach(competencia => this.optionsCompetenciasColaborador.push({ value: competencia.codigo, text: competencia.nome, disabled: !competencia.ativo }))
        },
        setTabsWizard(codigosPapeis) {
            this.showTabAluno = codigosPapeis.includes(PAPEL.ALUNO)
            this.showTabColaborador = codigosPapeis.includes(PAPEL.COLABORADOR)
            this.showTabInterprete = codigosPapeis.includes(PAPEL.INTERPRETE)
        },
        isBaptized(batizado) {
            return (batizado ? 'Sim' : 'Não')
        },
        setComum(localidade) {
            return localidade.ADM.replace(' - ', '/') + ' - ' + localidade.cidade + '/' + localidade.uf + ' - ' + localidade.nome
        }

    },
    async mounted() {
        await this.loadPessoas()
        await this.loadEstados()
        await this.loadCidades()
        await this.loadLocalidades()
        await this.loadPapeis()
        await this.loadCursos()
        await this.loadTurmas()
        await this.loadSituacoesTurma()
        await this.loadEncaminhamentosCarta()
        await this.loadSituacoesInterprete()
        await this.loadCompetenciasColaborador()
    },
    watch: {
        'pessoa.localidade.codigoEstado': function (newVal, oldVal) {
            this.fillOptionsCidades(newVal);
        },
        'pessoa.localidade.codigoCidade': function (newVal, oldVal) {
            this.fillOptionsLocalidades(newVal);
        },
        'pessoa.localidade.codigo': function (newVal, oldVal) {
            if (this.pessoa.localidade) {
                this.localidade = this.localidades.filter(localidade => localidade.codigo == this.pessoa.localidade.codigo)[0]
            } else {
                this.localidade = {}
            }
        }
    }
};
</script>

<style>
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.tabela_hide {
    width: 92vw;
    transition: all 0.25s;
}

.tabela {
    width: 83vw;
    transition: all 0.25s;
}

.botoes {
    margin: 4px;
}

.observacoes {
    height: 15vw !important;
}
</style>

