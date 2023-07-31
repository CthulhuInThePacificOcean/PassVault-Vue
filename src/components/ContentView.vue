<template>
    <ul>
        <AddButton @click="$emit('toggle-popup')"/>
    </ul>
</template>

<script>
import PassCard from './PassCard.vue';
import AddButton from './AddButton.vue'
export default {
    data(){
        return {
            passCards: []
        }
    },
    methods: {
        
    }
}
</script>