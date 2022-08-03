<template>
	<div>
    <div class="row" v-if="component == 'home'">
        <div class="card2 purple" @click="openComponent('GELAlvorada')">
          <h2>GEL - Alvorada</h2>
          <p>Grupo de Estudos de LIBRAS - Alvorada</p>
        </div>
        
        <div class="card2 orange" @click="openComponent('GELGuara')">
          <h2>GEL - Guará</h2>
          <p>Grupo de Estudos de LIBRAS - Guará</p>
        </div>

        <div class="card2 green" @click="openComponent('Letramento')">
          <h2>Letramento - Planaltina </h2>
          <p>Letramento de LIBRAS - Planaltina/GO</p>
        </div>

		</div>
		<div v-if="component != 'home'" class="m-2 btn-back"></div>
		
		<div v-if="component == 'GELAlvorada'">
			<!--<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>-->
			<GELAlvorada />
    </div>
		
		<div v-if="component == 'GELGuara'">
			<!--<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>-->
			<GELGuara />
		</div>

    <div v-if="component == 'Letramento'">
			<!--<button type="button" @click="openComponent('home')" class="btn btn-secondary btn-sm m-1">
				<i class="fa fa-chevron-circle-left"> Voltar</i>
			</button>-->
			<Letramento />
		</div>

	</div>
  <!--  -->
</template>

<script>
import GELAlvorada from './GELAlvorada.vue'
import GELGuara from './GELGuara.vue'
import Letramento from './Letramento.vue'
import { mapState } from 'vuex'

export default {
  name: "Alunos",
  components: { GELAlvorada, GELGuara, Letramento},
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

.purple {
  border-left: 3px solid #750270;
}

.orange {
  border-left: 3px solid #ca6e04;
}

.green {
  border-left: 3px solid #039227;
}

.btn-back {
  margin-left: 0px;
  padding-left: 0px;
}

</style>