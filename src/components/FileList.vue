<template>
    <div id="file-list">
        <FileItem  :key="file" v-for="file in files" :file="file" @delete-file="$emit('delete-file', file)"  @add-active="$emit('add-active', file)" @edit-folder='editFolder'/>

    </div>   
</template>
<script>
import FileItem from './FileItem.vue'

export default {
    emits: ['add-active', 'delete-file'],
    props: {
        files: Array,
    },
    components: {
        FileItem
    },
    methods: {
        editFolder(folder){
            this.$emit('edit-folder', folder)
        }
    }
}
</script>