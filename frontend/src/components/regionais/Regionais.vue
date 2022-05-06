<template>
	<div>
    	<div class="row" v-if="component == 'home'">
      		<div class="card2 green" @click="openComponent('CadRegionais')">
        		<h2>Regionais</h2>
        		<p>Cadastro de Regionais</p>
      		</div>

      		<div class="card2 blue" @click="openComponent('CadAdministracoes')">
        		<h2>Administração</h2>
        		<p>Cadastro de Administração</p>
      		</div>

			<div class="card2 red" @click="openComponent('CadComuns')">
				<h2>Comum</h2>
				<p>Cadastro de Comum</p>
			</div>
		</div>
		<div v-if="component != 'home'" class="m-2 btn-back"></div>
		<div v-if="component == 'CadRegionais'">
			<PageTitle
				icon="fa fa-university"
				main="Regionais"
				sub="Controle das Regionais"
			/>
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<CadRegionais />
		</div>
		<div v-if="component == 'CadAdministracoes'">
			<PageTitle
				icon="fa fa-university"
				main="Administração"
				sub="Controle das Administrações"
			/>
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<CadAdministracoes />
		</div>
		<div v-if="component == 'CadComuns'">
			<PageTitle
				icon="fa fa-university"
				main="Comuns"
				sub="Controle de Setores - Comuns"
			/>
			<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>
			<Cad-comuns />
		</div>
  	</div>
  <!--  -->
</template>

<script>
import PageTitle from "../tamplate/PageTitle.vue";
import CadRegionais from './CadRegionais.vue'
import CadAdministracoes from './CadAdministracoes.vue'
import CadComuns from './CadComuns.vue'
import { mapState } from 'vuex'

export default {
  name: "Regionais",
  components: { PageTitle, CadRegionais, CadAdministracoes, CadComuns },
computed:mapState(['isMenuVisible']),
  data: function () {
    return {
      component: "home",
    };
  },
  methods: {
    openComponent(component) {
      this.component = component;
      console.log(this.component);
    },
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

.btn-back {
  margin-left: 0px;
  padding-left: 0px;
}
</style>