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
        <h3 class="tltle">{{ $route.params.title }}</h3>
        <div class="text">{{ $route.params.content }}</div>
      </div>
      <div class="bottom">
        <i class="iconfont icon-24px"></i>
        <i class="iconfont icon-caozuo_cai_24px"></i>
        <i class="iconfont icon-pinglun"></i>
      </div>
      <div class="Comment_reply">
        评论:
        <ul>
          <li v-for="(data,index) in comment_results" :key="index">
            昵称:{{uersinfo[index].account}}
            内容:{{ data.content }}
            <Replyn :reply="handler(data.id)" />
            <!-- <div class="messages">
              回复：   {{handler(data.id)}}
            </div> -->
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
import Replyn from "./part/Replyn.vue";
export default {
  name: "Details",
  // props:['content','title'],
  data() {
    return {
      reply_results: [],
      comment_results: [],
      dataid: "",
      uersinfo:[]
      // [{account:"11"},{account:"2"}],
      // temp1:""
    };
  },
  components: {
    Label,
    Hot,
    Replyn,
  },
  methods: {
  async   getData() {
    // async: false;
      let _this = this;
      let param = new URLSearchParams();
      // alert(this.$route.params.id)
      param.append("topic_id", this.$route.params.id);
      // param.append("password", this.form.password)
     await _this.$axios
        .post("http://127.0.0.1:8008/api/gettopic_comment", param)
        .then(
          (res) => {
            if (res.data.status === 1) {
              alert(res.data.message);
            } else {
              //  console.log(res.data)
              _this.comment_results = res.data.data.comment_results; //赋值
              _this.reply_results = res.data.data.reply_results;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    totree(list, parId) {
      let obj = {};
      let result = [];
      //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
      list.map((el) => {
        obj[el.id] = el;
      });
      // let flag
      // 头部
      for (const key in list) {
        if (list[key].reply_type === "comment") {
          list[key].reply_id = 0;
          // flag =true
        }
      }
      for (let i = 0, len = list.length; i < len; i++) {
        let id = list[i].reply_id;
        if (id == parId) {
          result.push(list[i]);
          continue;
        }
        if (obj[id].children) {
          obj[id].children.push(list[i]);
        } else {
          obj[id].children = [list[i]];
        }
      }
      return result;
      // this.replydata =result
    },
    handler(id) {
      let _this = this;
      const list = [];
      for (var key in this.reply_results) {
        // if(id ===_this.reply_results[key].comment_id &&  _this.reply_results[key].reply_type==="reply" ){
        //   list.push(_this.reply_results[key])
        // }

        if (id === this.reply_results[key].comment_id) {
          list.push(this.reply_results[key]);
        }
      }

      let result = this.totree(list, 0);
      // let param2 = new URLSearchParams()
      // alert(this.$route.params.id)
      // param2.append("id",id)

      // console.log(this.comment_results.length)
      return result;
    },

    ALLuersinfo() {
      // console.log(id)
      
      const _this =this
      var temp1=""
      console.log(this.comment_results)
      for (let i = 0; i < this.comment_results.length; i++) {
        // if (id === this.comment_results[i].from_user_id){
          // console.log(id)
      _this.$axios.get("http://127.0.0.1:8008/api/alluserinfo", {
     params:{ id: this.comment_results[i].from_user_id },
      })
      .then(
        (res) => {
          if (res.data.status === 1) {
            // alert(res.data.message)
            console.log(res.data);
          } else {
             console.log(res.data.data.account)
            _this.uersinfo.push(res.data.data); //赋值
            // _this.temp1= res.data.data.account
          }
        },
        (err) => {
          console.log(err);
        }
      );
      // console.log(temp1+"11")

        // }
      // }
      // console.log(this.uersinfo[0].account)
      // return this.uersinfo[0].account
      // console.log( this.uersinfo[0].id)
      // for(let key = 0;key<this.uersinfo.length;key++){
      //   if (this.uersinfo[key].id === id) {
      //     // break
      //      console.log(this.uersinfo[key].account)
      //     //  return this.uersinfo[key].account
      //   }
      // }
      // for (let key in this.uersinfo) {
      //   //  console.log(this.comment_results[key].from_user_id===id)
      //   if (this.uersinfo[key].id === id) {
      //     // break
      //      console.log(this.uersinfo[key].account)
      //     //  return this.uersinfo[key].account
      //   }
      }
            //  return _this.temp1
      //  return
    },
  },

  async  mounted() {
   await  this.getData();
    this.ALLuersinfo();
    //  console.log(this.$route)
  },
  computed:{
    //    ALLuersinfo() {
    //   // console.log(id)       
    //   const _this =this
    //   var temp1=""
    //   // console.log(this.comment_results)
    //   for (let i = 0; i < this.comment_results.length; i++) {
    //     // if (id === this.comment_results[i].from_user_id){
    //       // console.log(id)
    // _this.$axios.get("http://127.0.0.1:8008/api/alluserinfo", {
    //     params: { id: id },
    //   })
    //   .then(
    //     (res) => {
    //       if (res.data.status === 1) {
    //         // alert(res.data.message)
    //         console.log(res.data);
    //       } else {
    //          console.log(res.data.data.account)
    //         _this.uersinfo.push(res.data.data); //赋值
    //         _this.temp1= res.data.data.account
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //   } 
    //   return  11     //  return
    // }
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
  watch: {
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
  },
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
.article {
  flex: 1;
  position: relative;
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

.article .el-pagination {
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
.tltle {
  text-align: center;
}
/* .Comment_reply {
} */
.messages {
  margin-left: 20px;
}
</style>