<template>
  <div>

    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title md-toolbar-section-start" style="flex: 1">Welcome</h3>
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

  export default {
    name: 'user',
    components: {
      Navigator
    },
    methods : {
      LogOut() {
        this.$router.push("/")
      }

    }
  }
</script>

<style lang="scss" scoped>
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
</style>

