<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu"  >
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <div class="title">
            <a href="https://congregacaocristanobrasil.org.br/" target="_blank">
                <img src="../../assets/logo_ccb.png" style="width:7%">
            </a>
        </div>
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'
import { mapState } from 'vuex'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        },
        ...mapState(['isAdmin', 'user', 'isMenuVisible'])
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.25s;
    }
    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        
        width: 60px;
        height: 100%;
        color: black;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    } 
</style>

