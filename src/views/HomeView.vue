<template>
  <div class="home">
    <img alt="Passvault logo" src="../assets/passvault2.png">
    <button @click="this.$router.push({ name: 'login' });">Get Started</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
