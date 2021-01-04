<template>
  <div class="control">
      <form >
     <md-content class="md-elevation-2"> 
         <md-field>
      <label>Title</label>
      <md-input v-model="title" ></md-input>
    </md-field>

    <md-field>
      <label>From</label>
      <md-input v-model="author" placeholder="Author"></md-input>
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
  import firebase from 'firebase'
  import 'firebase/database'

  export default {
    name: 'ComposeMessage',
    components: {
      LoadingComponent
      
    },
    data() {
      return {
        content: "",
        title: "",
        author: "",
        loading: false
      }
    }, 
    methods: {
     
      SendMessage() {
        let userId = firebase.auth().currentUser.email
        this.loading = true
        return firebase.firestore().collection('users' + userId ).add({
          author: this.author,
          title: this.title,
          content: this.content,
          date: firebase.firestore.Timestamp.fromDate(new Date())
          
        })
        .then(res => {
          this.loading = false
          alert(`Message successfully sent, ${firebase.auth().currentUser.email}`)
          this.title = ''
          this.author = ''
          this.content = ''
          console.log(res)

        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
      },
     
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