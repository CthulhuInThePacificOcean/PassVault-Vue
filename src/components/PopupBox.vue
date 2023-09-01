<template>
  <div class="popup-box">
    <div class="popup">
      <div class="content">
        <header>
          <p v-if="popupBoxUpdate">Update PassCard</p>
          <p v-else>Add a new PassCard</p>
          <i class="uil uil-times" @click="$emit('close-popup')"></i>
        </header>
        <form action="#">
          <div class="row-name">
            <label>Website or Application Name</label>
            <input type="text" class="name-input" v-model="name"/>
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
            <p>Don't have an existing password for the account? Go to <span @click="this.$router.push({name: 'generator'})">Password Generator</span></p>
          </div>
          <div class="row-color">
            <label>Color</label>
            <input type="color" class="color-input" v-model="color" />
          </div>
          <button @click.prevent="onSubmit" v-if="popupBoxUpdate">Update PassCard</button>
          <button @click.prevent="onSubmit" v-else>Add PassCard</button>
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
      password: '',
      isUpdate: false,
      tempCard: {}, // New property to hold temporary values for editing mode
      color: '#0000ff'
    }
  },
  props: {
    activeId: String,
    files: Array,
    cardToUpdate: Object,
    popupBoxUpdate: Boolean,
    userFiles: Array
  },
  watch: {
    cardToUpdate: {
      immediate: true, // Run the watch function immediately on component creation
      handler(newValue) {
        // When the 'cardToUpdate' prop changes, update the 'data' properties
        this.name = newValue.name || ""; // Use default empty string if 'name' is not available
        this.website = newValue.website || "";
        this.username = newValue.username || "";
        this.password = newValue.password || "";
        this.color = newValue.color || "#0000ff";
        // Reset the temporary card values whenever cardToUpdate changes
        this.tempCard = { ...newValue };
      },
    },
    popupBoxUpdate: {
      immediate: true, // Run the watch function immediately on component creation
      handler(newValue) {
        // When the 'popupBoxUpdate' prop changes, update the 'isUpdate' property
        this.isUpdate = newValue;
        if (!newValue) {
          // If the popup is being closed, reset the temporary card values
          this.tempCard = {};
          // Reset the original data properties when closing the popup or switching to adding mode
          this.name = "";
          this.website = "";
          this.username = "";
          this.password = "";
          this.color = '#0000ff'
        }
        this.resetData(); // Call resetData() when transitioning between modes
      },
    },
  },
  methods: {
    onSubmit() {
      if (!this.name || !this.website || !this.username || !this.password) {
        alert("Please enter information in the remaining fields.");
        return
      }

      if (this.isUpdate) {
        // Update existing card
        const updatedCard = {
          name: this.name,
          website: this.website,
          username: this.username,
          password: this.password,
          color: this.color
        };
        
        // Update the existing card in the files array
        this.userFiles.forEach(file => {
          if (file.isActive) {
            const index = file.content.passCardList.findIndex(card => card === this.cardToUpdate);
            if (index !== -1) {
              file.content.passCardList.splice(index, 1, updatedCard);
              this.$emit('save-file')
            }
          }
        });
        
        // Reset isUpdate and clear form fields
        this.isUpdate = false;
        //this.cardToUpdate = null;
      } else {
        const passCard = {
        name: this.name,
        website: this.website,
        username: this.username,
        password: this.password,
        color: this.color
      }

      this.userFiles.forEach(file => {
        if(file.isActive == true){
          file.content.passCardList = [...file.content.passCardList, passCard]
          console.log(file.content.passCardList)
          this.$emit('save-file')
        }
      })
      }

      this.name = ''
      this.website = ''
      this.username = ''
      this.password = ''
      this.$emit('close-popup')
    },
    changeToUpdate(){
      this.isUpdate = true
      // Set the temporary values to the original card values when switching to editing mode
      this.tempCard = { ...this.cardToUpdate };
    },
    emitPopup(){
      this.$emit('show-popup')
      this.popupBoxUpdate = false
      this.resetData(); // Call resetData() when closing the popup
    },
    resetData() {
      this.name = "";
      this.website = "";
      this.username = "";
      this.password = "";
    },
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