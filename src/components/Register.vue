<template>
    <h1>Register an Account</h1>
      <form @submit.prevent="signUp">
        <input
          type="text"
          placeholder="Display Name"
          required
          v-model="registerForm.username"
        />
        <input type="email" placeholder="Email" required v-model="registerForm.email" />
        <input
          type="password"
          placeholder="Password"
          required
          v-model="registerForm.password"
        />
        <button type="submit">Create Account</button>
      </form>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init.js";

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
      this.store.dispatch('register', this.registerForm.value);
    },
  },
};
</script>
