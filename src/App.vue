<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/main">Main</router-link> |
    <router-link to="/generator">Password Generator</router-link>
  </nav>
  <router-view />
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteNote(noteId) {
      let confirmDel = confirm("Are you sure you want to delete this note?");
      if (!confirmDel) return;
      daFiles[activeTabIndex].notes.splice(noteId, 1); //removing selected note from array/tasks
      //saving updated notes to local storage
      showNotes(flex2.children[activeTabIndex], daFiles[activeTabIndex]);
    },

    updateNote(noteId, name, site, user, pass) {
      isUpdate = true;
      updateId = noteId;
      addButtons[noteId].click();
      nameTag.value = name;
      siteTag.value = site;
      userTag.value = user;
      passTag.value = pass;
      addBox.innerText = "Update Note";
      popupTitle.innerText = "Update a Note";
    },
  },
};
</script>
<style></style>
