<template>
    <div class="stat" :class="{'hide': value == 'hide'}" @click="onClickStat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ valor }}</span>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color', 'component'],
    emits: ['stat-clicked'],
    data: function(){
        return {
            valor: 0
        }
    },
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    },
    methods:{
        async getStats(item) {
                if(item == 'interpretes' || item == 'habilitados' || item == 'nao_hab' || item == 'diversos'){
                    return await axios.get( `${baseApiUrl}/interprete`).then(res => {
                        if(item == 'interpretes') return res.data.length
                        else if(item == 'habilitados') return res.data.filter(item => item.status == 'Habilitado').length
                        else if(item == 'nao_hab') return res.data.filter(item => item.status == 'nao_hab').length
                        else if(item == 'diversos') return res.data.filter(item => item.status == 'diversos').length
                    })
                }else{
                    return await axios.get( `${baseApiUrl}/surdo`).then(res => {
                        if(item == 'total') return res.data.length
                        else if(item == 'batizados') return res.data.filter(item => item.batismo == 'S').length
                        else if(item == 'nao_bat') return res.data.filter(item => item.batismo == 'N').length
                    })
                }

        },
        async getStatsSurdos(item) {
            return await axios.get( `${baseApiUrl}/interprete`).then(res => {
                console.log(item)
                if(item == 'interpretes') return res.data.length
                else if(item == 'habilitados') return res.data.filter(item => item.status == 'Habilitado').length
                else if(item == 'nao_hab') return res.data.filter(item => item.status == 'nao_hab').length
                else if(item == 'diversos') return res.data.filter(item => item.status == 'diversos').length
            })
        }, 
        onClickStat() {
            this.$emit('stat-clicked', this.component)
        }
    },
    async mounted() {
        this.valor = await this.getStats(this.value);
        console.log(this.valor)
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat:hover {
        cursor: pointer;
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: center;
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 3rem;
    }

    .hide{
        visibility:hidden;
    }
</style>
