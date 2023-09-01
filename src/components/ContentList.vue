<template>
  <input
    type="text"
    name="searchBar"
    id="searchBar"
    placeholder="search for a card"
    v-model="searchItem"
  />
  <ContentView
    v-for="file in userFiles"
    :userFiles="userFiles"
    :key="file.content.name"
    :file="file"
    :searchItem = "searchItem"
    @show-popup="$emit('show-popup')"
    @edit-card="editCard"
    @save-file="$emit('save-file')"
    @log-folder="logFolder"
  />
</template>

<script>
import ContentView from "./ContentView.vue";
import { mapState } from "vuex";

export default {
  components: {
    ContentView,
  },
  data(){
    return {
        searchItem: ''
    }
  },
  props: {
    files: Array,
    userFiles: Array,
    fileContents: Array,
    userFileContents: Array,
  },
  emits: ["show-popup", "save-file", "edit-card", "log-folder"],
  methods: {
    editCard(card) {
      this.$emit("edit-card", card);
    },
    logFolder() {
      console.log(this.userFiles);
    },
  },
};
</script>

<style scoped>
  input {
    max-height: 50px;
  }
</style>
