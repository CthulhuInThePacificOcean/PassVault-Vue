<template>
    <ContentView v-for="file in userFiles" :key="file.content.name" :file="file" @show-popup="$emit('show-popup')" @edit-card="editCard" @save-file="$emit('save-file')"/>
</template>

<script>
import ContentView from './ContentView.vue';
import { mapState } from 'vuex';

export default {
    components: {
        ContentView
    },
    props: {
        files: Array ,
        userFiles: Array,
        fileContents: Array,
        userFileContents: Array
    },
    emits: ['show-popup'],
    // computed: {
    //     ...mapState(['fileContents']),
    //     fileContents() {
    //         return this.fileContents.map(content => ({ content }));
    //     }
    // },
    methods: {
        editCard(card){
            this.$emit('edit-card', card)
        }
    }
}
</script>