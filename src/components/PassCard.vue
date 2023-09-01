<template>
  <li class="note" :style=" {backgroundColor: card.color }">
    <div class="details">
      <p>Name: {{ card.name }}</p>
      <p>Link: {{ card.website }}</p>
      <p>Username: {{ card.username }}</p>
      <p type="password" v-if="viewPass">Password: {{ card.password }}</p>
      <p type="password" v-else>Password: *******</p>
    </div>
    <div class="settings show" @click="changeView" v-if="this.isClicked">
      <i class="uil uil-ellipsis-h"></i>
      <ul class="menu" :style=" {backgroundColor: card.color }">
        <li @click="showPass" v-if="viewPass"><i class="uil uil-eye-slash"></i>Hide Password</li>
        <li @click="showPass" v-else><i class="uil uil-eye"></i>View Password</li>
        
        <li @click="editCard"><i class="uil uil-pen"></i>Edit</li>
        <li @click="deleteCard"><i class="uil uil-trash"></i>Delete</li>
      </ul>
    </div>
    <div class="settings" @click="changeView" v-else>
      <i class="uil uil-ellipsis-h"></i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data() {
    return {
      isClicked: false,
      needsUpdate: false,
      viewPass: false
    };
  },
  methods: {
    changeView(){
      this.isClicked = !this.isClicked
    },
    deleteCard(){
      console.log(this.card)
      this.$emit('delete-card', this.card)
    },
    emitCard(){
      this.needsUpdate = true
      this.$emit('edit-card', this.card)
    },
    editCard() {
      this.isClicked = true;
      // Emit an event to the parent to indicate that the "Edit" button is clicked
      this.$emit("edit-card", this.card);
    },
    showPass(){
      this.viewPass = !this.viewPass
    }
  },
  emits: ['delete-card', 'edit-card']
};
</script>
