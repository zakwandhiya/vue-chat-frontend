<template>
  <div class="chat">

    <div class="chat__sidebar">
      <h3>People</h3>
      <div id="users">
        <!-- <ol>
          <user v-for="username in usernames" :username="username"></user>
        </ol> -->
      </div>
    </div>

    <div class="chat__main">
      <ol id="messages" class="chat__messages">
        
      <!-- <div v-for="message in messages">
        <messageView :message="message"></messageView>
      </div> -->
      </ol>

      <div class="chat__footer" >
        <form id="message-form" @submit.prevent="sendMessage">
          <input v-model="text" type="text" placeholder="Message" autofocus autocomplete="off"/>
          <button type="submit">Send</button>
        </form>
        <button>Send location</button>
      </div>
    </div>
  </div>
  
</template>

<script>
  import Message from "./message.vue";
  import User from "./user.vue";

  export default {
    // props : ['socket'],
    data: function() {
      return {
        usernames: ["tzuyu", "nayeon", "chaeyoung"],
        text: "",
        messages: [],
      };
    },
    components: {
      messageView: Message,
      user: User
    },
    methods: {
      sendMessage(e) {
        // e.preventDefault();
        // this.socket.emit("createMessage", {
        //   text: this.text
        // } , ()=>{
        //   console.log('new message created')
        // });
        // this.message = "";
      }
    },
    
  };
</script>

<style>
</style>
