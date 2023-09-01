<template>
  <li
    :class="[file.isActive ? 'active-tab' : '', 'tab-title']"
    :style=" {backgroundColor: file.isActive || isHovered? file.hoverColor : file.color,
      transition: 'background-color 0.3s' }"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false"
    @click="$emit('add-active', file)"
  >
    <span>
      <p>{{ file.name }}</p>
    </span>
    <i class="uil uil-trash" @click="$emit('delete-file', file)"></i>
    <i class="uil uil-pen" @click="editFolder"></i>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    file: Object,
  },
  data() {
    return {
      isClicked: false,
      isHovered: false
    };
  },
  emits: ["delete-file", "add-active", "edit-folder"],
  methods: {
    editFolder() {
      this.isClicked = true;
      // Emit an event to the parent to indicate that the "Edit" button is clicked
      this.$emit("edit-folder", this.file);
    },
  },
};
</script>
