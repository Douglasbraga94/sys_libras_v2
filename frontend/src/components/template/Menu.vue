<template>
    <aside class="menu" >
        <div style="height: 60px"></div>
        <div> <img src="../../assets/libras2.png" alt="" style="height: 150px; margin:25px" v-show="isMenuVisible"></div>
        <div style="height: 150px; margin:25px" v-show="!isMenuVisible"></div>
        <div class="links"><span style="width:100%; display:inline-flex" :class="{'toEnd': !isMenuVisible}"> <router-link to="/"><i class="fa fa-bar-chart" ></i>  <span v-show="isMenuVisible"> <b> Dashboard</b></span><hr></router-link></span></div>
        <!-- <div class="links"><span style="width:100%; display:inline-flex" :class="{'toEnd': !isMenuVisible}"> <router-link to="/regionais"><i class="fa fa-university"></i>  <span v-show="isMenuVisible"> <b> Regionais</b></span><hr></router-link></span></div> -->
        <div class="links"><span style="width:100%; display:inline-flex" :class="{'toEnd': !isMenuVisible}"> <router-link to="/pessoas"><i class="fa fa-users"></i>  <span v-show="isMenuVisible"> <b> Pessoas</b></span><hr></router-link></span></div>
        <!-- <div class="links"><span style="width:100%; display:inline-flex" :class="{'toEnd': !isMenuVisible}"> <router-link to=""><i class="fa fa-users"></i>  <span v-show="isMenuVisible"> <b> Eventos</b></span><hr></router-link></span></div> -->
        </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'Menu',
    computed:mapState(['isMenuVisible'])
}
</script>

<style>
    /* .menu {
        grid-area: menu;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    } */

        .menu{
        grid-area: menu;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-size: 14px;
    }



    .links a{
        display: block;
        justify-content: flex-end;
        padding-left: 15px;
        flex-grow: 1;
        color: rgb(49, 37, 37);
        text-decoration: none;
        padding-top: 20px;
    }

    .links a i{
        font-size: 30px;
    }

    .links span a:hover{
        cursor: pointer;
        color: rgb(87, 77, 231);
        text-decoration: none;
    }

    .links span a:active{
        cursor: pointer;
        color: rgb(87, 77, 231);
        text-decoration: none;
    }

    .toEnd{
        text-align: end;
    }

    .toEnd a {
        padding-right: 17px;
    }
</style>
