<template>
    <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="email" placeholder="Email" required v-model="loginForm.email" />
        <input
          type="password"
          placeholder="Password"
          required
          v-model="loginForm.password"
        />
        <button type="submit">Sign In</button>
      </form>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";

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
    this.store.dispatch('login', this.loginForm.value);
    },
  },
};
</script>