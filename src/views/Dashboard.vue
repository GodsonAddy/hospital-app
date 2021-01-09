<template>
  <div>

    <md-toolbar class="md-primary" md-elevation="1">

      <span class="md-title md-toolbar-section-start" v-if='loggedIn' style="flex: 1">
        Welcome, {{currentUser}}
      </span>

      <div>
        <md-button class="md-primary" @click="LogOut()">Logout</md-button>
      </div>

    </md-toolbar>
     
    <Navigator />
   
  </div>
</template>

<script>
  import firebase from 'firebase'
  import Navigator from '@/components/Navigator.vue'

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

