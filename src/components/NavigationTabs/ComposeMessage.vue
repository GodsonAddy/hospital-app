<template>
  <div class="control">
      <form >
     <md-content class="md-elevation-2"> 
         <md-field>
      <label>To</label>
      <md-input v-model="recepient" disabled></md-input>
    </md-field>

    <md-field>
      <label>Card Number</label>
      <md-input v-model="sender" placeholder="Your Hospital Card Number"></md-input>
    </md-field>

    <md-field>
      <label>File</label>
      <md-file v-model="file" />
    </md-field>

    <md-field>
      <label>Message</label>
      <md-textarea v-model="content"></md-textarea>
    </md-field>

     <md-button  class="md-raised md-primary" v-if="!loading" @click.prevent="SendMessage" >
       Send
      </md-button>
     <md-button  class="md-raised md-primary" v-if="loading" disabled >
       <loading-component></loading-component>
      </md-button>
     </md-content>
     </form>
      
  </div>
</template>

<script>
  import LoadingComponent from '@/components/LoadingComponent.vue'

  export default {
    name: 'ComposeMessage',
    components: {
      LoadingComponent
      
    },
    data() {
      return {
        file: "",
        content: "",
        sender: "",
        recepient: "admin",
        loading: false
      }
    }, 
    methods: {
      SendMessage() {
        this.loading = true
        this.$axios.post("http://localhost:3000/api/messages", {
          file: this.file,
          content: this.content,
          sender: this.sender,
          recepient: this.recepient
        })
        .then((res) => {
          this.loading = false
          console.log(res)
          this.AlertMessage()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
        
      },
      AlertMessage() {
        alert("Your message has been sent")
      
      }
    }
  }
</script>

<style lang="scss" scoped>
 .md-content {
     margin: 50px 0px 0px 350px;
     padding: 20px;
     height: 100%;
     width: 600px;
     justify-content: center;
     align-items: center;
 }
  
</style>