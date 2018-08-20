<template>

    <div id="message-template" type="text/template">
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
</template>

<script>
  export default {
    props : {
      message : {
        type : Object
      },
    },
    data: function(){
      return{
      }
    },
    components:{
    },
    methods :{
    }
  }
</script>

<style>
</style>
