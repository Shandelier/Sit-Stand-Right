<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <router-link to="/">Sit Stand Right</router-link> <i>|</i>
        <router-link to="/about">about</router-link>
        <!-- | <router-link to="/about">How to use?</router-link> -->
      </div>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  font-family: sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f1f3f5;
}

#nav {
  padding: 30px;
  text-align: center;

  i {
    font-size: 2rem;
    font-weight: 400;
    margin: 4px 4px 0 0;
  }

  a {
    font-weight: 700;
    color: #2c3e50 !important;
    font-size: 1.7rem;

    &.router-link-exact-active {
      color: #fd2459 !important;
    }
  }
}
</style>
