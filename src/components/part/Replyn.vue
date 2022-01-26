<template>
  <div class="box">
  <div v-if="reply!=null ">
    <div v-for="(reply_) in replydata" :key="reply_.id" style="margin-left:10px">
           <!-- id：{{reply_.id}} 回复:{{handler(reply_)}} -->
           id：{{reply_.id}} 回复:{{reply_.content}}
      <Replyn :reply="reply_.reply_reply"/>
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
      replydata:this.reply,
    //   reply_reply:""
     }
 },
 methods:{
     handler(object){
        // let _this_1  = this 
        const list =[]
        // for(var key in _this.replydata){
        //       if("comment" ===_this.replydata[key].reply_type  ){ //第一个回复 的 回复，第一层楼中楼
        //         return _this.replydata[key]
        //       }
        //       else if(id ===_this.replydata[key].reply_id ){//
        //         list.push(_this.replydata[key])
        //       }
        //   }
        //  if("comment" === data.reply_type)
        //     return data.content
        //  else{
        //      return data.content
        //  }
        var newdata=[]
        const _this_1 =this
        for (const key in object) {
             if(object[key].reply_type ==="comment"){
                //  key_1  = key
                newdata.push(object[key])
             }
        }
        // // newdata 
        newdata["reply_reply"]=[]
        // newdata["reply_reply"].push("000")
        // console.log(newdata)
        // console.log(newdata)
        for (const key in object) {
            if(object[key].reply_type ==="reply"){
                //  newdata.reply_reply.push(object[key])
                // console.log(object[key])
                // var arr =[];
                // arr.push([]);
                // console.log(arr)
                        // newdata["reply_reply"]=[]
                // console.log(newdata["reply_reply"].push("ll"))
                // let obj ={}
                // obj["a"]=[]
                // obj["a"].push({d:1})
                // console.log(obj )
                // console.log()
                 newdata["reply_reply"].push(object[key])
                //  newdata = this.newdata
                //  console.log(newdata)
             }
                            //   console.log(newdata)
        }
        // console.log(newdata)
        this.replydata =newdata
        console.log(this.replydata)
      }
 },
  mounted(){
      this.handler(this.replydata)
  }
}
</script>

<style scoped>

</style>