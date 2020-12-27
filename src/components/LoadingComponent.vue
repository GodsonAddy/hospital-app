<template>
  <div>
    
    <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
  export default {
    name: 'LoadingComponent'
  }
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>