<template>
  <div v-if="ativo" class="spinnerPrincipal" @click="prevent($event)">
    <img src="../../assets/loading.svg" />
  </div>
</template>

<script>

export default {
  name: "Spinner",
  data: function () {
    return {
      ativo: false
    }
  },
  mounted() {
    this.$loadingService.registerSpinner(this);
  },
  methods: {
    enable(val) {
      this.ativo = val;
      this.$forceUpdate();
    },
    prevent(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
</script>

<style>
  .spinnerPrincipal {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255, 0.5);
    backdrop-filter: blur(5px);
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
