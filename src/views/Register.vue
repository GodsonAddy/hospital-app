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
          <label for="name">username</label>
          <input 
            type="text" 
            name="name" 
            required id="name" 
            class="form-control" 
            placeholder="Enter your username"
            v-model="username"
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
          LOGIN
        </md-button>
        <md-button  class="md-raised md-primary" disabled v-if="loading">
          <loading-component></loading-component>
        </md-button>
            
            
      </md-content>
      </form>
    </center>
  
  </div>
</template>

<script>
  import LoadingComponent from '@/components/LoadingComponent.vue'

  export default {
    name: 'Register',
    components: {
      LoadingComponent
    },
    data(){
      return{
        username: "",
        password: "",
        email: "",
        loading: false,
        
      }
    },
    methods:  {
      Register() {
        this.loading = true
        this.$axios.post("http://localhost:3000/api/register",{
          username: this.username,
          password: this.password,
          email: this.email

        })
        .then((res) =>{
          this.loading = false
          this.$router.push({name: 'user'})
          console.log(res)
          
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
      },
      
    }, 
    mounted: function () {
      
    }
  }



</script>

<style lang='scss' scoped>

 .md-content {
    width: 500px;
    height: 500px;
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