<template>
  <div >
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab id="tab-compose" md-label="Compose" to="" >
        <ComposeMessage />
      </md-tab>

      
      <md-tab id="tab-inbox" md-label="Inbox" to="" >
        <Inbox />
      </md-tab>
      

      <md-tab id="tab-sentmessages" md-label="Sent Messages" to="">
        <SentMessages />
      </md-tab>

      <md-tab id="tab-favorites" md-label="Favorites" to="">

      </md-tab>
    </md-tabs>
   
  </div>
</template>

<script>
import ComposeMessage from '@/components/NavigationTabs/ComposeMessage.vue'
import Inbox from '@/components/NavigationTabs/Inbox.vue'
import SentMessages from '@/components/NavigationTabs/SentMessages.vue'

export default {
  name: 'Navigator',
  components: {
    ComposeMessage,
    Inbox,
    SentMessages
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