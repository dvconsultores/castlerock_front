<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // mounted() {
  //   window.addEventListener('beforeunload', this.handleBeforeUnload);
  // },
  // beforeUnmount() {
  //   window.removeEventListener('beforeunload', this.handleBeforeUnload);
  // },
  // methods: {
  //   handleBeforeUnload() {
  //     localStorage.removeItem('accessToken');
  //     localStorage.removeItem('idUser');
  //     localStorage.removeItem('userRole');
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>