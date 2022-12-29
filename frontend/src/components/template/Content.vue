<template>
  <div class="content">
      <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Content',
    computed:mapState(['isMenuVisible'])
}
</script>

<style>
    .content{
        grid-area:  content;
        background-color: #efefef;
        padding: 20px;
    }
</style>