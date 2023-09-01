<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <input type="email" placeholder="Email" required v-model="loginForm.email"/>
    <input type="password" placeholder="Password" required v-model="loginForm.password"/>
    <button type="submit">Login</button>
    <p>Don't have an account? <span @click="this.$router.push({ name: 'register' });">Register</span></p>
  </form>
  <button @click="loginWithGoogle">Login With Google</button>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { eventBus } from "../main.js"
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
      loginForm: ref({}),
      store: useStore()
    };
  },
  methods: {
    login() {
      this.store.dispatch('login', this.loginForm);
    },
    loginWithGoogle(){
      this.store.dispatch('loginWithGoogle')
    }
  },
  beforeUpdate(){
    if(auth.currentUser){
      router.push({name: 'main'})
    }
  }
};
</script>

<style scoped>
span {
  color:blue;
  text-decoration: underline;
}

span:hover {
  color: rgb(red, rgb(55, 196, 201), blue);
}
</style>
