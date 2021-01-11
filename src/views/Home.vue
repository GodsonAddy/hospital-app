<template>
  <div>
    <h1> Welcome to the Hospital app </h1>
    <br />
    
    <LogIn />
            
            
  </div>
</template>

<script>
import LogIn from '@/views/LogIn.vue'

export default {
  name: 'Home',
  components: {
    LogIn
        
  }

}
</script>

<style lang='scss' scoped>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

</style>