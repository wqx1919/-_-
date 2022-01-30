<template>
  <div class="box">
  <div v-if="reply!=null ">
    <div v-for="(reply_reply) in reply" :key="reply_reply.id" style="margin-left:10px">
           <!-- id：{{reply_.id}} 回复:{{handler(reply_)}} -->
            <!-- <p v-if="uersinfo[index]">
            昵称:{{uersinfo[index].account}} 回复:{{reply_reply.content}}
            </p> -->
            昵称:{{reply_reply.from_user_account}}
             [:{{ reply_reply.content }}]
            回复@{{reply_reply.to_user_account}}
           <!-- id：{{reply_reply.id}} -->
      <Replyn :reply="reply_reply.children"/>
    </div>
  </div>
  </div>
</template>

<script>
export default {

 name:"Replyn",
 props: ['reply'],
 data(){
     return{
         uersinfo:[]
    //   replydata:{},
    //   test:{}
    //   reply_reply:""
     }
 },
 methods:{
  
 },
   mounted() {

  }
}
</script>

<style scoped>

</style>