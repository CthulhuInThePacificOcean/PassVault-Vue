<template>
    <li :class="[file.isActive ? 'active-tab' : '', 'tab-title']" @click="$emit('add-active', file)">
        <i class="uil uil-trash" @click="$emit('delete-file', file)"></i>
        <p>{{ file.name }}</p>
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