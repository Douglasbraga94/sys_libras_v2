<template>
	<div>
		<div class="row" v-if="component == 'home'">
			<div class="card2 black" @click="openComponent('Alunos')">
				<h2>Alunos</h2>
				<p>Cadastro de Alunos</p>
			</div>

			<div class="card2 red" @click="openComponent('Colaboradores')">
				<h2>Colaboradores</h2>
				<p>Cadastro de Colaboradores</p>
			</div>

			<div class="card2 green" @click="openComponent('Interpretes')">
				<h2>Intérpretes</h2>
				<p>Cadastro de Intérpretes</p>
			</div>

			<div class="card2 blue" @click="openComponent('Surdos')">
				<h2>Surdos</h2>
				<p>Cadastro de Surdos</p>
			</div>

		</div>
		<div v-if="component != 'home'" class="m-2 btn-back"></div>
		<div v-if="component == 'Interpretes'">
			<PageTitle icon="fa fa-users"
			main="Intérpretes de Libras - CCB"
            sub="Controle de Intérpretes de LIBRAS"
			/>
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<Interpretes />
		</div>
		<div v-if="component == 'Surdos'">
			<PageTitle icon="fa fa-users" 
			main="Surdos - CCB"
            sub="Controle de Surdos de LIBRAS" />
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<Surdos />
		</div>
		<div v-if="component == 'Colaboradores'">
			<PageTitle 
				icon="fa fa-users" 
				main="Colaboradores de Libras - CCB"
				sub="Controle de Colaboradores de LIBRAS" 
			/>
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<Colaboradores />
		</div>
		<div v-if="component == 'Alunos'">
			<PageTitle 
				icon="fa fa-users" 
				main="Alunos de Libras - CCB"
				sub="Controle de Alunos de LIBRAS" 
			/>
			<button type="button" v-show="voltar" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<Alunos />
		</div>
	</div>
  <!--  -->
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Alunos from "./alunos/Alunos.vue";
import Interpretes from './CadInterpretes.vue'
import Surdos from './CadSurdos.vue'
import Colaboradores from './CadColaboradores.vue'
import { mapState } from 'vuex'

export default {
  name: "Pessoas",
  components: { PageTitle, Alunos, Interpretes, Surdos, Colaboradores },
  computed:mapState(['isMenuVisible']),
  data: function () {
    return {
		component: "home",
		voltar: true,
    };
  },
  methods: {
    openComponent(component) {
      this.component = component;
      console.log(this.component);
    },
  },
  mounted() {
	this.component = this.$route.params.component  || "home"	
  }
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

.black{
  border-left: 3px solid #131313;
}

.btn-back {
  margin-left: 0px;
  padding-left: 0px;
}
</style>