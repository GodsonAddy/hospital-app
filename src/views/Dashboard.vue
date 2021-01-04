<template>
  <div>

    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title md-toolbar-section-start" v-if='loggedIn' style="flex: 1">Welcome, {{currentUser}}</h3>
      <md-button>Refresh</md-button>
      <md-button class="md-primary" @click="LogOut()">Logout</md-button>
    </md-toolbar>

   <div>
     <Navigator />
   </div>
  
  </div>
</template>

<script>
  import Navigator from '@/components/Navigator.vue'
  import firebase from 'firebase'

  export default {
    name: 'user',
    components: {
      Navigator
    },
    data() {
      return {
        loggedIn: false,
        currentUser: false
      }
    },
    created() {
      if(firebase.auth().currentUser) {
        this.loggedIn = true
        this.currentUser = firebase.auth().currentUser.email
      }
    },
    methods : {
      LogOut() {
        firebase.auth().signOut()
        .then(user => {
          this.$router.go({path: this.$router.path})
          console.log(user.data)
        })
        .catch( err => {
          console.log(err)
        })

        
      }

    },
    
  }
</script>

<style lang="scss" scoped>
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
</style>

