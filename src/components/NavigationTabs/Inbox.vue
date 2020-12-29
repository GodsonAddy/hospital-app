<template>
  <div class="card-expansion">
    
    <div v-for="item in inbox" v-bind:key="item._id" >
      <md-card>
        <md-card-header>
          <div class="md-title">From: {{item.sender}}</div>
          <div class="md-subhead">To:  </div>
        </md-card-header>

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button @click="replyMessage()">
                <md-icon class="md-primary" >reply</md-icon>
                <md-tooltip md-direction="bottom">reply</md-tooltip>
              </md-button>
              <md-button @click="deleteMessage(item._id)">
                <md-icon class="md-accent" >delete</md-icon>
                <md-tooltip md-direction="bottom">delete</md-tooltip>
              </md-button>
            </div>

            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content>

            <md-card-content>
              {{item.content}} {{item.file}}
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>

      
    </div>
  </div>
</template>


<script>

  export default {
    name: "Inbox",
    data(){
      return{
        inbox: undefined,
      
      }
    },
    mounted: function () {
     this.getMessage()
    },
    methods: {
      getMessage() {
      this.$axios.get(`http://localhost:3000/api/messages` )
        .then(res => {
          console.log(res)
          this.inbox = res.data.messages
        })
        .catch(err => { 
          console.log(err)
        })

      },
      deleteMessage(id){
        this.$axios.delete(`http://localhost:3000/api/messages/${id}`, { id })
        .then(res => {
          this.getMessage()
          console.log(res)
          alert('Message deleted successfully')
        })
        .catch( error => {
          console.log(error)
        })

      },
      replyMessage(_id){
        this.$axios.post(`http://localhost:3000/api/messages/${_id}`, { _id })
        .then(res => {
          console.log(res)
          this.inbox = ""
        })
        .catch(error => {
          console.log(error)
        })

      }
            
    }
  }
</script>

<style lang="scss" scoped>
  
  .card-expansion {
    height: 480px;
  }

  .md-card {
    width: 520px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
  }
</style>

 