<template>
  <div class="popup-box">
    <div class="popup">
      <div class="content">
        <header>
          <p>Add a new PassCard</p>
          <i class="uil uil-times"></i>
        </header>
        <form action="#">
          <div class="row-name">
            <label>Website or Application Name</label>
            <input type="text" class="name-input" v-model="name" />
          </div>
          <div class="row-website">
            <label>Link to website</label>
            <input type="text" class="site-input" v-model="website" />
          </div>
          <div class="row-username">
            <label>Username</label>
            <input type="text" class="user-input" v-model="username" />
          </div>
          <div class="row-password">
            <label>Password</label>
            <input type="text" class="pass-input" v-model="password" />
          </div>
          <button>Add PassCard</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: '',
      website: '',
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.name || !this.website || !this.username || this.password) {
        alert("Please enter information in the remaining fields.");
      }

      const passCard = {
        id: '',
        name: this.name,
        website: this.website,
        username: this.username,
        password: this.password,
      }

      this.$emit('add-card', passCard)

      this.name = ''
      this.website = ''
      this.username = ''
      this.password = ''
    },
  },
};
</script>
