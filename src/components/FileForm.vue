<template>
  <div id="fileForm">
    <button
      type="button"
      id="close-button"
      @click="$emit('close-file-creation')"
    >
      X
    </button>
    <label for="file-name" v-if="fileFormUpdate"
      >What would you like to change the folder name to?</label
    >
    <label for="file-name" v-else>What would you like to call this file?</label>
    <input type="text" name="file-name" id="file-name" v-model="name" />
    <button
      type="button"
      id="createFolder"
      @click="onSubmit"
      v-if="fileFormUpdate"
    >
      Update Folder.
    </button>
    <button type="button" id="createFolder" @click="onSubmit" v-else>
      Create Folder.
    </button>
  </div>
</template>

<script>
export default {
  name: "FileForm",
  data() {
    return {
      name: "",
      isActive: false,
      tempFile: {},
      isUpdate: false,
    };
  },
  props: {
    fileFormUpdate: Boolean,
    folderToUpdate: Object,
  },
  emits: ["toggle-file-creation", "add-file"],
  watch: {
    folderToUpdate: {
      immediate: true,
      handler(newValue) {
        this.name = newValue.name || "";
        this.tempFile = { ...newValue };
      },
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.name) {
        alert("Please enter a name for the file.");
        return;
      }
      if (this.fileFormUpdate) {
        this.folderToUpdate.name = this.name
        console.log(this.folderToUpdate)
        this.$emit('update-file', this.folderToUpdate)
      } else {
        const item = {
          name: this.name,
          isActive: false,
          content: {
            name: this.name,
            passCardList: [],
          },
        };
        this.$emit("add-file", item); 
      }

      this.name = "";
      this.$emit('close-file-creation')
    },
    resetData() {
      this.name = "";
    },
  },
};
</script>
