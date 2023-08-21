<template>
  <li class="note">
    <div class="details">
      <p>Name: {{ card.name }}</p>
      <p>Link: {{ card.website }}</p>
      <p>Username: {{ card.username }}</p>
      <p>Password: {{ card.password }}</p>
    </div>
    <div class="settings show" @click="changeView" v-if="this.isClicked">
      <i class="uil uil-ellipsis-h"></i>
      <ul class="menu" >
        <li @click="editCard"><i class="uil uil-pen"></i>Edit</li>
        <li @click="$emit('delete-card', card)"><i class="uil uil-trash"></i>Delete</li>
      </ul>
    </div>
    <div class="settings" @click="changeView" v-else>
      <i class="uil uil-ellipsis-h"></i>
      <ul class="menu" >
        <li @click="editCard"><i class="uil uil-pen" ></i>Edit</li>
        <li  @click="$emit('delete-card', card)"><i class="uil uil-trash"></i>Delete</li>
      </ul>
      <ul class="menu">
      </ul>
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
      needsUpdate: false
    };
  },
  methods: {
    changeView(){
      this.isClicked = !this.isClicked
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
  }
};
</script>
