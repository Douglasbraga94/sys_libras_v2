<template>
	<div>
		<div class="row" v-if="component === 'home'">
			<div class="card2 black" @click="openComponent('Pessoa')">
				<h2>Pessoas</h2>
				<p>Cadastro Geral</p>
			</div>

			<div v-for="papel in papeis" :key="'papel-' + papel.codigo" class="card2"
				:class="getCardStyleByRole(papel.codigo)" @click="openComponent(papel.nome)">
				<h2>{{ papel.plural }}</h2>
				<p>Cadastro de {{ papel.plural }}</p>
			</div>

		</div>
		<div v-else class="m-2 btn-back">
			<PageTitle icon="fa fa-users" :main="getPageTitle(component)" :sub="getSubtitle(component)" />
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<div v-if="component === 'Aluno' && !carregarCadastro">
				<div class="row">
					<div v-for="turma in turmas" :key="'turma-' + turma.codigo" class="card2"
						:class="getCardStyleByCourse(turma.codigoCurso)" @click="setClassFilter(turma.codigo)">
						<h2>{{ turma.nome }}</h2>
						<p>{{ turma.curso }}</p>
					</div>
				</div>
			</div>

			<div v-else>
				<pessoa-cadastro :filtros="filtros" v-show="carregarCadastro" />
			</div>

		</div>
	</div>
	<!--  -->
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import PessoaCadastro from './PessoaCadastro.vue'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { PAPEL, CURSO } from '@/enums'
import { mapState } from 'vuex'

export default {
	name: "Pessoas",
	components: { PageTitle, PessoaCadastro },
	data() {
		return {
			component: "home",
			voltar: true,
			papeis: [],
			turmas: [],
			filtros: {},
			carregarCadastro: false
		};
	},
	computed: mapState(['isMenuVisible']),
	methods: {
		openComponent(component) {
			let carregarCadastro = false

			if (this.papeis.some(papel => papel.nome === component)) {
				this.$set(this.filtros, 'papel', this.getRoleByName(component))
				this.$delete(this.filtros, 'turma')
				carregarCadastro = (this.filtros.papel.codigo !== PAPEL.ALUNO) ? true : false

			} else {
				this.$delete(this.filtros, "papel")
				this.$delete(this.filtros, "turma")
				carregarCadastro = (component === 'Pessoa') ? true : false
			}

			this.component = component;
			this.$set(this, 'carregarCadastro', carregarCadastro)

		},
		setClassFilter(codigoTurma) {
			this.$set(this.filtros, 'turma', this.getClass(codigoTurma))
			this.$set(this, 'carregarCadastro', true)
		},
		async loadPapeis() {
			const url = `${baseApiUrl}/papel`
			await axios.get(url).then(res => {
				this.papeis = res.data.filter((papel, indice, arr) => {
					arr[indice].plural = this.getPluralRole(papel.codigo, papel.nome)
					return papel.ativo == true
				})
			})

		},
		async loadTurmas() {
			const url = `${baseApiUrl}/turma`
			await axios.get(url).then(res => {
				this.turmas = res.data.filter(turma => turma.ativo == true)
			})
		},
		getPluralRole(codigoPapel, papel) {
			let pluralRole = "";
			if(papel) {

				switch (codigoPapel) {
					case PAPEL.ALUNO:
						pluralRole = papel + "s"
						break
					case PAPEL.CANDIDATO:
						pluralRole = papel + "s"
						break
					case PAPEL.COLABORADOR:
						pluralRole = papel + "es"
						break
					case PAPEL.INTERPRETE:
						pluralRole = papel + "s"
						break
					case PAPEL.MINISTERIO:
						pluralRole = papel
						break
					case PAPEL.SURDO:
						pluralRole = papel + "s"
						break
					case PAPEL.VISITANTE:
						pluralRole = papel + "s"
						break
				}
			} else {
				pluralRole = "Pessoas"
			}
			return pluralRole
		},
		getCardStyleByRole(codigoPapel) {
			let style = ""
			switch (codigoPapel) {
				case PAPEL.ALUNO:
					style = "orange"
					break
				case PAPEL.CANDIDATO:
					style = "yellow"
					break
				case PAPEL.COLABORADOR:
					style = "red"
					break
				case PAPEL.INTERPRETE:
					style = "green"
					break
				case PAPEL.MINISTERIO:
					style = "gray"
					break
				case PAPEL.SURDO:
					style = "blue"
					break
				case PAPEL.VISITANTE:
					style = "purple"
					break
				default:
					style = "black"
			}
			return style
		},
		getCardStyleByCourse(codigoCurso) {
			let style = ""
			switch (codigoCurso) {
				case CURSO.GEL:
					style = "orange"
					break
				case CURSO.GELS:
					style = "blue"
					break
				case CURSO.ATUALIZACAO:
					style = "green"
					break
				case CURSO.ADAPTACAO:
					style = "yellow"
					break
			}
			return style
		},
		getRoleName(codigoPapel) {
			if (!this.papeis.some(papel => papel.codigo === codigoPapel))
				return "Pessoa"

			return this.papeis.filter(papel => papel.codigo === codigoPapel)[0].nome

		},
		getRoleCode(nome) {
			if (!this.papeis.some(papel => papel.nome === nome))
				return

			return this.papeis.filter(papel => papel.nome === nome)[0].codigo
		},
		getClass(codigoTurma) {
			if (!this.turmas.some(turma => turma.codigo === codigoTurma))
				return

			return this.turmas.filter(turma => turma.codigo === codigoTurma)[0]
		},
		getRoleByName(nome) {
			if (!this.papeis.some(papel => papel.nome === nome))
				return

			return this.papeis.filter(papel => papel.nome === nome)[0]
		},
		getPageTitle(nome) {
			let titulo = ""
			// let codigoPapel = this.getRoleCode(nome)
			// let turma = this.getClass(this.filtros.codigoTurma)
			let codigoPapel = (this.filtros.papel) ? this.filtros.papel.codigo : this.getRoleCode(nome)
			let turma = this.filtros.turma

			switch (codigoPapel) {
				case PAPEL.ALUNO:
					titulo = (turma) ? turma.nome : this.filtros.papel.plural + " de Libras - CCB"
					break
				case PAPEL.CANDIDATO:
					titulo = this.filtros.papel.plural + " de Libras - CCB"
					break
				case PAPEL.COLABORADOR:
					titulo = this.filtros.papel.plural + " de Libras - CCB"
					break
				case PAPEL.INTERPRETE:
					titulo = this.filtros.papel.plural + " de Libras - CCB"
					break
				case PAPEL.MINISTERIO:
					titulo = this.filtros.papel.plural + " de Libras - CCB"
					break
				case PAPEL.SURDO:
					titulo = this.filtros.papel.plural + " - CCB"
					break
				case PAPEL.VISITANTE:
					titulo = this.filtros.papel.plural + " de Libras - CCB"
					break
				default:
					titulo = "Pessoas de Libras - CCB"

			}
			return titulo
		},
		getSubtitle(nome) {
			let codigoPapel = this.getRoleCode(nome)
			let subtitulo = "Controle de " + this.getPluralRole(codigoPapel) + " de LIBRAS"
			return subtitulo
		},
	},
	async created() {
		this.component = this.$route.params.component || "home"
		await this.loadPapeis()
		await this.loadTurmas()
	},
};
</script>

<style>
body {
	font-family: "Poppins", sans-serif;
	background-color: #fafafa;
}

.row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.card2 {
	background-color: #fafafa;
	border-radius: 5px;
	box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
	padding: 30px;
	margin: 20px;
	width: 400px;
	transition: all 0.3s ease-out;
}

.card2:hover {
	transform: translateY(-5px);
	cursor: pointer;
}

.card2 p {
	color: #a3a5ae;
	font-size: 16px;
}

.image {
	float: right;
	max-width: 64px;
	max-height: 64px;
}

.blue {
	border-left: 3px solid #4895ff;
}

.green {
	border-left: 3px solid #3bb54a;
}

.red {
	border-left: 3px solid #b3404a;
}

.black {
	border-left: 3px solid #131313;
}

.orange {
	border-left: 3px solid #dc8f00;
}

.gray {
	border-left: 3px solid #7a7a7a
}

.purple {
	border-left: 3px solid #800080
}

.yellow {
	border-left: 3px solid #ffff00
}

.btn-back {
	margin-left: 0px;
	padding-left: 0px;
}
</style>