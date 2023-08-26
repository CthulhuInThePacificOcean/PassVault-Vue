<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <input type="email" placeholder="Email" required v-model="loginForm.email"/>
    <input type="password" placeholder="Password" required v-model="loginForm.password"/>
    <button type="submit">Login</button>
    <p>Don't have an account? <span>Register</span></p>
  </form>
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
  },
  beforeUpdate(){
    if(auth.currentUser){
      router.push({name: 'main'})
    }
  }
};
</script>
