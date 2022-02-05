<template>
  <div class="multistage">
  <div v-if="children != null" class="comments">
    <div class="comment" v-for="subArticleComment in children" :key="subArticleComment.id">
      <a class="avatar">
        <img :src="imgSrc" alt="头像">
      </a>
      <div class="content">
        <a class="author">{{subArticleComment.from_user_account}}</a>
        <div class="metadata">
          <!-- <span class="date">{{subArticleComment.createByStr}}</span> -->
          <span> 2022年2月5日15点16分 </span>
        </div>
        <div class="text">{{subArticleComment.content}} </div>
        <div class="actions">
              <span class="reply" @click="showCommentInput(subArticleComment)">回复</span>
              <span
                style="margin-right: 15px"
                class="delete"
                v-if="ismyselfy === subArticleComment.from_user_account && subArticleComment.status === '1'"
                @click="getuserinfo(subArticleComment.id)"
              >
                <i class="iconfont icon-shanchu_icon style"></i>
                删除
              </span>
        </div>
        <transition name="fade">
              <div class="input-wrapper" v-if="showdataId === subArticleComment.id">
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
                    @click="commitreply(subArticleComment,'reply')"
                    >确定</el-button
                  >
                </div>
              </div>
            </transition>
      </div>
      <multistage :children="subArticleComment.children"/>
    </div>
  </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: 'multistage',
  props: ['children'],
  data () {
    return {
         imgSrc: require( "../../../public/img/noavatar.png"),
         inputComment:"",
         showdataId:"",
         ismyselfy:this.$store.state.name,
    }
  },
   methods:{

   async commitreply(data,reply_type) {
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid())
        param.append("reply_id", data.id);
        param.append("comment_id", data.comment_id);
        param.append("content", this.inputComment);
        param.append("reply_type",reply_type);
        param.append("to_user_id",data.from_user_id);//给谁发消息（上一个留言的用户）
        param.append("type", "reply");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
            this.$bus.$emit('addreply',nanoid())
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
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
    getuserinfo(id){
       this.$bus.$emit('delreply',{id:id,type:"reply"})
    }

 },
}
</script>

<style >
@import '../../../src/assets/css/comment.css'
</style>

