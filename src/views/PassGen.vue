<template>
  <div class="info">
    <h1>PassVault Password Generator</h1>
    <p>Need a secure password? Generate one here!</p>
  </div>
  <form @submit.prevent="createPassword">
    <label for="quantity">Password Length: </label>
    <input type="number" id="quantity" name="quantity" min="6" max="128" v-model="number">
    <br />
    <input type="checkbox" id="lowercase" name="lowercase" value="Lowercase" v-model="useLowercase"/>
    <label for="lowercase"> Lowercase Letters</label><br />
    <input type="checkbox" id="uppercase" name="uppercase" value="Uppercase" v-model="useUppercase"/>
    <label for="uppercase"> Uppercase Letters</label><br />
    <input type="checkbox" id="numbers" name="numbers" value="Numbers" v-model="useNumbers"/>
    <label for="numbers"> Numbers</label><br />
    <input type="checkbox" id="easy-symbols" name="easy-symbols" value="Easy Symbols" v-model="useEasySymbols"/>
    <label for="easy-symbols"> Easy Symbols</label><br />
    <input type="checkbox" id="confusing-symbols" name="confusing-symbols" value="Confusing Symbols" v-model="useConfusingSymbols"/>
    <label for="confusing-symbols"> Confusing Symbols</label><br />
    <button id="generateButton" type="submit">Generate Password</button>
  </form>
  <h4 id="display"> {{ result }} </h4>
</template>

<script>
export default {
  data() {
    return {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "`~!@#$%^&*()-_=+[]{}\\|;:'\"\\,<.>/?",
      easySymbols: '!@#$%^&*()',
      confusingSymbols: '`~_-+=[]{}|;:,.<>?/"',
      number: "",
      result: "",
      useLowercase: false,
      useUppercase: false,
      useNumbers: false,
      useEasySymbols: false,
      useConfusingSymbols: false
    };
  },
  methods: {
    createPassword() {
      const length = parseInt(this.number);
      let characterSet = "";

      if (this.useLowercase) {
        characterSet += this.lowercase;
      }
      if (this.useUppercase) {
        characterSet += this.uppercase;
      }
      if (this.useNumbers) {
        characterSet += this.numbers;
      }
      if (this.useEasySymbols) {
        characterSet += this.easySymbols;
      }
      if (this.useConfusingSymbols) {
        characterSet += this.confusingSymbols;
      }

      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        generatedPassword += characterSet[randomIndex];
      }

      this.result = generatedPassword;
    },
  },
};
</script>
