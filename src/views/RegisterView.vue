<template>
  <h1>Register an Account</h1>
  <form @submit.prevent="signUp">
    <input type="text" placeholder="Display Name" required v-model="registerForm.username"/>
    <input type="email" placeholder="Email" required v-model="registerForm.email"/>
    <input type="password" placeholder="Password" required v-model="registerForm.password"/>
    <button type="submit">Create Account</button>
    <p>Already have an account? <span @click="this.$router.push({ name: 'login' });">Login</span></p>
  </form>
  <button @click="registerWithGoogle">Register With Google</button>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { eventBus } from "../main.js"
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      registerForm: ref({}),
      store: useStore()
    };
  },
  methods: {
    signUp() {
      this.store.dispatch('register', this.registerForm);
    },
   registerWithGoogle(){
      this.store.dispatch('registerWithGoogle')
    }
  },
};
</script>

<style scoped>
span {
  color:blue;
  text-decoration: underline;
}

span:hover {
  color: rgb(55, 196, 201);
}
</style>
