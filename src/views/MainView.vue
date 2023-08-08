<template>
  <PopupBox
    v-show="cardCreationVisible"
    @show-popup="showPopup"
    @close-popup="closePopup"
    :activeId="this.activeId"
    :files="files"
    :cardToUpdate="cardToUpdate"
    :popupBoxUpdate="popupBoxUpdate"
  />
  <div class="flex-container">
    <div class="flex-item flex-item-1">
      <button id="new-folder-button" @click="toggleFileCreation">
        Create new file
      </button>
      <div id="box-1" v-show="fileCreationVisbile">
        <FileForm
          @toggle-file-creation="toggleFileCreation"
          @add-file="addFile"
          :fileFormUpdate = 'fileFormUpdate'
          :folderToUpdate = 'folderToUpdate'
          @close-file-creation="closeFileCreation"
          @update-file="updateFile"
        />
      </div>
      <FileList
        :files="this.files"
        :fileContents="this.fileContents"
        @delete-file="deleteFile"
        @add-active="addActive"
        @edit-folder="emitUpdateFolder"
        id="file-list"
      />
    </div>
    <div class="flex-item flex-item-2" id="box-2">
      <ContentList
        :files="files"
        @show-popup="showPopup"
        @edit-card="emitUpdateCard"
      />
    </div>
  </div>
</template>

<script>
import ContentList from "@/components/ContentList.vue";
import FileList from "@/components/FileList.vue";
import FileForm from "@/components/FileForm.vue";
import PopupBox from "@/components/PopupBox.vue";

export default {
  name: "Main",
  components: {
    ContentList,
    FileList,
    FileForm,
    PopupBox,
  },
  data() {
    return {
      fileCreationVisbile: false,
      files: [],
      fileContents: [],
      cardCreationVisible: false,
      activeId: "",
      cardToUpdate: {},
      folderToUpdate: {},
      popupBoxUpdate: false,
      fileFormUpdate: false
    };
  },
  computed: {},
  methods: {
    emitUpdateCard(targetCard) {
      this.cardToUpdate = targetCard;
      this.popupBoxUpdate = true;
      this.showPopup()
    },
    emitUpdateFolder(targetFolder) {
      this.folderToUpdate = targetFolder;
      this.fileFormUpdate = true;
      this.toggleFileCreation()
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
      this.fileCreationVisbile = true;
    },

    closeFileCreation() {
      this.fileCreationVisbile = false;
      this.fileFormUpdate = false
    },

    showPopup() {
      this.cardCreationVisible = true;
    },
    closePopup(){
      this.cardCreationVisible = false
      this.popupBoxUpdate = false
    },
    addFile(file) {
      this.files = [...this.files, file];
      this.fileContents = [...this.fileContents, file.content];
    },
    updateFile(file){
      const fileIndex = this.files.indexOf(file)
      this.files.splice(fileIndex, 1, file)
    },
    deleteFile(file) {
      if (confirm("Are you sure you want to delete this file")) {
        const fileIndex = this.files.indexOf(file);
        this.files.splice(fileIndex, 1);
      }
    },

    addActive(id) {
      this.files.forEach((file) => {
        file.isActive = false;
      });
      const fileIndex = this.files.indexOf(id);
      this.files = this.files.map((file) =>
        this.files[fileIndex] === file
          ? { ...file, isActive: !file.isActive }
          : file
      );
    },
    
  },
  emits: ["add-file", "add-active", "show-popup"],
};
</script>
