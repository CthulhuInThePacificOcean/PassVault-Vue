<template>
    <div id="file-list">
        <FileItem  :key="file" v-for="file in userFiles" :file="file" @delete-file="$emit('delete-file', file)"  @add-active="$emit('add-active', file)" @edit-folder='editFolder'/>
    </div>   
</template>
<script>
import FileItem from './FileItem.vue'
import { mapState } from 'vuex';

export default {
    emits: ['add-active', 'delete-file'],
    props: {
        files: Array,
        userFiles: Array
    },
    components: {
        FileItem
    },
    // computed: {
    //     ...mapState(['userFiles']),
    //     files() {
    //         console.log('computed')
    //         return this.userFiles;
    //     }
    // },
    methods: {
        editFolder(folder){
            this.$emit('edit-folder', folder)
        }
    }
}
</script>