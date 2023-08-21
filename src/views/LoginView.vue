<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <input type="email" placeholder="Email" required v-model="email"/>
    <input type="password" placeholder="Password" required v-model="password"/>
    <button type="submit">Create Account</button>
    <p>Don't have an account? <span>Register</span></p>
  </form>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { eventBus } from "../main.js"

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // register and login user
      signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
        // emit event
        eventBus.$emit("loggedIn");
        this.$router.push({name: 'main'})
      });
    },
  },
};
</script>
