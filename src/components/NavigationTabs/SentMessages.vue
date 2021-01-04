<template>
  <div class="card-expansion">
    
    <div v-for="item in inbox" v-bind:key="item.key" >
      <md-card>
        <md-card-header>
          <div class="md-title">
            Title: {{item.title}}
          </div>
          <div class="md-subhead">From: {{item.author}}  </div>
          <div>Date: {{item.date.toDate() | date}} </div>
        </md-card-header>

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button @click="replyMessage()">
                <md-icon class="md-primary" >reply</md-icon>
                <md-tooltip md-direction="bottom">reply</md-tooltip>
              </md-button>
              <md-button @click="deleteMessage(item.key)">
                <md-icon class="md-accent" >delete</md-icon>
                <md-tooltip md-direction="bottom">delete</md-tooltip>
              </md-button>
            </div>

            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content>

            <md-card-content>
              <strong> {{item.content}} </strong>
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>

      
    </div>
  </div>
</template>


<script>
  import firebase from 'firebase'

  export default {
    name: "SentMessages",
    data(){
      return{
        inbox: [],
      
      }
    },
    created() {
      let userId = firebase.auth().currentUser.email
      firebase.firestore().collection('users' + userId).get()
      .then( querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            "key": doc.id,
            "title": doc.data().title,
            "author": doc.data().author,
            "content": doc.data().content,
            date: new firebase.firestore.Timestamp.fromDate(new Date())
          }
          this.inbox.push(data)

        })
          
          
      })
    },
    methods: {
      deleteMessage(){
        let userId = firebase.auth().currentUser.email
        if (window.confirm("Do you really want to delete?")) {
          firebase.firestore().collection("users").doc(userId).delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          })
        }
      },
      replyMessage(){
      
      }
            
    }
  }
</script>

<style lang="scss" scoped>
  
  .card-expansion {
    height: 480px;
    overflow: auto;
  }

  .md-card {
    width: 520px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
  }
</style>

 