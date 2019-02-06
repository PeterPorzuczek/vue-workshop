<template>
  <div id="app">
    <notify />

    <navbar />

    <router-view />

  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Notify from './components/Notify'

  export default {
    components: {
      Navbar,
      Notify
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
