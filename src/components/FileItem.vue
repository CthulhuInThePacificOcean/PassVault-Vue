<template>
    <li :class="[file.isActive ? 'active-tab' : '', 'tab-title']">
        <i class="uil uil-trash" @click="$emit('delete-file', file)"></i>
        <p @click="$emit('add-active', file)">{{ file.name }}</p>
    </li>
</template>

<script>
export default {
    components: {},
    props: {
        file: Object,
    },
    data(){
        return{

        }
    },
    emits: ['delete-file', 'add-active']
}
</script>