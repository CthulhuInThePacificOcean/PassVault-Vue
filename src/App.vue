<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/main">Main</router-link> |
    <router-link to="/generator">Password Generator</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
  </nav>
  <router-view/>
</template>
<script>
import { eventBus } from "./main.js"

export default {
  components: {},
  data() {
    return {
      loggedIn: false
    };
  },
};
</script>
<style></style>
