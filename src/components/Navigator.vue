<template>
  <div >
    <md-tabs class="md-transparent" md-alignment="fixed">

      <md-tab id="tab-compose" md-label="Compose" :to="{path: '/user/compose'}" >
      
      </md-tab>
      
      <md-tab id="tab-inbox" md-label="Inbox" :to="{path: '/user/inbox'}">
        
      </md-tab>
    
      <md-tab id="tab-sentmessages" md-label="Sent Messages" :to="{path: '/user/sentmessages'}">
        
      </md-tab>

       <md-tab id="tab-comments" md-label="Read Comments" :to="{path: '/user/comments'}">
        
      </md-tab>

    
    </md-tabs>
    
  </div>
</template>

<script>

  export default {
    name: 'Navigator',
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  $list-width: 320px;

  .control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .control > .md-list {
    width: $list-width;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }
  
</style>