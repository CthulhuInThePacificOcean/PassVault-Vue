<template>
    <h1>Register an Account</h1>
      <form @submit.prevent="signUp">
        <input
          type="text"
          placeholder="Display Name"
          required
          v-model="username"
        />
        <input type="email" placeholder="Email" required v-model="email" />
        <input
          type="password"
          placeholder="Password"
          required
          v-model="password"
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
      username: ""
    };
  },
  methods: {
    signUp() {
      // register and login user
      createUserWithEmailAndPassword(auth, this.email, this.password).then(
        () => {
          // update 'displayName'
          updateProfile(auth.currentUser, {
            displayName: this.username,
          }).then(() => {
            // emit event
            this.$emit("loggedIn");
          })
          .catch((err) => {
            console.log(err)
          });
        }
      );
    },
  },
};
</script>
