<template>
  <div >
    <br />
    <center>
      <form >
      <md-content class="md-elevation-4">
        <h1> Login </h1>
        <md-divider></md-divider>
        <br />
        <div >
          <label for="email">Email </label>
          <input 
            type="email" 
            name="email" 
            required 
            id="email" 
            class="form-control" 
            placeholder="Enter your email"
            v-model="email"
          >
        </div>
        <div >
          <label for="password">Password</label>
          <input 
            type="password" 
            name="password" 
            class="form-control" 
            required 
            id="password" 
            placeholder="Enter your password"
            v-model="password"
          >
        </div>
          
        <md-button  class="md-raised md-primary"  v-if="!loading" @click.prevent="SignIn">
          LOGIN
        </md-button>
        <md-button  class="md-raised md-primary" disabled v-if="loading">
          <loading-component></loading-component>
        </md-button>

        <p> Don't have an account? <router-link to='/register'> Register here </router-link> </p> 
            
      </md-content>
      </form>
    </center>
  
  </div>
</template>

<script>
  import LoadingComponent from '@/components/LoadingComponent.vue'
  import firebase from 'firebase'

  export default {
    name: 'LogIn',
    components: {
      LoadingComponent
    },
    data(){
      return{
        email: "",
        password: "",
        loading: false,
        currentUser: false
      }
    },
    methods:  {
      SignIn(e) {
        e.preventDefault()
        this.loading = true
        
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          if(firebase.auth().currentUser.email === 'admin@admin.com') {
            console.log(user.data);
            this.loading = false
            this.$alert(`Welcome back, ${firebase.auth().currentUser.email}`)
            this.$router.push({path: '/admin'})
          }
          else{
            console.log(user.data);
            this.loading = false
            this.$alert(`Welcome back, ${firebase.auth().currentUser.email}`)
            this.$router.go({path: this.$router.path})

          }
         
        })
        .catch(error => {
          this.$alert(error.message);
          this.loading = false
        })
      },
      
    }, 
    created() {  
    }
  }

</script>

<style lang="scss" scoped>
  .md-content {
    width: 400px;
    height: 400px;
    padding: 10px;
    margin: 10px;
  }
  .md-progress-spinner {
    margin: 24px;
  }
  label {
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  input{
    height: 40px;
    width: 100%;
    border-radius: 0.25rem;
    margin-bottom: 30px;
  }
 
  .form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

</style>

