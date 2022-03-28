<template>
  <div class="box">
    <div v-if="reply != null">
      <div class="relpy" v-for="reply_reply in reply" :key="reply_reply.id">
        <!-- id：{{reply_.id}} 回复:{{handler(reply_)}} -->
        <!-- <p v-if="uersinfo[index]">
            昵称:{{uersinfo[index].account}} 回复:{{reply_reply.content}}
            </p> -->
        <div class="tes">
          <!-- <div class="max"> -->
          <div class="left_border">
            <i class="line"></i>
          </div>
          <!-- </div> -->

          <div class="top">
            <div class="pic">[头像]</div>
            <p>{{ reply_reply.from_user_account }}</p>
            <p style="font-size: 12px">2022年2月4日13点51分</p>
          </div>
          <div class="right">
            <div class="content" style="margin-left: 5px">
              [:{{ reply_reply.content }}]
            </div>
            <div>
              <span
                class="comment-reply"
                @click="showCommentInput(reply_reply)"
              >
                <i class="iconfont icon-pinglun"></i>
                <span>回复</span>
              </span>
              <span
                class="delete"
                v-if="
                  ismyselfy === reply_reply.from_user_account &&
                  reply_reply.status === '1'
                "
                @click="getuserinfo(reply_reply.id)"
              >
                <i class="iconfont icon-shanchu_icon"></i>
                删除
              </span>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div class="input-wrapper" v-if="showdataId === reply_reply.id">
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
                @click="commitreply(reply_reply, 'reply')"
                >确定</el-button
              >
            </div>
          </div>
        </transition>
        <!-- id：{{reply_reply.id}} -->
        <Replyn :reply="reply_reply.children" />
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "Replyn",
  props: ["reply"],
  data() {
    return {
      uersinfo: [],
      inputComment: "",
      showdataId: "",
      ismyselfy: this.$store.state.name,

      //   replydata:{},
      //   test:{}
      //   reply_reply:""
    };
  },
  methods: {
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
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          this.$bus.$emit("addreply", nanoid());
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
    getuserinfo(id) {
      this.$bus.$emit("delreply", { id: id, type: "reply" });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.tes {
  display: flex;
  flex-direction: column;
  position: relative;
}
.tes .right {
}
.relpy {
  margin-left: 32px;
  padding-left: 10px;
  /* border-left: 2px solid #f5f6f7; */
  /* border-left: 2px solid #EDEFF1; */
  border-bottom: none;
  margin-left: 10px;
}
.max {
  box-sizing: border-box;
  /* display: inline-block; */
  height: 100%;
  vertical-align: top;
}
.left_border {
  bottom: 0;
  position: absolute;
  /* right: 20px; */
  /* height: 100%; */
  height: calc(100% - 50px);
}
.left_border .line {
  border-right: 2px solid var(--newCommunityTheme-line);
  display: block;
  height: 100%;
  width: 50%;
}
/* .relpy:hover{ */
/* border-left: 2px solid var(--newCommunityTheme-line); */
/* border-left: 2px solid #0f74bc; */
/* } */

.top {
  display: flex;
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