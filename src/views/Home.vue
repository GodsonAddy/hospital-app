<template>
  <div>
    <h1> Welcome to the Hospital app </h1>
    <br />
    <router-link to="register"> Register </router-link> |
    <router-link to="login"> Login </router-link>
    
    <router-view />
            
            
  </div>
</template>

<script>

export default {
    name: 'Home',
    components: {
      
    }

}
</script>

<style>

</style>