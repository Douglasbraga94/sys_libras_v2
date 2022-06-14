<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Relatório de Intérpretes" />
        <div class="stats">
            <Stat title="Intérpretes da Regional" value="interpretes"
                icon="fa fa-user" color="#4682B4" />
            <Stat title="Intérpretes Habilitados" value="habilitados"
                icon="fa fa-user" color="#3bc480" />
            <Stat title="Intérpretes não Habilitados" value="nao_hab"
                icon="fa fa-user" color="#d54d50" />
            <Stat title="Intérpretes com Status Diversos" value="diversos"
                icon="fa fa-user" color="#d0d009" />
        </div>
        <div class="stats">
            <Stat title="Total de Surdos da Regional" value="total"
                icon="fa fa-user" color="#4682B4" />
            <Stat title="Surdos Batizados" value="batizados"
                icon="fa fa-user" color="#3bc480" />
            <Stat title="Surdos Não Batizados" value="nao_bat"
                icon="fa fa-user" color="#d54d50" />
            <Stat title="Surdos Não Batizados" value="hide"
                icon="fa fa-user" color="#d54d50" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../tamplate/PageTitle.vue'
import Stat from './Stat'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() { 
        return {
            stat: {}
        }
    },
    methods: {
        
    }

}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
