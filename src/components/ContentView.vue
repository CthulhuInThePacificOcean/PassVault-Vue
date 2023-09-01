<template>
  <ul :class="[file.isActive ? 'active-tab' : '', 'tab-content']">
    <AddButton
      class="add-button"
      @show-popup="$emit('show-popup', file.name)"
    />
    <PassCard
      v-for="card in displayedCards"
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
import { auth } from "../firebase/init";

export default {
  props: {
    file: Object,
    userFiles: Array,
    searchItem: String
  },
  components: {
    AddButton,
    PassCard,
  },
  data() {
    return {
      fileHolder: this.file,
      cardIndex: -1,
      userId: auth.currentUser.uid,
    };
  },
  computed: {
    displayedCards() {
      if (this.searchItem.trim() === "") {
        return this.file.content.passCardList;
      } else {
        return this.file.content.passCardList.filter((card) =>
          card.name.toLowerCase().includes(this.searchItem.toLowerCase()) ||
          card.username.toLowerCase().includes(this.searchItem.toLowerCase()) ||
          card.website.toLowerCase().includes(this.searchItem.toLowerCase())
        );
      }
    },
  },
  methods: {
    deleteCard(targetCard) {
      console.log(targetCard);
      this.$emit("log-folder");
      if (!confirm("Are you sure you want to delete this card?")) {
        console.log("Cancelled");
        return;
      } else {
        const cardIndex = this.file.content.passCardList.findIndex((card) =>
          this.areCardsEqual(card, targetCard)
        );
        console.log(cardIndex);
        console.log(this.file);
        console.log(this.userFiles);
        console.log(this.userId);
        if (cardIndex !== -1) {
          this.file.content.passCardList.splice(cardIndex, 1);
          this.$emit("save-file", this.userId);
          console.log("Card deleted");
          this.$emit("log-folder");
        } else {
          console.log("Card not found");
        }
      }
    },

    editCard(card) {
      this.$emit("edit-card", card);
    },

    areCardsEqual(card1, card2) {
      console.log("Card 1:", card1);
      console.log("Card 2:", card2);
      console.log("Name Match:", card1.name === card2.name);
      console.log("Username Match:", card1.username === card2.username);
      console.log("Site Match:", card1.website === card2.website);
      console.log("Password Match:", card1.password === card2.password);
      console.log("Color Match:", card1.color === card2.color);

      return (
        card1.name === card2.name &&
        card1.username === card2.username &&
        card1.website === card2.website &&
        card1.password === card2.password &&
        card1.color === card2.color
      );
    },
  },
  emits: ["save-file", "show-popup", "edit-card"],
};
</script>
