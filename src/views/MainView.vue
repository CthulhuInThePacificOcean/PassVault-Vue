<template>
  <div v-if="!loggedIn">
    <div v-if="showLogin">
        <Login @loggedIn="loggedIn = true"/>
        <p>Don't have an account? <span class="link" @click="showLogin = false">Register</span></p>
    </div>
    <div v-else>
      <Register @loggedIn="loggedIn = true"/>
      <p>Already have an account? <span class="link" @click="showLogin = true">Login</span></p>
    </div>
  </div>
  <div v-else>
      <PopupBox
        v-show="cardCreationVisible"
        @show-popup="showPopup"
        @close-popup="closePopup"
        :activeId="this.activeId"
        :files="files"
        :cardToUpdate="cardToUpdate"
        :popupBoxUpdate="popupBoxUpdate"
      />
      <h1>Welcome {{ displayName }}</h1>
      <button @click="signOut">Sign Out</button>
      <div class="flex-container">
        <div class="flex-item flex-item-1">
          <button id="new-folder-button" @click="toggleFileCreation">
            Create New Folder
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 -200 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM632 577c0 3.8-3.4 7-7.5 7H540v84.9c0 3.9-3.2 7.1-7 7.1h-42c-3.8 0-7-3.2-7-7.1V584h-84.5c-4.1 0-7.5-3.2-7.5-7v-42c0-3.8 3.4-7 7.5-7H484v-84.9c0-3.9 3.2-7.1 7-7.1h42c3.8 0 7 3.2 7 7.1V528h84.5c4.1 0 7.5 3.2 7.5 7v42z"
              ></path>
            </svg>
          </button>
          <div id="box-1" v-show="fileCreationVisbile">
            <FileForm
              @toggle-file-creation="toggleFileCreation"
              @add-file="addFile"
              :fileFormUpdate="fileFormUpdate"
              :folderToUpdate="folderToUpdate"
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
    </div>
</template>

<script>
import ContentList from "@/components/ContentList.vue";
import FileList from "@/components/FileList.vue";
import FileForm from "@/components/FileForm.vue";
import PopupBox from "@/components/PopupBox.vue";
import { auth } from "../firebase/init.js";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Main",
  components: {
    ContentList,
    FileList,
    FileForm,
    PopupBox,
    Login,
    Register
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
      loggedIn: false,
      popupBoxUpdate: false,
      fileFormUpdate: false,
      displayName: "",
      showLogin: true,
      email: "",
      password: "",
      username: ""
    };
  },
  beforeCreate() {
    if (this.isLoggedIn == false) {
      this.$router.push({ name: "login" });
    }
  },
  beforeUpdate() {
    if (auth.currentUser) {
      // set local 'displayName' to user's displayName
      this.displayName = auth.currentUser.displayName;
    }
  },
  methods: {
    emitUpdateCard(targetCard) {
      this.cardToUpdate = targetCard;
      this.popupBoxUpdate = true;
      this.showPopup();
    },
    emitUpdateFolder(targetFolder) {
      this.folderToUpdate = targetFolder;
      this.fileFormUpdate = true;
      this.toggleFileCreation();
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
      this.fileFormUpdate = false;
    },

    showPopup() {
      this.cardCreationVisible = true;
    },
    closePopup() {
      this.cardCreationVisible = false;
      this.popupBoxUpdate = false;
    },
    addFile(file) {
      this.files = [...this.files, file];
      this.fileContents = [...this.fileContents, file.content];
    },
    updateFile(file) {
      const fileIndex = this.files.indexOf(file);
      this.files.splice(fileIndex, 1, file);
      this.addActive(file);
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
      this.fileContents.forEach((fileContent) => {
        fileContent.isActive = false;
      });
      const fileIndex = this.files.indexOf(id);
      this.files = this.files.map((file) =>
        this.files[fileIndex] === file
          ? { ...file, isActive: !file.isActive }
          : file
      );
    },
    signOut() {
      signOut(auth).then(() => {
        this.loggedIn = false
      });
    },
  },
  emits: ["add-file", "add-active", "show-popup"],
};
</script>

<style scoped>
  .link{
    cursor: pointer;
    color: blue
  }

  .link:hover{
    text-decoration: underline;
  }
</style>
