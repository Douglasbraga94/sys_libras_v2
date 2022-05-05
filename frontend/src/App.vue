<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible, 'no-user': !user}">
    <Spinner />
		<Header title="SYS - LIBRAS"
			:hideToggle="!user"
			:hideUserDropdown="!user"/>
		<Menu v-if="user"/>
		<Content v-if="!validatingToken" />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import Header from "./components/tamplate/Header.vue"
import Menu from "./components/tamplate/Menu.vue"
import Content from "./components/tamplate/Content.vue"
import Footer from "./components/tamplate/Footer.vue"
import Spinner from "@/components/tamplate/Spinner"
import { mapState } from "vuex"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Spinner},
	computed: mapState(['isMenuVisible', 'user', 'isAdmin']),
	data: function() {
		return{
			validatingToken: true
		}
	},
  methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.validatingToken = false
				this.$store.commit('setUser', userData)
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
  async mounted() {
    this.$loadingService.start();

    await this.validateToken()
    this.$loadingService.stop();
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
		overflow-x: hidden;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		transition: all 0.25s;
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 200px 1fr;
		grid-template-areas:
			"menu header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		margin-left: -130px;
		transition: all 0.25s;
	}
	#app.no-user{
		margin-left: -200px;
		transition: all 0.25s;
	}

	#app.hide-menu .menu .links a {
		justify-content: end;
	}
</style>
