<template>
  <div class="multistage">
    <div
      v-if="children != null"
      class="comments"
      ref="box_shadow"
      :style="
        typeof children[0] != 'undefined' &&
        children[0].level != 0 &&
        (children[0].level - 1) % 5 != 0
          ? ''
          : { left: '20px' }
      "
    >
      <!-- 线 -->
      <div
        v-if="!children[0] || !wu_more"
        class="grandpaline _1DooEIX-1Nj5rweIc5cw_E 2"
        :style="
          typeof children[0] != 'undefined' &&
          children[0].level != 0 &&
          (children[0].level - 1) % 5 != 0
            ? ''
            : { left: '-33px' }
        "
        @click="un_moreshow('', oindex)"
      >
        <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
          <i class="threadline"></i>
        </div>
      </div>
      <!-- 回复逻辑 -->
      <div
        class="comment"
        :class="{ showtime: subArticleComment.more }"
        v-for="(subArticleComment, index) in children"
        :key="subArticleComment.id"
      >
        <!-- 展开 -->
        <div
          class="expand_wu"
          v-if="subArticleComment.more"
          @click="
            moreshow({
              Id: subArticleComment.id,
              obj: subArticleComment.more,
            })
          "
        >
          <span class="iconfont icon-icon-expand_wu-copy expand"></span>
        </div>
        <!-- 顶部 -->
        <div>
          <!-- 线 -->
          <div
            class="grandpaline _1DooEIX-1Nj5rweIc5cw_E"
            :style="
              subArticleComment.level != 0 &&
              (subArticleComment.level - 1) % 5 != 0
                ? ''
                : { left: '-33px' }
            "
            v-if="!subArticleComment.more || !more"
            @click="
              moreshow({
                Id: subArticleComment.reply_id,
                obj: subArticleComment.more,
              })
            "
          >
            <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
              <i
                class="threadline"
                :style="
                  subArticleComment.level != 0 &&
                  (subArticleComment.level - 1) % 5 != 0
                    ? ''
                    : { '--newCommunityTheme-button': 'red' }
                "
              ></i>
            </div>
          </div>
          <!-- 头像 -->
          <a class="avatar">
            <img :src="hosts + subArticleComment.from_user_avtar" alt="头像" />
          </a>
          <!-- 回复 -->
          <div class="content" ref="replyDetails">
            <a class="author">{{ subArticleComment.from_user_account }}</a>
            <div class="metadata">
              <span class="date">{{ subArticleComment.create_at }}</span>
            </div>
            <div class="text">{{ subArticleComment.content }}</div>
            <div class="actions" v-if="!subArticleComment.more">
              <span class="reply" @click="showCommentInput(subArticleComment)"
                >回复</span
              >
              <span
                style="margin-right: 15px"
                class="delete"
                v-if="
                  (userinfo.account === subArticleComment.from_user_account ||
                    'admin' === userinfo.account) &&
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
        </div>
        <!-- 下级回复 -->
        <multistage
          style="width: 100%"
          ref="status"
          :children="subArticleComment.children"
          :oindex="index"
          v-if="
            !subArticleComment.more &&
            subArticleComment.level != 0 &&
            subArticleComment.level % 5 != 0
          "
          :more_ex_progs="more"
        />
        <!-- <span
            v-if="!subArticleComment.more && subArticleComment.level % 5 == 0"
            @click="toReplyDetail(subArticleComment.children)"
            >点击更多</span
          > -->
        <span
          v-if="
            !subArticleComment.more &&
            subArticleComment.children &&
            subArticleComment.level % 5 == 0
          "
          @click="subArticleComment.levelMore = true"
          >点击更多</span
        >
        <!-- 层级太多显示弹窗 -->
        <el-dialog
          title="回复评论详细"
          :visible.sync="subArticleComment.levelMore"
          append-to-body
        >
          <div class="ui threaded comments" ref="comment_header">
            <multistage
              class="replyMore"
              style="width: 100%"
              ref="status"
              :children="subArticleComment.children"
              v-if="
                !subArticleComment.more &&
                subArticleComment.level != 0 &&
                subArticleComment.level % 5 == 0
              "
              :more_ex_progs="more"
            />
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import dateFormat from "dateformat";
import { mapState } from "vuex";
export default {
  name: "multistage",
  props: ["children", "oindex", "more_ex_progs"],
  data() {
    return {
      // imgSrc: require("../../../public/img/noavatar.png"),
      // imgSrc: "",
      inputComment: "",
      showdataId: "",
      userinfo: "",
      more: false,
      keyword: "少",
      line2: "",
      showtime: "",
      more2: false,
      moreT: false,
      more_ex: false,
      wu_more: true,
      keychildren: [],
      // host:'http://127.0.0.1:8008'
      hosts: "",
      outerVisible: false,
      innerVisible: false,
    };
  },
  methods: {
    un_moreshow(_, obj) {
      this.$bus.$emit("ismore", { index: obj });
      this.wu_more = !this.wu_more;
      // console.log(obj);
    },
    moreshow(obj) {
      // 放大               回复           线
      if (!this.more && typeof obj == "number") {
        this.keychildren.splice(obj, 1);
      }
      if (typeof obj != "undefined" && typeof obj.Id != "undefined") {
        this.$bus.$emit("ismore", obj);
        this.more = obj.obj && this.more;
      }
    },
    async commitreply(data, reply_type) {
      if (this.inputComment == "") {
        this.$message({
          showClose: true,
          message: "请输入回复",
          type: "error",
          offset: 100,
        });
        return;
      }
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("reply_id", data.id);
        param.append("comment_id", data.comment_id);
        param.append("content", this.inputComment);
        param.append("reply_type", reply_type);
        param.append("to_user_id", data.from_user_id); //给谁发消息（上一个留言的用户）
        const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
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
          this.inputComment = "";
        }
      } catch (err) {
        console.log(err);
      }
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
      console.log("888");
      this.showdataId = data.id;
    },
    getuserinfo(id) {
      this.$bus.$emit("delreply", { id: id, type: "reply" });
    },
    //去更多回复(舍弃)
    toReplyDetail(subArticleComment) {
      console.log("099", subArticleComment);
      this.$router.push({
        path: "/ReplyDetail",
        query: {
          replyData: subArticleComment,
          oindex: this.oindex,
          more_ex_progs: this.more_ex_progs,
        },
      });
    },
  },
  mounted() {
    this.userinfo = this.user;
    this.hosts = this.host;
  },
  computed: {
    ...mapState(["host", "user"]),
  },
};
</script>

<style lang="less" >
@import "../../../src/assets/css/comment.css";
.ui.comments .comment .text img {
  height: 100px;
}
.replyMore .comments .comment .content .actions {
  position: relative;
  z-index: 10;
}
</style>