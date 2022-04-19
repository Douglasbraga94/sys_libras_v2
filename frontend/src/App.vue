<template>
	<div id="app" :class="{'hide-menu': isMenuVisible}">
		<Header title="SYS - LIBRAS"/>
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Header from "./components/tamplate/Header.vue"
import Menu from "./components/tamplate/Menu.vue"
import Content from "./components/tamplate/Content.vue"
import Footer from "./components/tamplate/Footer.vue"
import { mapState } from "vuex"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer},
	computed: mapState(['isMenuVisible', 'user']),
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

	#app.hide-menu .menu .links a {
		justify-content: end;
	}
</style>