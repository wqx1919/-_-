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
            <el-dropdown-item v-if="topic_user_account.account===ismyselfy">
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
        <i class="iconfont icon-pinglun" @click="showCommentInput()"></i>
      </div>
      <div class="Comment_reply">
        评论:
        <ul>
          <li
            style="max-height: 500px; overflow: auto"
            v-for="(data, index) in tree_comment"
            :key="index"
          >
            <!-- <p v-if="uersinfo[index]">
              昵称:{{uersinfo[index].account}}
              内容:{{ data.content }}
            </p>           -->
            <!-- 昵称:{{data.account}}
            内容:{{ data.content }}
            <Replyn :reply="tree_reply_results[index]"  /> -->
            <div class="top">
              <div class="pic">
                [头像]
              </div>
              <p>{{ data.account }}</p>
              <p style="font-size:12px;">2022年2月4日13点51分</p>
            </div>
              <div class="content" style="margin-left:5px">
              <span v-html="data.content"></span>
              </div>
              <span class="comment-reply" @click="showCommentInput(data)">
                <i class="iconfont icon-pinglun"></i>
                <span >回复</span>
              </span>
              <span class="delete" v-if="ismyselfy===data.account"   @click="getuserinfo(data.id)">
                 <i class="iconfont icon-shanchu_icon"></i>
                  删除
              </span>
              
            
            <Replyn :reply="data.children" />
            <div
              class="write-reply"
              v-if="data.children.length > 0"
              @click="showCommentInput(data)"
            >
              <i class="el-icon-edit"></i>
              <span class="add-comment">添加新评论</span>
            </div>
            <transition name="fade">
              <div class="input-wrapper" v-if="showdataId === data.id">
                <el-input
                  class="gray-bg-input"
                  v-model="inputComment"
                  type="textarea"
                  :rows="3"
                  autofocus
                  placeholder="写下你的评论"
                >
                </el-input>
                <div class="btn-control">
                  <span class="cancel" @click="cancel">取消</span>
                  <el-button
                    class="btn"
                    type="success"
                    round
                    @click="commitreply(data,'comment')"
                    >确定</el-button
                  >
                </div>
              </div>
            </transition>
            <!-- <Replyn :reply="handler(data.id,reply_results)"  /> -->
            <!-- <div class="messages">
              回复：   {{handler(data.id)}}
            </div> -->
          </li>
        </ul>
       
        <!-- <div class="input-wrapper" >
        <el-input
          class="gray-bg-input"
          v-model="inputComment"
          type="textarea"
          :rows="3"
          autofocus
          placeholder="写下你的评论"
        >
        </el-input>
        <div class="btn-control">
          <span class="cancel" @click="cancel">取消</span>
          <el-button
            class="btn"
            type="success"
            round
            @click="commitComment"
            >确定</el-button
          >
        </div>
        </div> -->
      </div>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
      <div class="input-wrapper" >
       <div id="div1">
          <p>写下你的评论</p>
        </div>
        <div class="btn-control">
          <span class="cancel" @click="cancel">取消</span>
          <el-button
            class="btn"
            type="success"
            round
            @click="commitComment"
            >确定</el-button
          >
        </div>
        </div>
    </div>
    <div class="right">
      <Label />
      <Hot />
    </div>
  </div>
</template>

<script >
import { nanoid } from "nanoid";

import Label from "./part/Label.vue";
import Hot from "./part/Hot.vue";
import Replyn from "./part/Replyn.vue";
import wangEditor from "wangeditor"; //引入刚npm安装的wangeditor插件
export default {
  name: "Details",
  // props:['content','title'],
  data() {
    return {
      tree_comment: [],
      showdataId: "",
      inputComment: "",
      temp: "",
      ismyselfy:this.$store.state.name,
      topic_user_account:""
    };
  },
  components: {
    Label,
    Hot,
    Replyn,
  },
  methods: {
    async getData() {
      let _this = this;
      let param = new URLSearchParams();
      param.append("topic_id", this.$route.params.id);
      await _this.$axios
        .post("http://127.0.0.1:8008/api/gettopic_comment", param)
        .then(
          (res) => {
            if (res.data.status === 1) {
              alert(res.data.message);
            } else {
              _this.tree_comment = res.data.data.comment_results;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    async getuserinfo(id) {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/deletecommentById",
          // {params:{ topic_user_id: this.$route.params.topic_user_id ,type:"comment"}}
          {params:{ id: id ,type:"comment"}}
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
           await _this.getData();
           console.log("chengg")

        }
      } catch (err) {
        console.log(err);
      }
    },

    likeClick(data) {
      if (data.isLike === null) {
        Vue.$set(data, "isLike", true);
        data.likeNum++;
      } else {
        if (data.isLike) {
          data.likeNum--;
        } else {
          data.likeNum++;
        }
        data.isLike = !data.isLike;
      }
    },
    /**
     * 点击取消按钮
     */
    cancel() {
      this.showdataId = "";
    },

    /**
     * 提交评论
     */
    async commitComment() {
      //   let _this = this;
      //   let param = new URLSearchParams();
      //   param.append("", this.inputComment);
      //  const  res  =  await _this.$axios.post("http://127.0.0.1:8008/my/addtopic_comment", param)
      // .then(
      //   (res) => {
      //     if (res.data.status === 1) {
      //       alert(res.data.message);
      //     } else {
      //        await _this.getData()
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("topic_id", this.$route.params.id);
        param.append("content", this.inputComment);
        param.append("topic_type", this.$route.params.topic_category_id);
        param.append("type", "comment");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
          await _this.getData();
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
    },
    async commitreply(data, reply_type) {
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("reply_id", data.id);
        param.append("comment_id", data.id);
        param.append("content", this.inputComment);
        param.append("reply_type", reply_type);
        param.append("to_user_id", data.from_user_id); //给谁发消息（上一个留言的用户）
        param.append("type", "reply");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
          await _this.getData();
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
    },
    /**
     * 点击评论按钮显示输入框
     * data: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(data, reply) {
      if (reply) {
        this.inputComment = "@" + reply.fromName + " ";
      } else {
        this.inputComment = "";
      }
      this.showdataId = data.id;
    },
  },
  async mounted() {
    await this.getData();
    await this.getuserinfo();
    //  const E = window.wangEditor
    const editor = new wangEditor("#div1");
    editor.config.placeholder = "自定义 placeholder 提示文字";
    editor.config.height = 500;
    editor.config.zIndex = 10
    // 配置菜单栏，删减菜单，调整顺序
    editor.config.menus = [
      "bold",
      "head",
      "link",
      "italic",
      "underline",
      "image",
      "emoticon",
    ];
    editor.config.onchange = (html) => {
      this.inputComment = html;
    };
    editor.create();
  },

  computed: {

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
.top{
  display: flex;
}
.content{
  background-color: var(--commentbackgroun);
}
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
.Comment_reply {
  margin-bottom: 32px;
}
.messages {
  margin-left: 20px;
}
.write-reply {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;
  padding: 10px;
  cursor: pointer;
}

.write-reply:hover {
  color: #303133;
}

.write-reply .el-icon-edit {
  margin-right: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.input-wrapper {
  padding: 10px;
}

.input-wrapper .btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}

.input-wrapper .btn-control .cancel {
  font-size: 16px;
  color: #606266;
  margin-right: 20px;
  cursor: pointer;
}

.input-wrapper .btn-control .cancel:hover {
  color: #333;
}

.input-wrapper .btn-control .confirm {
  font-size: 16px;
}
</style>