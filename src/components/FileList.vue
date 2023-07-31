<template>
    <div id="file-list">
        <FileItem  :key="file" v-for="file in files" :file="file" @delete-file="$emit('delete-file', file)" @add-active="$emit('add-active', file)"/>

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
    }
}
</script>