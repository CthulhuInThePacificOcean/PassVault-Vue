<template>
    <ContentView v-for="file in files" :key="file.content.name" :file="file" @show-popup="$emit('show-popup')" @edit-card="editCard"/>
</template>

<script>
import ContentView from './ContentView.vue';

export default {
    components: {
        ContentView
    },
    props: {
        files: Array  
    },
    emits: ['show-popup'],
    methods: {
        editCard(card){
            this.$emit('edit-card', card)
        }
    }
}
</script>