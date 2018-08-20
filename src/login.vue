<template>
  <div class="centered-form">
    <div class="centered-form__form">
        <div class="form-field">
          <h3>Vue Chat</h3>
        </div>
        <div class="form-field">
          <label >Display name</label>
          <input v-model="username" type="text" autofocus/>
        </div>
        <div class="form-field">
          <label>Room name</label>
          <input v-model="room" type="text" />
        </div>
        <div class="form-field">
          <button @click="toChatPage">Join</button>
        </div>
    </div>
  </div>

</template>

<script>
var isRealString= (str) => {
  return typeof str === 'string' && str.trim().length > 0;
}
export default {
  // name : 'app',
  // props : {
  //   room :{
  //     type : String,
  //     default : ''
  //   },
  //   username : {
  //     type : String,
  //     default : ''
  //   },
  // },
  data: function() {
    return {
      room : '',
      username :''
    }
  },
  methods:{
    toChatPage() {
      if (!isRealString(this.username) || !isRealString(this.room)) {
        return alert('Name and room name are required.');
      }
      
      this.$router.push({ name: 'chat', params: { username: this.username , room : this.room }})
    },

    
  }
}
</script>

<style>
</style>
