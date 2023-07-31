<template>
  <div class="flex-container">
    <div class="flex-item flex-item-1">
      <button id="new-folder-button" @click="toggleFileCreation">
        Create new file
      </button>
      <div id="box-1" v-show="fileCreationVisbile">
        <FileForm
          toggle-file-creation="toggleFileCreation"
          @add-file="addFile"
        />
      </div>
      <FileList :files="this.files" :fileContents="this.fileContents" @delete-file="deleteFile" @add-active="addActive" id="file-list"/>
    </div>
    <div class="flex-item flex-item-2" id="box-2">
      <ContentList :file-contents="fileContents" :files="files"/>
    </div>
  </div>
</template>

<script>
import ContentList from "@/components/ContentList.vue";
import FileList from "@/components/FileList.vue";
import FileForm from "@/components/FileForm.vue";

export default {
  name: "Main",
  components: {
    ContentList,
    FileList,
    FileForm,
  },
  data() {
    return {
      fileCreationVisbile: false,
      files: [],
      fileContents: [],
    };
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

    toggleFileCreation() {
      this.fileCreationVisbile = !this.fileCreationVisbile;
    },

    addFile(file, content) {
      this.files = [...this.files, file];
      this.fileContents = [this.fileContents, content];
    },

    deleteFile(file) {
      if (confirm("Are you sure you want to delete this file")) {
        const fileIndex = this.files.indexOf(file);
        this.files.splice(fileIndex, 1);
      }
    },

    addActive(id) {
      this.files.forEach(file => {
        file.isActive = false
      })
      const fileIndex = this.files.indexOf(id);
      this.files = this.files.map((file) => this.files[fileIndex] === file
      ? {...file, isActive: !file.isActive} : file)
    },
  },
  emits: ["add-file", "add-active"],
};
</script>
