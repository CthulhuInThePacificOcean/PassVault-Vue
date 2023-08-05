<template>
    <li class="add-button" @click="$emit('show-popup', false)">Add a PassCard</li>
</template>

<script>
export default {
    props: {
        passCardItem: Object
    }
}
</script>