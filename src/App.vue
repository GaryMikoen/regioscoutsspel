<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    created () {
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  body, html {
    margin: 0;
    background-color: #1a368d;
    color: white;
  }
</style>