<template>
  <div class="Details version_heart">
    <div class="article pannel">
      <div class="top">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            更多<i class="iconfont icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              >编辑历史
              <i class="iconfont icon-bianji-icon iconfontstly"></i>
            </el-dropdown-item>
            <el-dropdown-item
              >复制
              <i class="iconfont icon-fuzhi iconfontstly_fuzhi"></i>
            </el-dropdown-item>
            <el-dropdown-item>
              举报 <i class="iconfont icon-tousujubao iconfontstly_jubao"></i>
            </el-dropdown-item>
            <el-dropdown-item>
              删除
              <!-- （管理员和自己） -->
              <i class="iconfont icon-shanchu_icon iconfontstly_shanchu"></i>
            </el-dropdown-item>
            <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="body">
        <!-- 文章数据 -->
        <h3 class="tltle">{{$route.params.title}}</h3>
        <div class="text">{{$route.params.content}}</div>
      </div>
      <div class="bottom">
        <i class="iconfont icon-24px"></i>
        <i class="iconfont icon-caozuo_cai_24px"></i>
        <i class="iconfont icon-pinglun"></i>
      </div>
      <div class="Comment_reply">
        评论:
        <ul>
          <li v-for="(data) in comment_results" :key="data.id">
            {{data.content}}

            回复：{{handler(data.id)}}
            <!-- <div class="messages" v-for="(m,index) in data" :key="index"> -->
                  
            <!-- </div> -->
          </li>
        </ul>
      </div>
      
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
    <div class="right">
      <Label />
      <Hot />
    </div>
  </div>
</template>

<script >
import Label from "./part/Label.vue";
import Hot from "./part/Hot.vue";
export default {
  name: "Details",
  // props:['content','title'],
  data(){
     return{
       reply_results:[],
       comment_results:[],
       dataid:""
     }
  },
  components: {
    Label,
    Hot,
  },
  methods: {
     getData() {
      let _this = this;
      let param = new URLSearchParams()
      // alert(this.$route.params.id)
      param.append("topic_id", this.$route.params.id)
      // param.append("password", this.form.password)
       _this.$axios.post('http://127.0.0.1:8008/api/gettopic_comment', param).then(res=>{
         if(res.data.status===1){
            alert(res.data.message)
         }
         else{
          //  console.log(res.data)
           _this.comment_results = res.data.data.comment_results //赋值
           _this.reply_results = res.data.data.reply_results
         }
      },err=>{
        console.log(err);
      })
     },
     handler(id){
        let _this  = this 
        // console.log(_this.reply_results)
        // console.log(_this._data.dataid)
        // console.log("###")
        // console.log(oldValue+"@@"+newValue)
      // return _this.reply_results
        //  const temp =["11"]
        //  console.log(this.temp)
         Object.keys(_this.reply_results).forEach(function(key2){
             if(id ===_this.reply_results[key2].comment_id ){
               console.log(_this.reply_results[key2].content)
              //  console.log( _this.temp+"之前") 
               _this.temp = _this.reply_results[key2].content
              //  在vc上挂在了一个temp
              //  console.log( _this.temp+"之后")
              //  break
                // return 1  break 不生效
              //  return  _this.temp
             }
          })
        // return this.temp 
      }
  },
       
     
  mounted() {
     this.getData()
    //  console.log(this.$route)
  },
  //  computed:{
  //    comment_results_details(){
  //      return(id)=>{
  //      let _this  = this 
  //     //  Object.keys(_this.comment_results).forEach(function(key){
  //       //  console.log(_this.reply_results)
  //       //  console.log(key,_this.comment_results[key]);
  //        Object.keys(_this.reply_results).forEach(function(key2){

  //            if(id ===_this.reply_results[key2].comment_id ){

  //              console.log(_this.reply_results[key2].content)
  //              return _this.reply_results[key2].content
  //            }
  //             //  console.log(key,_this.reply_results[key2]);
  //         });
  //     //  });
  //     //  return 1
  //    }
  //    }
  //     //  console.log(typeof )
  //     //  for (const key in _this.comment_results) {
  //     //           // console.log(_this.comment_results)
  //     //   //  console.log(key+"11")
  //     //    return 1
  //     //     // for (const key2 in this.reply_results) {
  //     //     //   if (key[id] == key2[comment_id]) 
  //     //     //         return 1
  //     //     //       }
  //     //     //   }
  //     //  }}
       
  //  }
   watch:{
    //  dataid(new1,ole){   
    //    console.log(new1)
    //  }
    //  dataid:{
    //   //  Object.keys(_this.comment_results).forEach(function(key){
    //   //    console.log(_this.reply_results)
    //   //    console.log(key,_this.comment_results[key]);
    //     handler(oldValue,newValue){
    //     let _this  = this 
    //     console.log(_this._data.dataid)
    //     // console.log("###")
    //     console.log(oldValue+"@@"+newValue)
    //      Object.keys(_this.reply_results).forEach(function(key2){
    //          if(newValue ===_this.reply_results[key2].comment_id ){
    //            console.log(_this.reply_results[key2].content)
    //            return _this.reply_results[key2].content
    //          }
    //       })
    //     }
    //  }
    //  comment_results_details(id){
    //    let _this  = this 
    //   //  Object.keys(_this.comment_results).forEach(function(key){
    //     //  console.log(_this.reply_results)
    //     //  console.log(key,_this.comment_results[key]);
    //      Object.keys(_this.reply_results).forEach(function(key2){
    //          if(id ===_this.reply_results[key2].comment_id ){
    //            console.log(_this.reply_results[key2].content)
    //            return _this.reply_results[key2].content
    //          }
    //       });
    //     }
     }
};
</script>

<style scoped>
.el-dropdown-link:hover {
  cursor: pointer;
  color: #409eff;
  /* position: absolute ;
  top: 0;
  right: 0; */
}
.el-dropdown {
  /* border: 1px solid #000; */
  position: absolute;
  top: 0;
  right: 0;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.Details {
  display: flex;
  /* flex-direction: column; */
}
/* .article { */
/* border: 1px solid #000; */
/* border: 1px solid #a18cd1; */

/* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */
/* position: relative; */
/* } */
.article{
  flex: 1;
  position:relative;
}
.article .top {
  /* height: 100px; */
  position: relative;
}
/* .article .top i {
  position: absolute;
  top: 0;
  right: 0;
} */
/* .article  i {
font-size:14px ;
} */

.article .el-pagination{
  position: absolute;
  bottom: 0;
}
.el-dropdown-menu {
  text-align: center;
}

.iconfontstly {
  font-size: 14px !important;
  /* background-color: palegoldenrod; */
}
.el-dropdown-menu .el-dropdown-item:nth-child(2) {
  position: relative;
}
/* .iconfontstly_jubao{
  position: absolute;
  font-size: 20px; */
/* top: 50%; */
/* left: 58%; */
/* margin-top: 10px; */
/* } */

/* .bottom {
  display: flex;
  justify-content: space-evenly;
} */
.tltle{
  text-align:center;
}
</style>