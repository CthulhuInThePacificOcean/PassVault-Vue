<template>
  <ul :class="[file.isActive ? 'active-tab' : '', 'tab-content']">
    <AddButton
      class="add-button"
      @show-popup="$emit('show-popup', file.name)"
    />
    <PassCard
      v-for="card in file.content.passCardList"
      :key="card"
      :card="card"
      @delete-card="deleteCard"
      @edit-card="editCard" 
    />
  </ul>
</template>

<script>
import PassCard from "./PassCard.vue";
import AddButton from "./AddButton.vue";
export default {
  props: {
    file: Object,
  },
  components: {
    AddButton,
    PassCard,
  },
  data() {
    return {
      fileHolder: this.file,
    };
  },
  emits: ["show-popup"],
  methods: {
    deleteCard(targetCard) {
      this.fileHolder.content.passCardList.forEach((card) => {
        if (card == targetCard) {
          const cardIndex = this.fileHolder.content.passCardList.indexOf(card);
          this.fileHolder.content.passCardList.splice(cardIndex, 1);
        }
      });
    },
    editCard(card){
      this.$emit('edit-card', card)
    }
  },
};
</script>
