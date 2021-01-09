<template>
  <div>
    <AdminDashboard />

    <br />

    <div class="card-expansion">
      
      <div v-for="item in inbox" v-bind:key="item.key" >
        <md-card>
          <md-card-header>
            <div class="md-title">
              Title: {{item.title}}
            </div>
            <div class="md-subhead">From: {{item.author}}  </div>
            <div class="md-subhead">To: {{item.receipient}}  </div>
            <div>Date: {{item.date.toDate() | date}} </div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              
               <!-- Reply button -->
              <div>
                <md-dialog :md-active.sync="showDialog">
                  <md-dialog-title>Reply Message</md-dialog-title>

                   <md-field>
                    <label>Title</label>
                    <md-input v-model="title" ></md-input>
                   </md-field>

                   <md-field>
                    <label>To</label>
                    <md-input v-model="receipient"></md-input>
                   </md-field>

                    <md-field>
                      <label>Message</label>
                      <md-textarea v-model="content"></md-textarea>
                    </md-field>

                    <md-dialog-actions>
                     <md-button class="md-primary"  v-if="!loading" @click="replyMessage(item.key)" >Send</md-button>
                     <md-button  class="md-raised md-primary" disabled v-if="loading">
                       <loading-component></loading-component>
                     </md-button>
                    </md-dialog-actions>
                </md-dialog>

                <md-button @click="showDialog = true">
                  <md-icon class="md-primary" >reply</md-icon>
                  <md-tooltip md-direction="bottom">reply</md-tooltip>
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
  </div>
</template>

<script>
 import AdminDashboard from '../Admin/AdminDashboard'
 import firebase from 'firebase'
 import LoadingComponent from '@/components/LoadingComponent.vue'

 export default {
  name: "AdminInbox",
  components:{
   AdminDashboard,
   LoadingComponent
  },
  data(){
    return{
      inbox: [],
      showDialog: false,
      loading: false,
      title: "",
      receipient: "",
      content: ""
    }
  },
  created() {
    firebase.firestore().collectionGroup('post').where("receipient", "==", "admin@admin.com")
    .orderBy("date", "desc").get()
    .then( querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        const {seconds, nanoseconds } = doc.data().date;
        const { title, receipient, content, author} = doc.data()
        const data = {
          "key": doc.id,
          "title": title,
          "receipient": receipient,
          "content": content,
          "author": author,
          date: new firebase.firestore.Timestamp(seconds, nanoseconds)  
        }
        this.inbox.push(data)
        console.log(`Found document at ${doc.ref.path}`)

      })   
    })
    
  },
  methods: {
    replyMessage(){
      this.loading = true
      let userId = firebase.auth().currentUser.email
      firebase.firestore().collection('users').doc(userId).collection('comments')
      .add({
        title: this.title,
        content: this.content,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        receipient: this.receipient,
        userId
      })
      .then(res => {
        this.loading = false
        this.$fire({
          type: "success",
          title: "Message successfully sent", 
          text: `${firebase.auth().currentUser.email}`
        })
        this.content = '',
        this.title = '',
        this.receipient = '',
        console.log(res)
        this.loading = false
      })
      .catch(error => {
        console.log(error)
          
      })
      
    },
    comments(){
      firebase.firestore().collectionGroup('comments').where("receipient", "==", "admin@admin.com")
      .orderBy("date", "desc").get()
      .then( querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          const {seconds, nanoseconds } = doc.data().date;
          const { title, receipient, content, author} = doc.data()
          const data = {
            "key": doc.id,
            "title": title,
            "receipient": receipient,
            "content": content,
            "author": author,
            date: new firebase.firestore.Timestamp(seconds, nanoseconds)  
          }
          this.inbox.push(data)
          console.log(`Found document at ${doc.ref.path}`)
        })   
      })
    }
     
  },

}
</script>

<style lang='scss' scoped>
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
    max-height: 100%
  }
  .md-dialog /deep/.md-dialog-container {
    width: 500px;
    height: 500px;
    padding: 30px 30px 20px 30px;
    overflow: auto;
  }
  
</style>