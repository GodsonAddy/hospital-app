<template>
  <div>
    <link rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   
    <div class="md-layout-column">
      <md-toolbar class="md-primary" md-elevation="1">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title md-toolbar-section-start" v-if='loggedIn' style="flex: 1">
          Welcome, {{currentUser}}
        </span>
        <div>
          <md-button class="md-primary" @click="LogOut()">Logout</md-button>
        </div>

      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation" md-swipeable>

        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Admin</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">

              <router-link to="/inbox">
                Inbox
              </router-link>

              </span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">

              <router-link to="/mail">
                Sent Mail
              </router-link>

            </span>
              
          </md-list-item>

          <md-list-item>

            <md-icon class="fa fa-comment"></md-icon>
            <span class="md-list-item-text">
              <router-link to="/comments">
                Users' Comments
              </router-link>
            </span>
            
          </md-list-item>

        </md-list>

      </md-drawer>
      
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  
  export default {
    name: 'AdminDashboard',
    components: {
      
    },
    data() {
      return {
        loggedIn: false,
        currentUser: false,
        showNavigation: false,
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
 

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }


</style>

