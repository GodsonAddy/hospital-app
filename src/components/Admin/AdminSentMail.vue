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
            <div class="md-subhead">To: {{item.receipient}}  </div>
            <div>Date: {{item.date.toDate() | date}} </div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions >

              <div>
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
  </div>
</template>

<script>
 import AdminDashboard from '../Admin/AdminDashboard'
 import firebase from 'firebase'

  export default {
   name: "AdminSentMail",
   components: {
    AdminDashboard
   },
    data(){
      return{
        inbox: [],
        showDialog: false,
        loading: false,
      }
    },
    created() {
      let userId = firebase.auth().currentUser.email
      firebase.firestore().collection(`users/${userId}/comments`)
      .orderBy("date", "desc").get()
      .then( querySnapshot => {
        querySnapshot.forEach(doc => {
          const {seconds, nanoseconds } = doc.data().date;
          const { title, receipient, content} = doc.data()
          const data = {
            "key": doc.id,
            "title": title,
            "receipient": receipient,
            "content": content,
            date: new firebase.firestore.Timestamp(seconds, nanoseconds)
          }
          this.inbox.push(data)

        })   
      })
    },
    methods: {
      deleteMessage(id){
        let userId = firebase.auth().currentUser.email
        if (this.$fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$fire({
              type:'success',
              title:'Deleted!',
              text:'Your file has been deleted.'
            })
          }
        })) 
        {
          firebase.firestore().collection(`users/${userId}/comments`)
          .doc(id).delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          })
        }
      },     
    }


  }
</script>

<style lang="scss" scoped >
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
 

</style>