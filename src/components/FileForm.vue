<template>
    <div id="fileForm">
          <button type="button" id="close-button" @click="$emit('toggle-file-creation')">
            X
          </button>
          <label for="file-name">What would you like to call this file?</label>
          <input type="text" name="file-name" id="file-name" v-model="name"/>
          <button type="button" id="createFolder" @click="onSubmit">Create Folder.</button>
        </div>
</template>

<script>  
export default {
    name: 'FileForm',
    data(){
        return{
            name: '',
            isActive: false
        }
    },
    emits: ['toggle-file-creation', 'add-file'],
    methods: {
        onSubmit(e){
            e.preventDefault()
            const item = {
                name: this.name,
                isActive: false,
                content: {
                    name: this.name,
                    passCardList: []
                }
            }
            this.$emit('add-file', item)
            this.name = ''
        }
    }
}
</script>