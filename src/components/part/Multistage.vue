<template>
  <div class="multistage 33" >
    <div v-if="children != null" class="comments" ref="box_shadow" >
      <!-- {{children[0].id}} -->
          <div 
          v-if="!children[0]"
            class="grandpaline _1DooEIX-1Nj5rweIc5cw_E 2"
            
            @click="moreshow('',oindex)"
          >
          <!-- {{ JSON.stringify(children[0].children[0])+"00"}} -->
            <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
              <i class="threadline"></i>
            </div>
          </div>
         <div class="expand_wu " v-if="more" @click="moreshow(subArticleComment)">
            <!-- <p>
        更 <i>{{ keyword }}</i> 评论
      </p> -->
      
            <span class="iconfont icon-icon-expand_wu-copy expand"></span>
          </div>
           {{moreT}}
          <div v-if=" !more" >
           
          <div
            class="comment 99"
            v-for="(subArticleComment,index) in children"
            :key="subArticleComment.id"
          >
          <!-- <div class="index"> -->
            <div
              class="grandpaline _1DooEIX-1Nj5rweIc5cw_E"
              v-if="!more"
              @click="moreshow(subArticleComment)"
            >
            <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
              <i class="threadline"></i>
            </div>
            </div>

            <a class="avatar">
              <img :src="imgSrc" alt="头像" />
            </a>
            <div class="content">
              <a class="author">{{ subArticleComment.from_user_account }}</a>
              <div class="metadata">
                <!-- <span class="date">{{subArticleComment.createByStr}}</span> -->
                <span> 2022年2月5日15点16分 </span>
              </div>
              <div class="text">{{ subArticleComment.content }}</div>
              <div class="actions"  v-if="!more2"> 
                <span class="reply" @click="showCommentInput(subArticleComment)"
                  >回复</span
                >
                <span
                  style="margin-right: 15px"
                  class="delete"
                  v-if="
                    ismyselfy === subArticleComment.from_user_account &&
                    subArticleComment.status === '1'
                  "
                  @click="getuserinfo(subArticleComment.id)"
                >
                  <i class="iconfont icon-shanchu_icon style"></i>
                  删除
                </span>
              </div>
              <transition name="fade">
                <div
                  class="input-wrapper"
                  v-if="showdataId === subArticleComment.id"
                >
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
                      @click="commitreply(subArticleComment, 'reply')"
                      >确定</el-button
                    >
                  </div>
                </div>
              </transition>
            </div>
          <!-- </div> -->
            <multistage ref="status" :children="subArticleComment.children" :oindex="index" :moreT="more2" />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "multistage",
  props: ["children",'oindex','moreT'],
  data() {
    return {
      imgSrc: require("../../../public/img/noavatar.png"),
      inputComment: "",
      showdataId: "",
      ismyselfy: this.$store.state.name,
      more: false,
      keyword: "少",
      line2:"",
      showtime:{
        
      },
      more2:false,
      moreT:"999"
    };
  },
  methods: {
    moreshow(obj,oindex) {
      
      // console.log(this.$refs.status) // 我是子组件的数据
      if (this.keyword == "多") this.keyword = "少";
      else {
        this.keyword = "多";
      }
      this.more = !this.more;
      // console.log(id)
      if (obj.reply_type == "comment"){
        this.$bus.$emit("ismore", { more: this.more, obj: obj });
      }
      if(obj==''){
        this.$bus.$emit("ismore", { index:oindex });
      }
      this.showtime= " 'position': 'relative'; 'display': 'flex';/* justify-content: space-evenly */'align-items': 'center;"
      // this.more2 =true
      // console.log(obj.currentTarget.parentElement.parentElement)
      // if(typeof obj ==Event ){
      //   this.$bus.$emit("ismore", obj);
      // }
      //  this.$bus.$emit('more',true)
      //  console.log(this.oindex)
      //  for (let index = 0; index < this.$refs.status.length; index++) {
      //   //  const element = array[index];
      //     console.log(this.$refs.status[index]) // 我是子组件的数据
      //  }
      // this.$refs.status[0].$parent.$parent.$data.more2 =  this.more
      // console.log(this.$refs.status[0].$parent.$parent.$data)
      // console.log(this.$parent.$data)
      this.$parent.$data.more2 =   this.more
      console.log(this.$parent.$data)
      // this.$refs.box_shadow.style.cssText="box-shadow:none; "
      // console.log( window.getComputedStyle(this.$refs.box_shadow).boxShadow)
    },
    async commitreply(data, reply_type) {
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("reply_id", data.id);
        param.append("comment_id", data.comment_id);
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
          this.$bus.$emit("addreply", nanoid());
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(this.inputComment);
    },
    cancel() {
      this.showdataId = "";
    },
    showCommentInput(data, reply) {
      if (reply) {
        this.inputComment = "@" + reply.fromName + " ";
      } else {
        this.inputComment = "";
      }
      this.showdataId = data.id;
    },
    getuserinfo(id) {
      this.$bus.$emit("delreply", { id: id, type: "reply" });
    },
  },
  mounted(){
 
    this.$bus.$on('moret',(data)=>{
     this.moreT = data
    })
      //  console.log(this.$refs.status.$data) // 我是子组件的数据
  },
  beforeDestroy(){
    this.$bus.$off('moret')
  }
};
</script>

<style >
@import "../../../src/assets/css/comment.css";
</style>

