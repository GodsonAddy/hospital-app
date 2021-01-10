<template>
  <div>
    <Users />
      
    <md-content class="md-elevation-2"> 
      <md-field>
        <label>Title</label>
        <md-input v-model="title" ></md-input>
      </md-field>

      <md-field>
        <label>To</label>
        <md-input v-model="receipient" disabled></md-input>
      </md-field>

       <md-field>
        <label>From</label>
        <md-input v-model="author" disabled></md-input>
      </md-field>

      <md-field>
        <label>Message</label>
        <md-textarea v-model="content"></md-textarea>
      </md-field>

     <md-button  class="md-raised md-primary" v-if="!loading" @click="SendMessage()" >
       Send
      </md-button>
     <md-button  class="md-raised md-primary" v-if="loading" disabled >
       <loading-component></loading-component>
      </md-button>

    </md-content>
     
  </div>
</template>

<script>
  import LoadingComponent from '@/components/LoadingComponent.vue'
  import firebase from 'firebase'
  import 'firebase/database'
  import Users from '@/views/Users.vue'

  export default {
    name: 'ComposeMessage',
    components: {
      LoadingComponent,
      Users
      
    },
    data() {
      return {
        content: "",
        title: "",
        receipient: "admin@admin.com",
        loading: false,
        author: firebase.auth().currentUser.email
      }
    }, 
    methods: {
     
      SendMessage() {
        let userId = firebase.auth().currentUser.email
        this.loading = true
        return firebase.firestore().collection(`users`).doc(userId)
        .collection('post')
        .add({
          receipient: this.receipient,
          title: this.title,
          content: this.content,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
          author: this.author
          
        })
        .then(res => {
          this.loading = false
          this.$fire({
            type: "success", 
            title: "Message successfully sent", 
            text: `${firebase.auth().currentUser.email}`
          })
          this.title = ''
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