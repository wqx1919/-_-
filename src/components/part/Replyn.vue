<template>
  <div class="box">
  <div v-if="reply!=null ">
    <div v-for="(reply_) in reply" :key="reply_.id" style="margin-left:10px">
           <!-- id：{{reply_.id}} 回复:{{handler(reply_)}} -->
           id：{{reply_.id}} 回复:{{reply_.content}}
      <Replyn :reply="reply_.children"/>
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
    //   replydata:{},
    //   test:{}
    //   reply_reply:""
     }
 },
 methods:{
     handler(list,parId){
        // let _this_1  = this 
        // const list =[]

        // var newdata=[]
        // const _this_1 =this
        // for (const key in object) {
        //      if(object[key].reply_type ==="comment"){
        //         newdata.push(object[key])
        //      }
        // }
        // console.log(typeof object)
        // newdata={ reply_reply:[]}
        // let reply_reply =["1"]
        //  newdata.push(reply_reply)
        // this.test.push(reply_reply)
        // for (const key in object) {
        //     if(object[key].reply_type ==="reply"){
        //         //  this.test["reply_reply"].push(object[key])
        //          newdata["reply_reply"].push(object[key])
        //      }
        // }
        // this.replydata =newdata
        // return  newdata
        // console.log(this.replydata)
            let obj = {};
         let result = [];
    //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
    list.map(el => {
        obj[el.id] = el;
    })
    for(let i=0, len = list.length; i < len; i++) {
        let id = list[i].reply_id;
        if(id == parId) {
            result.push(list[i]);
            continue;
        }
        if(obj[id].children) {
            obj[id].children.push(list[i]);
        } else {
            obj[id].children = [list[i]];
        }
    }
    return result;
// ————————————————
// 版权声明：本文为CSDN博主「灿尔哈擦苏」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/susuzhe123/article/details/95353403
      },
    totree(list,parId) {
    let obj = {};
    let result = [];
    //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
    list.map(el => {
        obj[el.id] = el;
    })
    // let flag
    // 头部
	 for (const key in list) {
             if(list[key].reply_type ==="comment"){
                list[key].reply_id=0;
                flag =true
            }
       }
    for(let i=0, len = list.length; i < len; i++) {
        let id = list[i].reply_id;
        if(id == parId) {
            result.push(list[i]);
            continue;
        }
        if(obj[id].children) {
            obj[id].children.push(list[i]);
        } else {
            obj[id].children = [list[i]];
        }
    }
    // return result;
    this.replydata =result
    }
 },
  mounted(){
    //   this.totree(this.reply,0)
    //   this.handler(this.reply)
  }
}
</script>

<style scoped>

</style>