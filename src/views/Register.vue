<template>
  <div>
    <center>
      <form >
      <md-content class="md-elevation-4">
        <h1> Register</h1>
        <md-divider></md-divider>
        <br />
        <div >
          <label for="email">Email </label>
          <input 
            type="text" 
            name="email" 
            required id="email" 
            class="form-control" 
            placeholder="Enter your emal"
            v-model="email"
          >
        </div>
        
        <div >
          <label for="password">Password</label>
          <input 
            type="password" 
            name="password" 
            class="form-control" 
            required id="password" 
            placeholder="Enter your password"
            v-model="password"
          >
        </div>
          
        <md-button  class="md-raised md-primary"  v-if="!loading" @click.prevent="Register">
          Register
        </md-button>
        <md-button  class="md-raised md-primary" disabled v-if="loading">
          <loading-component></loading-component>
        </md-button>

        <p> Already have an account? <router-link to='/login'> Login here </router-link> </p>
            
      </md-content>
      </form>
    </center>
  
  </div>
</template>

<script>
  import LoadingComponent from '@/components/LoadingComponent.vue'
  import firebase from 'firebase'

  export default {
    name: 'Register',
    components: {
      LoadingComponent
    },
    data(){
      return{
        password: "",
        email: "",
        loading: false
        
      }
    },
    methods:  {
      Register(e) {
        e.preventDefault()
        this.loading = true
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) =>{
          this.loading = false
          this.$fire({
            type: "success",
            title: "Congrats! You have successfully registered as",
            text:  `${firebase.auth().currentUser.email}`
          })
          console.log(user.data)
          this.$router.go({path: this.$router.path})
          
        })
        .catch((error) => {
          this.loading = false
          this.$alert(error.message)
        })
      },
      
    }, 
    mounted: function () {
      
    }
  }



</script>

<style lang='scss' scoped>

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