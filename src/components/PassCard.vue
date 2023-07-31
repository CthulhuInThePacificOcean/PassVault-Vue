<template>
  <li class="note">
    <div class="details">
      <p>Name: ${note.name}</p>
      <p>Link: ${note.site}</p>
      <p>Username: ${note.username}</p>
      <p>Password: ${note.password}</p>
    </div>
    <div class="settings">
      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
      <ul class="menu">
        <!--<li @click="updateNote(${index}, '${note.name}', '${note.site}', '${note.username}', '${note.password}')"><i class="uil uil-pen"></i>Edit</li>
            <li @click="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>-->
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: ["click"],
  data() {
    return {};
  },
};
</script>
