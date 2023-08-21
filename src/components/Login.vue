<template>
    <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="email" placeholder="Email" required v-model="email" />
        <input
          type="password"
          placeholder="Password"
          required
          v-model="password"
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
    };
  },
  methods: {
    login() {
      // register and login user
      signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        // emit event
        this.$emit("loggedIn");
      })
      .catch((err) => {
        console.log(err)
      });
    },
  },
};
</script>