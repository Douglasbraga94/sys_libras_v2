<template>
    <div class="pessoa">
        <div class="pessoa-admin">
            <b-form v-if="isEdit">
                <div class="accordion" role="tablist">
                    <b-form-row>
                        <b-col md="12" sm="12">
                            <div class="d-flex p-2 justify-content-center">
                                <h4>{{ pessoa.nome }}</h4>
                            </div>
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle.collapse-dados-cadastrais variant="outline-info">
                                        <b-icon icon="person-square"></b-icon> Dados Cadastrais
                                    </b-button>
                                </b-card-header>
                                <b-collapse id="collapse-dados-cadastrais" visible accordion="pessoa-accordion"
                                    role="tabpanel">
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
                                                            <b-form-radio :value="true">Sim</b-form-radio>
                                                            <b-form-radio :value="false">Não</b-form-radio>
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
                                                        label="Curso Externo de Libras:"
                                                        label-for="curso-externo-libras">
                                                        <b-form-radio-group id="curso-externo-libras"
                                                            name="curso-externo-libras"
                                                            v-model="pessoa.cursoExternoLibras"
                                                            :disabled="mode === 'view' || mode === 'remove'">
                                                            <b-form-radio :value="true">Sim</b-form-radio>
                                                            <b-form-radio :value="false">Não</b-form-radio>
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
                                                                            v-model="codigoEstadoSelected"
                                                                            :options="optionsEstados"
                                                                            :disabled="mode === 'view' || mode === 'remove'">
                                                                        </b-form-select>
                                                                    </b-form-group>
                                                                </b-col>
                                                                <b-col>
                                                                    <b-form-group id="cidade-grupo" label="Cidade:"
                                                                        label-for="cidade">
                                                                        <b-form-select id="cidade"
                                                                            v-model="codigoCidadeSelected"
                                                                            :options="optionsCidades"
                                                                            :disabled="mode === 'view' || mode === 'remove'">
                                                                        </b-form-select>
                                                                    </b-form-group>
                                                                </b-col>
                                                                <b-col>
                                                                    <b-form-group id="localidade-grupo"
                                                                        label="Localidade:" label-for="localidade">
                                                                        <b-form-select id="localidade"
                                                                            v-model="codigoLocalidadeSelected"
                                                                            :options="optionsLocalidades"
                                                                            :disabled="mode === 'view' || mode === 'remove'"></b-form-select>
                                                                    </b-form-group>
                                                                    <b-tooltip target="localidade-grupo" placement="top"
                                                                        triggers="hover" v-if="showComum">
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
                                                                        <span
                                                                            v-if="localidade.diasCultosConcatenado"><br>{{
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
                                                        <b-form-textarea id="observacoes"
                                                            placeholder="Observações Gerais" type="text"
                                                            v-model.trim="pessoa.observacao"
                                                            :readonly="mode === 'view' || mode === 'remove'"
                                                            class="observacoes">
                                                        </b-form-textarea>
                                                    </b-form-group>
                                                </b-col>
                                            </b-form-row>
                                        </b-form-group>
                                    </b-card>
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="12" sm="12">
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle.collapse-papeis variant="outline-info">
                                        <b-icon icon="layers-fill"></b-icon>
                                        Papéis
                                    </b-button>
                                </b-card-header>
                                <b-collapse id="collapse-papeis" accordion="pessoa-accordion" role="tabpanel">
                                    <b-card bg-variant="light">
                                        <b-form-group label="Selecione os Papéis da Pessoa" label-size="lg"
                                            label-class="font-weight-bold pt-0" class="mb-0">
                                            <b-form-checkbox-group id="papeis-grupo" v-model="codigosPapeisSelected"
                                                :options="optionsPapeis" name="papeis-grupo" stacked
                                                :disabled="mode === 'view' || mode === 'remove'"
                                                @input="setCollapseForm($event)"></b-form-checkbox-group>
                                        </b-form-group>
                                    </b-card>
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-form-row>
                    <b-form-row v-if="showAccordionAluno">
                        <b-col md="12" sm="12">
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle.collapse-aluno variant="outline-info">
                                        <b-icon icon="book-half"></b-icon> Aluno
                                    </b-button>
                                </b-card-header>
                                <b-collapse id="collapse-aluno" accordion="pessoa-accordion" role="tabpanel">
                                    <b-card bg-variant="light">
                                        <b-form-group id="aluno-grupo" label="Dados do Aluno" label-size="lg"
                                            label-class="font-weight-bold pt-0" class="mb-0">
                                            <b-form-row>
                                                <b-col md="12" sm="12">
                                                    <div>
                                                        <aluno-form v-for="(turma, i) in pessoa.turmas"
                                                            :key="turma.codigo" v-model="pessoa.turmas[i]"
                                                            :cursos="cursos" :turmas="turmas"
                                                            :situacoesTurma="situacoesTurma"
                                                            :encaminhamentosCarta="encaminhamentosCarta" :mode="mode"
                                                            :pessoa="dadosCadastrais" :localidades="localidades"
                                                            @input="onUpdateAluno" />
                                                    </div>
                                                </b-col>
                                            </b-form-row>
                                        </b-form-group>
                                    </b-card>
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-form-row>
                    <b-form-row v-if="showAccordionColaborador">
                        <b-col md="12" sm="12">
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle.collapse-colaborador variant="outline-info">
                                        <b-icon icon="hand-thumbs-up-fill"></b-icon> Colaborador
                                    </b-button>
                                </b-card-header>
                                <b-collapse id="collapse-colaborador" accordion="pessoa-accordion" role="tabpanel">
                                    <b-card bg-variant="light">
                                        <b-form-group label="Dados do Colaborador" label-size="lg"
                                            label-class="font-weight-bold pt-0" class="mb-0">
                                            <b-form-row>
                                                <b-col md="12" sm="12">
                                                    <colaborador-form v-model="pessoa.colaborador"
                                                        :competenciasColaborador="competenciasColaborador" :mode="mode"
                                                        @input="onUpdateColaborador" />
                                                </b-col>
                                            </b-form-row>
                                        </b-form-group>
                                    </b-card>
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-form-row>
                    <b-form-row v-if="showAccordionInterprete">
                        <b-col md="12" sm="12">
                            <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle.collapse-interprete variant="outline-info">
                                        <b-icon icon="info-circle-fill"></b-icon> Intérprete
                                    </b-button>
                                </b-card-header>
                                <b-collapse id="collapse-interprete" accordion="pessoa-accordion" role="tabpanel">
                                    <b-card bg-variant="light">
                                        <b-form-group label="Dados do Intérprete" label-size="lg"
                                            label-class="font-weight-bold pt-0" class="mb-0">
                                            <b-form-row>
                                                <b-col md="12" sm="12">
                                                    <interprete-form v-model="pessoa.interprete"
                                                        :situacoesInterprete="situacoesInterprete" :mode="mode"
                                                        @input="onUpdateInterprete" />
                                                </b-col>
                                            </b-form-row>
                                        </b-form-group>
                                    </b-card>
                                </b-collapse>
                            </b-card>
                        </b-col>
                    </b-form-row>
                </div>
                <b-row>
                    <b-col xs="12">
                        <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                        <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    </b-col>
                </b-row>
            </b-form>
            <hr>
            <div v-show="!isEdit" :class="{ 'tabela_hide': !isMenuVisible, 'tabela': isMenuVisible }">
                <div class="card-header">
                    <h3>{{ tituloGrid }}
                        <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg" v-if="canEdit">
                            <i class="fa fa-plus-circle"></i>
                        </button>
                        <span>&nbsp;</span>
                        <button type="button" @click="exportIDSelected" class="btn btn-outline-info btn-lg">
                            <i class="fa fa-id-card"></i>
                        </button>
                        <span>&nbsp;</span>
                        <botao-download-excel :dados="dadosPlanilha" :planilha="nomePlanilha"
                            :arquivo="nomeArquivoExcel" />
                    </h3>
                </div>
                <div class="">
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
                    }" ref="pessoas" @on-selected-rows-change="selectionChanged" :columns="columns"
                        :rows="pessoasFiltradas" :select-options="{
                            enabled: true,
                            selectionText: 'Linhas selecionadas',
                            disableSelectInfo: true
                        }" :search-options="{ enabled: true, placeholder: 'Procurar...', }"
                        styleClass="vgt-table striped hover">

                        <div slot="emptystate" class="semdados">
                            Não há dados a serem exibidos.
                        </div>

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
                                    @click="loadPessoa(data.row)" class="mr-2 botoes" v-if="canEdit">
                                    <i class="fa fa-pencil"></i>
                                </b-button>
                                <b-button v-b-tooltip.hover title="Excluir" variant="danger"
                                    @click="loadPessoa(data.row, 'remove')" class="mr-2 botoes" v-if="canEdit">
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { PAPEL, COLABORADOR_COMPETENCIA, PERFIL, CARTA_ENCAMINHAMENTO, TURMA_SITUACAO, INTERPRETE_SITUACAO } from '@/enums'
import moment from 'moment';
import { VueGoodTable } from 'vue-good-table'
import Cracha from '../template/Cracha.vue'
import { mapState } from 'vuex'
import BotaoDownloadExcel from '../exportacao/BotaoDownloadExcel.vue'
import AlunoForm from './AlunoForm.vue'
import ColaboradorForm from './ColaboradorForm.vue'
import InterpreteForm from './InterpreteForm.vue'

export default {
    name: 'PessoaCadastro',
    components: { VueGoodTable, Cracha, BotaoDownloadExcel, AlunoForm, ColaboradorForm, InterpreteForm },
    props: {
        filtros: {
            Type: Object
        }
    },
    data() {
        return {
            estados: [],
            cidades: [],
            localidades: [],
            localidade: {},
            papeis: [],
            pessoas: [],
            pessoa: {},
            turmasAluno: [],
            colaborador: {},
            interprete: {},
            cursos: [],
            turmas: [],
            situacoesTurma: [],
            encaminhamentosCarta: [],
            situacoesInterprete: [],
            competenciasColaborador: [],
            optionsEstados: [],
            optionsCidades: [],
            optionsLocalidades: [],
            codigoEstadoSelected: null,
            codigoCidadeSelected: null,
            codigoLocalidadeSelected: null,
            optionsPapeis: [],
            codigosPapeisSelected: [],
            mode: 'save',
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
            this.pessoasFiltradas.forEach(pessoa => {
                let excel = {}
                let turmaPessoa = this.filtros.turma ? pessoa.turmas.filter(turmaPessoa => turmaPessoa.turma.codigo === this.filtros.turma.codigo)[0] : {}

                excel['Codigo'] = pessoa.codigo || ""
                excel['Nome'] = pessoa.nome || ""
                excel['Papel Principal'] = pessoa.papel.nome || ""
                excel['Telefone Principal'] = pessoa.telefone1 || ""
                excel['Telefone Secundário'] = pessoa.telefone2 || ""
                excel['E-mail'] = pessoa.email || ""
                if (this.filtros.turma) {
                    excel['Turma'] = turmaPessoa.turma.nome
                    excel['Idade de Inicio do curso'] = this.idadeInicioCurso(pessoa, turmaPessoa.turma) || ""
                    excel['Carta de Encaminhamento'] = turmaPessoa.cartaEncaminhamento.nome || ""
                    excel['Status'] = turmaPessoa.situacao.nome || ""
                    excel['Data da Matrícula'] = this.dateFormat(turmaPessoa.dataHoraMatricula) || ""
                }
                excel['Data de Nascimento'] = this.dateFormat(pessoa.dataNascimento) || ""
                excel['Batizado?'] = pessoa.ehBatizado || ""
                excel['Data de Batismo'] = this.dateFormat(pessoa.dataBatismo) || ""
                excel['Curso Externo?'] = pessoa.temCursoExternoLibras || ""
                excel['Comum Congregação'] = pessoa.comum || ""
                excel['ADM'] = (pessoa.localidade) ? pessoa.localidade.ADM : ""
                excel['Cidade/UF'] = (pessoa.localidade) ? (pessoa.localidade.cidade + "/" + pessoa.localidade.uf) : ""
                excel['Localidade'] = (pessoa.localidade) ? pessoa.localidade.nome : ""
                if (this.filtros.papel) {
                    switch (this.filtros.papel.codigo) {
                        case PAPEL.COLABORADOR:
                            excel['Competência'] = (pessoa.colaborador) ? pessoa.colaborador.competencia.nome : ""
                            break
                        case PAPEL.INTERPRETE:
                            excel['Data de Oficialização'] = (pessoa.interprete) ? this.dateFormat(pessoa.interprete.dataOficializacao) : ""
                            excel['Situação'] = (pessoa.interprete) ? pessoa.interprete.situacao.nome : ""
                            excel['Justificativa'] = (pessoa.interprete) ? pessoa.interprete.justificativa : ""
                            break
                    }
                }
                if (this.filtros.turma) {
                    excel['Observações do Curso'] = turmaPessoa.observacao || ""
                } else {
                    excel['Observações Gerais'] = pessoa.observacao || ""
                }
                dados.push(excel)
            })
            return dados
        },
        nomeArquivoExcel() {
            let arquivoExcel = this.tituloGrid + ".xlsx";
            return arquivoExcel
        },
        nomePlanilha() {
            return (this.filtros.papel) ? this.filtros.papel.plural : "Pessoas"
        },
        showAccordionAluno() {
            return this.codigosPapeisSelected.includes(PAPEL.ALUNO)
        },
        showAccordionColaborador() {
            return this.codigosPapeisSelected.includes(PAPEL.COLABORADOR)
        },
        showAccordionInterprete() {
            return this.codigosPapeisSelected.includes(PAPEL.INTERPRETE)
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
        pessoasFiltradas() {
            if (!this.filtros.papel || Object.keys(this.filtros.papel).length === 0) {
                return this.pessoas
            } else {
                const regrasFiltro = this.setFilterRules(this.filtros)
                const pessoas = this.pessoas.filter((pessoa) => {
                    return regrasFiltro.reduce((regraAnterior, regraAtual) => regraAnterior && regraAtual.filtro(pessoa), true)
                })
                return pessoas
            }
        },
        hasClass() {
            return (this.pessoa.turmas) ? true : false
        },
        tituloGrid() {
            var titulo = ""
            var papel = ""
            var dadosAdicionais = ""
            var prefixo = ""
            var sufixo = ""

            if (this.filtros.papel && Object.keys(this.filtros.papel).length > 0) {

                // Dados cadastrais gerais para todas as pessoas
                if (this.filtros.dadosCadastrais && Object.keys(this.filtros.dadosCadastrais).length > 0) {
                    if (typeof this.filtros.dadosCadastrais.batizado === "boolean") {
                        dadosAdicionais = (this.filtros.dadosCadastrais.batizado) ? " Batizados" : " Não Batizados"
                    } else if (typeof this.filtros.dadosCadastrais.cursoExternoLibras === "boolean") {
                        dadosAdicionais = (this.filtros.dadosCadastrais.cursoExternoLibras) ? " Com Curso Externo de Libras" : " Sem Curso Externo de Libras"
                    }
                }

                papel = this.filtros.papel.plural

                switch (this.filtros.papel.codigo) {
                    case PAPEL.INTERPRETE:
                        if (this.filtros.interprete && Object.keys(this.filtros.interprete).length > 0) {
                            dadosAdicionais = " " + this.getInterpreterSituationTitleByCode(this.filtros.interprete.situacao.codigo)
                        }

                        prefixo = papel + dadosAdicionais
                        sufixo = " Regional Brasília"
                        titulo = prefixo + sufixo
                        break
                    case PAPEL.ALUNO:
                        if (this.filtros.turma && Object.keys(this.filtros.turma).length > 0) {
                            prefixo = this.filtros.turma.curso + ' - ' + this.filtros.turma.nome

                            if (this.filtros.aluno && Object.keys(this.filtros.aluno).length > 0) {
                                if (this.filtros.aluno.situacao && Object.keys(this.filtros.aluno.situacao).length > 0) {
                                    dadosAdicionais = " " + this.getStudentSituationTitleByCode(this.filtros.aluno.situacao.codigo)

                                } else if (this.filtros.aluno.cartaEncaminhamento && Object.keys(this.filtros.aluno.cartaEncaminhamento).length > 0) {
                                    dadosAdicionais = " " + this.getForwardingLetterTitleByCode(this.filtros.aluno.cartaEncaminhamento.codigo)
                                }
                            }

                            sufixo = " - " + papel + dadosAdicionais
                            titulo = prefixo + sufixo
                        }
                        break
                    default:
                        titulo = papel + dadosAdicionais + " Regional Brasília"
                }
            } else {
                titulo = "Pessoas Regional Brasília"
            }

            return titulo
        },
        showComum() {
            return (this.localidade && Object.keys(this.localidade).length > 0) ? true : false
        },
        canEdit() {
            return (this.user.admin || this.user.codigoPerfil === PERFIL.COLABORADOR) ? true : false
        },
        ...mapState(['isAdmin', 'user', 'isMenuVisible'])
    },
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
        dateFormat: function (date) {
            if (date === undefined || date === null || date == '')
                return ''
            return moment(String(date)).format('DD/MM/YYYY');
        },
        reset() {
            this.isEdit = false
            this.mode = 'save'
            this.pessoa = {}
            this.codigosPapeisSelected = []
            this.codigoEstadoSelected = null
            this.codigoCidadeSelected = null
            this.codigoLocalidadeSelected = null
            this.colaborador = null
            this.interprete = null
            this.turmasAluno = null
            this.loadPessoas()
        },
        save() {
            const method = (this.pessoa.codigo) ? 'put' : 'post'
            const id = (this.pessoa.codigo) ? `/${this.pessoa.codigo}` : ''
            axios[method](`${baseApiUrl}/pessoa${id}`, this.pessoa)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            axios.delete(`${baseApiUrl}/pessoa/${this.pessoa.codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        exportID(item, event) {
            this.$loadingService.start();

            event.stopPropagation();
            this.$refs['cracha'].setItens([{
                nome: item.nomeExibicao,
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
                    nome: item.nomeExibicao,
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
            console.log("pessoa: " + JSON.stringify(pessoa, null, 2))
            this.$set(this, "pessoa", pessoa);
            this.codigoEstadoSelected = (this.pessoa.localidade) ? this.pessoa.localidade.codigoEstado : null
            this.codigoCidadeSelected = (this.pessoa.localidade) ? this.pessoa.localidade.codigoCidade : null
            this.codigoLocalidadeSelected = (this.pessoa.localidade) ? this.pessoa.localidade.codigo : null
            this.$set(this, "turmasAluno", pessoa.turmas);
            this.$set(this, "colaborador", pessoa.colaborador);
            this.$set(this, "interprete", pessoa.interprete);
            this.isEdit = true
            this.setPapeisPessoa()
        },

        async loadPessoas() {
            const url = `${baseApiUrl}/pessoa`
            await axios.get(url).then(res => {
                this.pessoas = res.data
                this.pessoas.forEach(pessoa => {
                    pessoa.ehBatizado = this.isBaptized(pessoa.batizado)
                    pessoa.temCursoExternoLibras = this.hasExternalLibrasCourse(pessoa.cursoExternoLibras)
                    pessoa.comum = this.setComum(pessoa.localidade)
                    pessoa.codigoExibicao = pessoa.codigo.toString().padStart(6, '0')
                    pessoa.nomeExibicao = this.formatarNomeExibicao(pessoa.nome)
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
            })
        },
        async loadCompetenciasColaborador() {
            const url = `${baseApiUrl}/colaboradorCompetencia`
            await axios.get(url).then(res => {
                this.competenciasColaborador = res.data
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
            console.log('fillOptionsEstados')
            if (this.estados.length > 0) {
                this.optionsEstados = []
                this.estados.forEach(estado => {
                    this.optionsEstados.push({ value: estado.codigo, text: estado.nome })
                })
            }
        },
        fillOptionsCidades(codigoEstado) {
            console.log('fillOptionsCidades - estado: ' + codigoEstado)
            if (codigoEstado) {
                this.optionsCidades = []
                const cidadesEstado = this.cidades.filter(cidade => cidade.codigoEstado == codigoEstado)
                cidadesEstado.forEach(cidade => this.optionsCidades.push({ value: cidade.codigo, text: cidade.nome }))
            }
        },
        fillOptionsLocalidades(codigoCidade) {
            console.log('fillOptionsLocalidades - cidade: ' + codigoCidade)
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

        setCollapseForm(codigosPapeis) {
            console.log('setCollapseForm(' + codigosPapeis + ')')
            const papeis = []

            this.$set(this.pessoa, 'papeis', null)
            this.$set(this.pessoa, 'papel', null)

            // Se o papel ALUNO não estiver selecionado, remove os dados de turmas
            if (!codigosPapeis.includes(PAPEL.ALUNO) && this.pessoa.turmas) {
                this.$set(this.pessoa, 'turmas', null)
            }

            // Se o papel COLABORADOR não etiver selecionado, remove os dados de colaborador
            if (!codigosPapeis.includes(PAPEL.COLABORADOR) && this.pessoa.colaborador) {
                this.$set(this.pessoa, 'colaborador', null)
            }

            // Se o papel INTÉRPRETE não estiver selecionado, remove os dados de intérprete
            if (!codigosPapeis.includes(PAPEL.INTERPRETE) && this.pessoa.interprete) {
                this.$set(this.pessoa, 'interprete', null)
            }

            // Percorre os papéis selecionados
            if (codigosPapeis.length > 0) {
                codigosPapeis.forEach(codigoPapel => {
                    let papel = this.papeis.filter(papel => papel.codigo === codigoPapel)[0]
                    papeis.push(papel)

                    switch (codigoPapel) {
                        case PAPEL.ALUNO:
                            if (!this.pessoa.turmas) {
                                // Reparoveita as turmas ativas previamente cadastradas
                                if (this.turmasAluno && Object.keys(this.turmasAluno).length > 0) {
                                    this.$set(this.pessoa, 'turmas', this.turmasAluno)
                                } else {
                                    // Cria um array de objetos vazio
                                    this.$set(this.pessoa, 'turmas', [{}])
                                }
                            }
                            break
                        case PAPEL.COLABORADOR:
                            if (!this.pessoa.colaborador) {
                                // Reaproveita os dados do colaborador previamente cadastrados
                                if (this.colaborador && Object.keys(this.colaborador).length > 0) {
                                    this.$set(this.pessoa, 'colaborador', this.colaborador)
                                } else {
                                    this.$set(this.pessoa, 'colaborador', null)
                                }
                            }
                            break
                        case PAPEL.INTERPRETE:
                            if (!this.pessoa.interprete) {
                                // Reaproveita os dados do intérprete previamente cadastrados
                                if (this.interprete && Object.keys(this.interprete).length > 0) {
                                    this.$set(this.pessoa, 'interprete', this.interprete)
                                } else {
                                    this.$set(this.pessoa, 'interprete', null)
                                }
                            }
                            break
                    }
                })

                let papelPrincipal = papeis.reduce((papelAnterior, papelAtual) => papelAnterior.prioridade < papelAtual.prioridade ? papelAnterior : papelAtual)

                this.$set(this.pessoa, 'papeis', papeis)
                this.$set(this.pessoa, 'papel', papelPrincipal)

            }

        },
        isBaptized(batizado) {
            return (batizado ? 'Sim' : 'Não')
        },
        hasExternalLibrasCourse(cursoExternoLibras) {
            return (cursoExternoLibras ? 'Sim' : 'Não')
        },
        setComum(localidade) {
            console.log('setComum')
            if (localidade) {
                return localidade.ADM.replace(' - ', '/') + ' - ' + localidade.cidade + '/' + localidade.uf + ' - ' + localidade.nome
            }
        },
        idadeInicioCurso(pessoa, turma) {
            if (pessoa.dataNascimento && turma) {
                return moment(String(turma.dataInicio))
                    .diff(pessoa.dataNascimento, 'years')
            }
        },
        onUpdateAluno(aluno) {
            console.log("onUpdateAluno: " + JSON.stringify(aluno, null, 2));
            this.pessoa.turmas.splice(0, 1, aluno)
        },
        onUpdateInterprete(interprete) {
            console.log("onUpdateInterprete: " + JSON.stringify(interprete, null, 2))
            this.$set(this.pessoa, 'interprete', interprete)
        },
        onUpdateColaborador(colaborador) {
            console.log("onUpdateColaborador: " + JSON.stringify(colaborador, null, 2))
            this.$set(this.pessoa, 'colaborador', colaborador)
            if (this.pessoa.colaborador.competencia.codigo === COLABORADOR_COMPETENCIA.MINISTERIO
                && !this.codigosPapeisSelected.includes(PAPEL.MINISTERIO)) {
                this.codigosPapeisSelected.push(PAPEL.MINISTERIO)
            }
        },
        setPapeisPessoa() {
            this.codigosPapeisSelected = []
            console.log('papeis: ' + this.pessoa.papeis)
            if (this.pessoa.papeis) {
                this.pessoa.papeis.forEach(papel => this.codigosPapeisSelected.push(papel.codigo))
            }
        },
        setFilterRules(filtros) {
            var regrasFiltro = []

            // Cria as regras específicas que filtram as pessoas

            const fnFiltraPapel = (pessoa) => {
                if (!pessoa.papeis)
                    return false
                return pessoa.papeis.some(papel => papel.codigo === filtros.papel.codigo)
            }

            const fnFiltraPessoaBatismo = (pessoa) => pessoa.batizado === this.filtros.dadosCadastrais.batizado
            const fnFiltraPessoaCursoExternoLibras = (pessoa) => pessoa.cursoExternoLibras === filtros.dadosCadastrais.cursoExternoLibras
            const fnFiltraSituacaoInterprete = (pessoa) => {
                if (!pessoa.interprete || Object.keys(pessoa.interprete).length === 0
                    || !pessoa.interprete.situacao || Object.keys(pessoa.interprete.situacao).length === 0)
                    return false
                return pessoa.interprete.situacao.codigo === filtros.interprete.situacao.codigo
            }
            const fnFiltraTurma = (pessoa) => {
                if (!pessoa.turmas || pessoa.turmas.length === 0)
                    return false
                return pessoa.turmas.some(turmaPessoa => turmaPessoa.turma.codigo === filtros.turma.codigo)
            }
            const fnFiltraSituacaoAluno = (pessoa) => {
                if (!pessoa.turmas || pessoa.turmas.length === 0)
                    return false
                return pessoa.turmas.some((turmaPessoa) => turmaPessoa.turma.codigo === filtros.turma.codigo
                    && turmaPessoa.situacao && Object.keys(turmaPessoa.situacao).length > 0
                    && turmaPessoa.situacao.codigo === filtros.aluno.situacao.codigo)
            }
            const fnFiltraCartaEncaminhamentoAluno = (pessoa) => {
                if (!pessoa.turmas || pessoa.turmas.length === 0)
                    return false
                return pessoa.turmas.some((turmaPessoa) => turmaPessoa.turma.codigo === filtros.turma.codigo
                    && turmaPessoa.cartaEncaminhamento && Object.keys(turmaPessoa.cartaEncaminhamento).length > 0
                    && turmaPessoa.cartaEncaminhamento.codigo === filtros.aluno.cartaEncaminhamento.codigo)
            }

            // Seleciona quais regras deverão ser consideradas, de acordo com o filtro informado
            if (filtros.papel && Object.keys(filtros.papel).length > 0)
                regrasFiltro.push({ filtro: fnFiltraPapel })

            if (filtros.dadosCadastrais && Object.keys(filtros.dadosCadastrais).length > 0) {
                if (filtros.dadosCadastrais.hasOwnProperty("batizado"))
                    regrasFiltro.push({ filtro: fnFiltraPessoaBatismo })
                if (filtros.dadosCadastrais.hasOwnProperty("cursoExternoLibras"))
                    regrasFiltro.push({ filtro: fnFiltraPessoaCursoExternoLibras })
            }

            if (filtros.interprete && Object.keys(filtros.interprete).length > 0) {
                if (filtros.interprete.situacao && Object.keys(filtros.interprete.situacao).length > 0)
                    regrasFiltro.push({ filtro: fnFiltraSituacaoInterprete })
            }

            if (filtros.turma) {
                regrasFiltro.push({ filtro: fnFiltraTurma })
                if (filtros.aluno && Object.keys(filtros.aluno).length > 0) {
                    if (filtros.aluno && Object.keys(filtros.aluno).length > 0) {
                        if (filtros.aluno.situacao && Object.keys(filtros.aluno.situacao).length > 0)
                            regrasFiltro.push({ filtro: fnFiltraSituacaoAluno })
                        if (filtros.aluno.cartaEncaminhamento && Object.keys(filtros.aluno.cartaEncaminhamento).length > 0)
                            regrasFiltro.push({ filtro: fnFiltraCartaEncaminhamentoAluno })
                    }
                }
            }

            return regrasFiltro
        },
        getStudentSituationTitleByCode(situationCode) {

            switch (situationCode) {
                case TURMA_SITUACAO.EM_ANDAMENTO:
                    return "Em Andamento"
                case TURMA_SITUACAO.RETESTE:
                    return "Reteste"
                case TURMA_SITUACAO.DESISTENTE:
                    return "Desistentes"
                case TURMA_SITUACAO.APROVADO:
                    return "Aprovados"
                default:
                    return ""
            }

        },
        getForwardingLetterTitleByCode(forwardingLetterCode) {

            switch (forwardingLetterCode) {
                case CARTA_ENCAMINHAMENTO.ASSINADA:
                    return "Com Carta Assinada"
                case CARTA_ENCAMINHAMENTO.PENDENTE:
                    return "Com Carta Pendente"
                case CARTA_ENCAMINHAMENTO.NAO_APLICAVEL:
                    return "Sem Carta - N/A"
                default:
                    return ""
            }

        },
        getInterpreterSituationTitleByCode(situationCode) {

            switch (situationCode) {
                case INTERPRETE_SITUACAO.HABILITADO:
                    return "Habilitados"
                case INTERPRETE_SITUACAO.NAO_HABILITADO:
                    return "Não Habilitados"
                case INTERPRETE_SITUACAO.DIVERSOS:
                    return "Diversos"
                default:
                    return ""
            }

        },
        formatarNomeExibicao(nomeCompleto) {
            // Remove espaços em branco extras e divide o nome completo em partes
            const partesDoNome = nomeCompleto.trim().split(/\s+/);

            // Se houver mais de uma parte, é um nome composto
            if (partesDoNome.length > 1) {
                // Verifica se o segundo nome contém uma preposição
                const preposicoes = ['de', 'da', 'do', 'dos', 'das', 'e', 'em', 'no', 'na', 'nos', 'nas'];
                if (preposicoes.includes(partesDoNome[1].toLowerCase())) {
                    // Retorna até o terceiro sobrenome
                    return partesDoNome.slice(0, 3).join(' ');
                } else {
                    // Retorna o primeiro e o segundo nome
                    return partesDoNome.slice(0, 2).join(' ');
                }
            } else {
                // Retorna apenas o primeiro nome
                return partesDoNome[0];
            }
        }

    },
    created() {
        this.loadPessoas()
        this.loadEstados()
        this.loadCidades()
        this.loadLocalidades()
        this.loadPapeis()
        this.loadCursos()
        this.loadTurmas()
        this.loadSituacoesTurma()
        this.loadEncaminhamentosCarta()
        this.loadSituacoesInterprete()
        this.loadCompetenciasColaborador()
    },
    watch: {
        'codigoEstadoSelected': function (newVal, oldVal) {
            console.log('watch: codigoEstado alterado')
            console.log('watch: estado antigo: ' + oldVal)
            console.log('watch: estado novo: ' + newVal)

            if (newVal) {
                this.fillOptionsCidades(newVal)

                if (oldVal && newVal != oldVal) {
                    this.codigoCidadeSelected = null
                    this.codigoLocalidadeSelected = null
                    this.$set(this, 'localidade', null)
                    this.$set(this.pessoa, 'localidade', null)
                    this.$set(this.pessoa, 'comum', null)
                    this.optionsLocalidades = []
                }
            }

        },
        'codigoCidadeSelected': function (newVal, oldVal) {
            console.log('watch: codigoCidade: alterado')
            console.log('watch: cidade antigo: ' + oldVal)
            console.log('watch: cidade novo: ' + newVal)

            if (newVal) {
                this.fillOptionsLocalidades(newVal)

                if (oldVal && newVal != oldVal) {
                    this.codigoLocalidadeSelected = null
                    this.$set(this, 'localidade', null)
                    this.$set(this.pessoa, 'localidade', null)
                    this.$set(this.pessoa, 'comum', null)
                }
            }
        },
        'codigoLocalidadeSelected': function (newVal, oldVal) {
            console.log('watch: codigoLocalidade: ' + newVal)
            if (newVal) {
                const localidade = this.localidades.filter(localidade => localidade.codigo == newVal)[0]
                this.$set(this, 'localidade', localidade)
                this.$set(this.pessoa, 'localidade', localidade)
                this.$set(this.pessoa, 'comum', this.setComum(localidade))
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

.semdados {
    margin: auto;
    width: 50%;
    padding: 5px;
    text-align: center;
}
</style>
