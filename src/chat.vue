<template>
  <div class="chat">

    <div class="chat__sidebar">
      <h3>People</h3>
      <div id="users">
        <ol>
          <user v-for="username in usernames" :username="username"></user>
        </ol>
      </div>
    </div>

    <div class="chat__main">
      <ol id="messages" class="chat__messages">
        
      <div v-for="message in messages">
        <!-- <messageView :message="message"></messageView> -->
        <div v-show="message.isMessage">
          <li class="message">
            <div class="message__title">
              <h4>{{message.from}}</h4>
              <span>{{message.createdAt}}</span>
            </div>
            <div class="message__body">
              <p>{{message.text}}</p>
            </div>
          </li>
        </div>

        <div v-show="!message.isMessage">
          <li class="message">
            <div class="message__title">
              <h4>{{message.from}}</h4>
              <span>{{message.createdAt}}</span>
            </div>
            <div class="message__body">
              <p>
                <a :href="message.url" target="_blank">My current location</a>
              </p>
            </div>
          </li>
        </div>

      </div>
      </ol>

      <div class="chat__footer" >
        <form id="message-form" @submit.prevent="sendMessage">
          <input v-model="text" type="text" placeholder="Message" autofocus autocomplete="off"/>
          <button type="submit">Send</button>
        </form>
        <button @click="sendLocation">Send location</button>
      </div>
    </div>
  </div>
  
</template>

<script>
  import Message from "./message.vue";
  import User from "./user.vue";
  import io from "socket.io-client";

  export default {
    data: function() {
      return {
        usernames: [],
        text: "",
        messages: [],
        socket: io("localhost:3000")
      };
    },
    components: {
      messageView: Message,
      user: User
    },
    methods: {
      sendMessage(e) {
        e.preventDefault();
        this.socket.emit("createMessage", {
          text: this.text
        } , ()=>{
          console.log('new message created')
        });
        this.message = "";
      },
      sendLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
          this.socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, function () {
          alert('Unable to fetch location.');
        });
      }
    },
    mounted() {
      this.socket.emit("join", {room: this.$route.params.room,name: this.$route.params.username}, (err)=> {
        if (err) {
          alert(err);
        } else {
          console.log("success")
        }
      });

      this.socket.on('updateUserList', (users) => {
        console.log('===============-'+JSON.stringify(this.usernames))
        
        this.usernames = [...users];
        
        console.log('================'+JSON.stringify(this.usernames))
      });

      this.socket.on("newMessage", (message) =>{
        var formattedTime = message.createdAt;
        var newMessage = {
          isMessage: true,
          text: message.text,
          from: message.from,
          createdAt: formattedTime
        }
        this.messages = [...this.messages , newMessage];
      });
      this.socket.on('newLocationMessage', (message) =>{
        var formattedTime = message.createdAt;
        var newMessage = {
          isMessage : false,
          url: message.url,
          from: message.from,
          createdAt: formattedTime
        }
        this.messages = [...this.messages , newMessage];
        
      })


    }
  };
</script>

<style>
</style>
