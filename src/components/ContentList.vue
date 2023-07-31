<template>
    <ContentView v-for="fileContent in fileContents" :key="fileContent" @content-active="$emit('content-active', content)"/>
</template>

<script>
import ContentView from './ContentView.vue';

export default {
    components: {
        ContentView
    },
    props: {
        fileContents: Array,
        files: Array  
    }
}
</script>