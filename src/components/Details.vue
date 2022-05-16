<template>
  <div class="Details version_heart">
    <div class="article pannel">
      <div class="top">
        <el-dropdown
          @command="toCommentEdit"
          v-if="
            topic.topic_user_id === userinfo.id || 'admin' === userinfo.account
          "
        >
          <span class="el-dropdown-link">
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            更多
            <i class="iconfont icon-arrow-down"></i>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            v-if="
              topic.topic_user_id === userinfo.id ||
              'admin' === userinfo.account
            "
          >
            <el-dropdown-item command="Edit">
              编辑
              <i class="iconfont icon-bianji-icon iconfontstly"></i>
            </el-dropdown-item>
            <!-- <el-dropdown-item
              >复制
              <i class="iconfont icon-fuzhi iconfontstly_fuzhi"></i>
            </el-dropdown-item>-->
            <!-- <el-dropdown-item>
              举报 <i class="iconfont icon-tousujubao iconfontstly_jubao"></i>
            </el-dropdown-item>-->
            <el-dropdown-item command="Delete">
              删除
              <!-- （管理员和自己） -->
              <i class="iconfont icon-shanchu_icon iconfontstly_shanchu"></i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="body" v-if="!unTopic">
        <!-- 文章数据 -->
        <h3 class="tltle">{{ topic.title }}</h3>
        <div class="text" v-html="topic.content_html">
          {{ topic.content_html }}
        </div>
      </div>
      <div class="body" v-if="unTopic">
        <!-- 文章被删除数据 -->
        {{ unTopic }}
      </div>
      <div class="bottom">
        <!-- 弹窗框 -->
        <!-- <el-popover
          v-model="thumbShow"
          style="position: absolute"
          placement="bottom"
          ref="likePopover"
          title="提示:"
          width="200"
          trigger="click"
          content="你已经点赞过"
        /> -->

        <i
          class="iconfont icon-24px"
          @click="changThumbs('like')"
          :class="isAnimationLike"
          v-popover:likePopover
          >{{ linkNumber }}</i
        >
        <!-- <el-popover
          v-model="unthumbShow"
          style="position: absolute"
          placement="bottom"
          ref="unLikePopover"
          title="提示:"
          width="200"
          trigger="click"
          content="你已经点踩过"
        /> -->
        <i
          class="iconfont icon-caozuo_cai_24px"
          v-popover:unLikePopover
          @click="changThumbs('unlike')"
          :class="isAnimation"
          >{{ unLinkNumber }}</i
        >
        <i class="iconfont icon-pinglun" @click="jump()"></i>
      </div>
      <div class="ui threaded comments" ref="comment_header">
        <div
          class="comment"
          v-for="(data, index) in tree_comment.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="data.id"
        >
          <div
            class="expand_wu"
            v-if="data.more"
            :indexa="data.id"
            @click="moreshow(data.id, index)"
          >
            <!-- {{data.id}} -->
            <!-- <p>
              更 <i>{{ keyword }}</i> 评论
            </p>-->
            <span class="iconfont icon-icon-expand_wu-copy expand"></span>
          </div>
          <div style="width: 100%">
            <a class="avatar">
              <img :src="hosts + data.avtar" alt="头像" />
              <!-- {{data.avtar}} -->
              <!-- <img src="../../public/img/noavatar.png" alt="头像"> -->
            </a>
            <div class="content" style="width: 100%">
              <a class="author">{{ data.account }}</a>
              <div class="metadata">
                <span class="date">{{ data.create_at }}</span>
                <!-- 2022年2月5日15点46分 -->
              </div>
              <div class="text" v-html="data.content">{{ data.content }}</div>
              <div class="actions" v-if="!data.more">
                <span class="reply" @click="showCommentInput(data)">回复</span>
                <span
                  style="margin-right: 15px"
                  class="delete"
                  v-if="
                    (userinfo.account === data.account && data.status === 1) ||
                    ('admin' === userinfo.account && data.status === 1)
                  "
                  @click="getuserinfo(data.id)"
                >
                  <i class="iconfont icon-shanchu_icon style"></i>
                  删除
                </span>
              </div>
            </div>
            <multistage
              ref="replytest"
              v-if="tree_comment.length != index && !data.more"
              :children="data.children"
              :oindex="index"
            />
            <!-- 最后一个组件不该用划线 -->
            <div
              class="write-reply"
              v-if="data.children.length > 0 && !data.more"
              @click="showCommentInput(data, $event)"
            >
              <i class="el-icon-edit"></i>
              <span class="add-comment">添加新评论</span>
            </div>
            <transition name="fade">
              <div
                ref="input_txt"
                id="input_txt"
                class="input-wrapper"
                v-if="showdataId === data.id"
              >
                <el-input
                  class="gray-bg-input"
                  v-model="inputComment"
                  type="textarea"
                  :rows="3"
                  autofocus
                  placeholder="写下你的评论"
                ></el-input>
                <div class="btn-control">
                  <span class="cancel" @click="cancel">取消</span>
                  <el-button
                    class="btn"
                    type="success"
                    round
                    @click="commitreply(data, 'comment')"
                    >确定</el-button
                  >
                </div>
              </div>
            </transition>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="tree_comment.length"
        ></el-pagination>
        <!-- <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>-->
        <div class="input-wrapper">
          <div id="div1">
            <!-- <p v-if="blurClear">写下你的评论</p> -->
          </div>
          <div class="btn-control">
            <span class="cancel" @click="cancel">取消</span>
            <el-button class="btn" type="success" round @click="commitComment"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <Label />
    </div>
  </div>
</template>

<script >
import { nanoid } from "nanoid";
import dateFormat from "dateformat";
import Label from "./part/Label.vue";
// import Hot from "./part/Hot.vue";
// import Replyn from "./part/Replyn.vue";
import multistage from "./part/Multistage";
import wangEditor from "wangeditor"; //引入刚npm安装的wangeditor插件
import { mapState } from "vuex";
export default {
  name: "Details",
  // props:['content','title'],
  data() {
    return {
      tree_comment: [],
      showdataId: "",
      inputComment: "",
      temp: "",
      userinfo: "",
      topic_user_account: "",
      chrildadd: "",
      chrilddel: "",
      imgSrc: require("../../public/img/noavatar.png"),
      target: "",
      more: false,
      keyword: "多",
      oindex: {},
      currentPage: 1, //初始页
      pagesize: 8, //    每页的数据
      hosts: "",
      linkNumber: "",
      unLinkNumber: "",
      isthumbs: false, //当前是否已点赞
      isunthumbs: false, //是否以踩
      thumbShow: false, //已点赞提示
      unthumbShow: false, //已以踩提示
      isAnimation: "",
      isAnimationLike: "",
      topic: {
        title: "",
        content: "",
      },
      unTopic: false,
      blurClear: true,
      wangEditorGlobal: "",
      levelMoreList: [],
    };
  },
  components: {
    Label,
    // Hot,
    // Replyn,
    multistage,
  },
  methods: {
    async toCommentEdit(command) {
      //编辑
      if (command == "Edit") {
        let _this = this;
        console.log(_this.$route);
        _this.$router.push({
          path: "/comment",
          query: {
            id: _this.$route.params.id,
            topic_category_id: _this.$route.params.topic_category_id,
            form: "edit",
          },
        });
      }
      //删除
      if (command == "Delete") {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", _this.$route.params.id);
        const dateinfo = await _this.$axios.post(
          "http://127.0.0.1:8008/api/delteTopicById",
          param
        );
        try {
          if (dateinfo.data.status === 1) {
            _this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "error",
              offset: 100,
            });
          } else {
            _this.$message({
              showClose: true,
              message: "更新帖子成功",
              type: "success",
              offset: 100,
            });
            await _this.loadTopic();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    // 获取数据
    async loadTopic() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/api/getTopicById",
          // {params:{ topic_user_id: this.$route.params.topic_user_id ,type:"comment"}}
          { params: { id: _this.$route.params.id } }
        );
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
          _this.unTopic = res.data.message;
        } else {
          _this.topic = res.data.data;
        }
        // console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    //全部该贴点赞
    async Allthumbs() {
      let _this = this;
      try {
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/my/AllTopicThumbs",
          { params: { thumbs_topic_id: _this.$route.params.id } }
        );

        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
          // alert("00")
        } else {
          // console.log( res.data.data[0])

          // if (res.data[0].number != 0)
          // console.log(res.data)
          // _this.unLinkNumber = res.data[0].number;
          //  _this.demonuber =res.data[0].number
          for (const key in res.data.data) {
            // console.log( res.data[key])
            if (res.data.data[key].state == 1) {
              //  console.log(res.data)
              // console.log(res.data);
              _this.linkNumber = res.data.data[key].number;
              if (res.data.data[key].number == 0) _this.linkNumber = "";
            } else {
              _this.unLinkNumber = res.data.data[key].number;
              if (res.data.data[key].number == 0) _this.unLinkNumber = "";
            }
          }
        }
        //  console.log(res.data[0]['count(*)'])
        //  console.log(_this.unLinkNumber)
        // }
      } catch (err) {
        console.log(err);
      }
    },
    //点赞是否点赞
    async thumbs() {
      let _this = this;
      try {
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/my/Allthumbs",
          { params: { thumbs_topic_id: _this.$route.params.id } }
        );
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          if (res.data.data == -2 || res.data.data == 0) {
            _this.isthumbs = false;
            _this.isunthumbs = false;
            // if( _this.linkNumber == "")
            // _this.linkNumber = "";
            // _this.unLinkNumber = "";
          } else if (res.data.data.state == -1) {
            _this.isunthumbs = true;
            _this.isthumbs = false;
            _this.isAnimation = "Like-or-dislike-by-default";
          } else {
            _this.isthumbs = true;
            _this.isunthumbs = false;
            _this.isAnimationLike = "Like-or-dislike-by-default";
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    //改变点赞
    async changThumbs(params) {
      let _this = this;
      // console.log(params);
      // if (this.isthumbs) {
      //   return
      // }
      if (params == "like" && !this.isthumbs) {
        this.thumbShow = !this.thumbShow;
        this.isAnimationLike = "jello-vertical";
        this.isAnimation = "";
        this.isthumbs = true;
        this.isunthumbs = false;
        // this.$forceUpdate();
        try {
          let param = new URLSearchParams();
          param.append("state", 1);
          param.append("thumbs_topic_id", _this.$route.params.id);
          const res = await _this.$axios.post(
            "http://127.0.0.1:8008/my/postaddthumbs",
            // {params:{ topic_user_id: this.$route.params.topic_user_id ,type:"comment"}}
            param
          );

          if (res.data.status === 1) {
            _this.$message({
              showClose: true,
              message: res.data.message,
              type: "error",
              offset: 100,
            });
            // alert("00")
          } else {
            console.log(res.data);
            _this.$message({
              showClose: true,
              message: res.data.message,
              type: "success",
              offset: 100,
            });
            await _this.Allthumbs();
            // alert(this.thumbShow)
            // if (this.isthumbs) {
            //   this.isAnimation = "jello-vertical";
            // }
          }
        } catch (err) {
          console.log(err);
        }
        // this.thumbShow = false
      } else if (params == "like" && _this.isthumbs) {
        _this.$message({
          showClose: true,
          message: "不能重复点赞",
          type: "warning",
          offset: 100,
        });
        // console.log(this.thumbShow)
        // this.isAnimationLike = "";
        // _this.thumbShow = true;
        // alert("提示重复点赞"+_this.thumbShow)
        // this.$forceUpdate();
        // alert("kkkk" + _this.thumbShow);
        // console.log(this.thumbShow)
      }

      if (params == "unlike" && !this.isunthumbs) {
        this.isAnimation = "jello-vertical";
        this.isAnimationLike = "";
        this.unthumbShow = !this.unthumbShow;
        this.isunthumbs = true;
        this.isthumbs = false;
        try {
          let param = new URLSearchParams();
          param.append("state", -1);
          param.append("thumbs_topic_id", _this.$route.params.id);
          const res = await _this.$axios.post(
            "http://127.0.0.1:8008/my/postaddthumbs",
            param
          );

          if (res.data.status === 1) {
            _this.$message({
              showClose: true,
              message: res.data.message,
              type: "error",
              offset: 100,
            });
            // alert("00")
          } else {
            _this.$message({
              showClose: true,
              message: res.data.message,
              type: "success",
              offset: 100,
            });
            await _this.Allthumbs();
            // console.log(res.data);
            // if (this.isthumbs) {
            //   this.isAnimation = "jello-vertical";
            // }
            // console.log(1)
          }
        } catch (err) {
          console.log(err);
        }
      } else if (params == "unlike" && this.isunthumbs) {
        _this.$message({
          showClose: true,
          message: "不能重复点踩",
          type: "warning",
          offset: 100,
        });
        // this.isAnimation = "";
        // this.unthumbShow = true;
        // alert(this.unthumbShow);
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      //每页下拉显示数据
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      //点击第几页
      this.currentPage = currentPage;
    },
    //数组（此时变成树状结构）改变
    treeForeach(tree, id) {
      for (let data of tree) {
        if (data.id == id) {
          this.$set(data, "more", !data.more);
          if (data.level != 0 && data.level % 5 == 0) {
            this.$set(data, "levelMore", !data.levelMore);
            if (this.levelMoreList.length == 0) {
              this.levelMoreList.push({
                id: id,
                levelMore: data.levelMore,
              });
            } else {
              for (let index = 0; index < this.levelMoreList.length; index++) {
                if (this.levelMoreList[index].id == id) {
                  this.levelMoreList[index].levelMore = data.levelMore;
                  break;
                }
                if (index == this.levelMoreList.length - 1) {
                  this.levelMoreList.push({
                    id: id,
                    levelMore: data.levelMore,
                  });
                }
              }
            }
          }
        }
        data.children && this.treeForeach(data.children, id); // 遍历子树
      }
      return tree;
    },
    // //数组（此时变成树状结构）改变
    // treeForeachlevelMore(tree, id) {
    //   for (let data of tree) {
    //     if (data.level!=0 && data.level% 5===0 && data.id == id && typeof data.levelMore !="undefined") {
    //       this.$set(data, "levelMore", !data.levelMore);
    //       this.$set(data, "more", !data.more);
    //     }
    //     data.children && this.treeForeachlevelMore(data.children, id); // 遍历子树
    //   }
    //   return tree;
    // },
    //遍历数组（此时已经转成树结构）赋值(后端初始化-舍弃)
    treeForeach_(tree, level) {
      tree.forEach((data) => {
        this.$set(data, "more", false);
        this.$set(data, "level", level);
        this.$set(data, "levelMore", false);
        data.children && this.treeForeach_(data.children, level + 1); // 遍历子树
      });
    },
    //合并数组
    listAssign(arrA, arrB) {
      Object.keys(arrA).forEach((key) => {
        arrA[key] = arrB[key] || arrA[key];
      });
    },
    listAssignA(arrA, arrB) {
      for (const keyA in arrA) {
        for (const keyB in arrB) {
          if (arrA[keyA].id == arrB[keyB].id) {
            if (arrA[keyA].status != arrB[keyB].status) {
              //删除
              arrB[keyB] = arrA[keyA];
            }
            break;
          }
          if (keyB == arrB.length - 1) {
            arrB.push(arrA[keyA]);
          }
        }
      }
      return arrB;
    },
    //拉伸树形结构数组数据为一维数组，方便比对
    deepTraversal(data) {
      const result = [];
      data.forEach((item) => {
        const loop = (data) => {
          result.push(data);
          let child = data.children;
          if (child) {
            for (let i = 0; i < child.length; i++) {
              loop(child[i]);
            }
          }
        };
        loop(item);
      });
      return result;
    },
    deepCopy(data) {
      let dataTmp = undefined;

      if (data === null || !(typeof data === "object")) {
        dataTmp = data;
      } else {
        dataTmp = data.constructor.name === "Array" ? [] : {};
        for (let key in data) {
          dataTmp[key] = this.deepCopy(data[key]);
        }
      }

      return dataTmp;
    },
    cloneObject(source) {
      var value;
      var clone = Object.create(source);
      for (let key in source) {
        if (source.hasOwnProperty(key) === true) {
          value = source[key];
          if (value !== null && typeof value === "object") {
            clone[key] = this.cloneObject(value);
          } else {
            clone[key] = value;
          }
        }
      }
      return clone;
    },
    treeToArray(datas) {
      //遍历树  获取id数组
      var expandedKeys = [];
      for (var i in datas) {
        // var item = this.deepCopy(datas[i]);
        var item = JSON.parse(JSON.stringify(datas[i]));
        delete item.children;
        expandedKeys.push(item);
        if (datas[i].children) {
          expandedKeys = expandedKeys.concat(
            this.treeToArray(datas[i].children)
          );
        }
      }
      return expandedKeys;
    },
    totree(chlichid, list_) {
      var list = JSON.parse(JSON.stringify(list_));
      let obj = {};
      let result = [];
      let count = 0;
      //  let list = JSON.parse(JSON.stringify(list_))
      //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
      list.map((el) => {
        obj[el.id] = el;
      });
      for (let i = 0, len = list.length; i < len; i++) {
        if (chlichid == list[i].comment_id) {
          //挂载在哪一条著评论下,是回复的儿子,回复的回复的爸爸
          count++;
          let id = list[i].reply_id;
          let type = list[i].reply_type;
          if (id == chlichid && type === "comment") {
            // 头部
            result.push(list[i]);
            continue;
          }
          if (obj[id].children) {
            obj[id].children.push(list[i]);
          } else {
            obj[id].children = [list[i]];
          }
        }
      }
      if (typeof result[0] != "undefined") {
        result[0].count = count;
      }
      return result;
    },

    moreshow(id, index) {
      this.more = true;
      // this.moreobj.id = '';
      // alert(this.tree_comment[index].more)
      this.$set(this.tree_comment[index], "more", false);
      // this.$set(this.oindex[index],'more', false)
      // console.log(this.tree_comment[index])
      // this.tree_comment[index].more=false
      // this.oindex[index].more=false
      // this.$forceUpdate()
      //  console.log(this.tree_comment[index].more)
      // this.moreobj.more=false
    },
    async getData() {
      console.log("--000---");
      let _this = this;
      let param = new URLSearchParams();
      param.append("topic_id", this.$route.params.id);
      await _this.$axios
        .post("http://127.0.0.1:8008/api/gettopic_comment", param)
        .then(
          (res) => {
            if (res.data.status === 1) {
              _this.$message({
                showClose: true,
                message: res.data.message,
                type: "error",
                offset: 100,
              });
            } else {
              // _this.tree_comment = res.data.data.comment_results;
              if (_this.tree_comment.length == 0) {
                _this.tree_comment = res.data.data.comment_results;
              } else {
                let oldArr = _this.treeToArray(_this.tree_comment);
                let newArr = _this.treeToArray(res.data.data.comment_results);
                newArr = _this.listAssignA(newArr, oldArr);
                let comment = [];
                for (let index = 0; index < newArr.length; index++) {
                  if (newArr[index].level == 0) {
                    comment.push(newArr[index]);
                    // newArr.splice(index,1)
                    // delete oldArr[index];
                  }
                }
                let tree = [];
                for (let element = 0; element < comment.length; element++) {
                  tree.push(_this.totree(comment[element].id, newArr));
                  if (tree[element]) comment[element].children = tree[element]; //子元素变成数组@@ []会导致结构不一
                }
                _this.tree_comment = comment;
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    async getuserinfo(Id, type = "comment") {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/deletecommentById",
          { params: { id: Id, type: type } }
        );
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          //刷新数据
          await _this.getData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    //点赞按钮--废弃
    likeClick(data) {
      if (data.isLike === null) {
        this.$set(data, "isLike", true);
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
      if (this.inputComment == "") {
        this.$message({
          showClose: true,
          message: "请输入评论",
          type: "error",
          offset: 100,
        });
        return;
      }
      // let _this = this;
      // let param = new URLSearchParams();
      // param.append("", this.inputComment);
      // const res = await _this.$axios.post(
      //   "http://127.0.0.1:8008/my/addtopic_comment",
      //   param
      // );
      // try {
      //   if (res.data.status === 1) {
      //     _this.$message({
      //       showClose: true,
      //       message: res.data.message,
      //       type: "error",
      //       offset: 100,
      //     });
      //   } else {
      //     await _this.getData();
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("topic_id", this.$route.params.id);
        param.append("content", this.inputComment);
        param.append("topic_type", this.$route.params.topic_category_id);
        const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
        param.append("type", "comment");
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
          await _this.getData();
          this.wangEditorGlobal.txt.html("");
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
    },
    async commitreply(data, reply_type) {
      if (this.inputComment == "" || this.inputComment == undefined) {
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
        param.append("comment_id", data.id);
        param.append("content", this.inputComment);
        param.append("reply_type", reply_type);
        param.append("to_user_id", data.from_user_id); //给谁发消息（上一个留言的用户）
        const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
        // param.append("dd","测试")
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
          await _this.getData();
          _this.inputComment = "";
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
    jump() {
      window.scrollTo({
        top: this.$refs.comment_header.offsetTop,
        behavior: "smooth", //平滑滚动
      }); //跳转指定页面的位置
      // console.log(e)
    },
    showCommentInput(data, reply) {
      this.showdataId = data.id;
      this.$nextTick(() => {
        document.querySelector("#input_txt").scrollIntoView();
        window.scrollTo(0, window.scrollY - 300); //导航遮掩
        console.log(reply);
        // @@不能用offset ,英文offset是距离最近定位的距离
        //         getBoundingClientRect ( ) 返回值：对象 有6个属性
        // left（元素左侧相对于可视区左上角的距离）
        // right（元素右侧相对于可视区左上角的距离）
        // top（元素上边相对于可视区左上角的距离）
        // bottom（元素下边相对于可视区左上角的距离）
        // width（可视宽度）
        // height（可视高度）
      });
    },
    wangEditorFuntion() {
      const editor = new wangEditor("#div1");
      //全局变量
      this.wangEditorGlobal = editor;
      editor.config.placeholder = "写下你的评论";
      editor.config.height = 500;
      editor.config.zIndex = 10;
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        "bold",
        "head",
        // "link",
        "italic",
        "underline",
        "image",
        "emoticon",
        "undo",
        "redo",
      ];
      editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
      editor.config.uploadFileName = "myFileName"; //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 上传图片，返回结果，将图片插入到编辑器中
        let _this = this;
        // console.log(JSON.parse(this.user).id)
        let param = new FormData(); // 创建form对象
        param.append("myFileName", resultFiles[0]); // 将文件存入myFileName下面
        const dateinfo = await _this.$axios.post(
          "http://127.0.0.1:8008/addcomentfile",
          param
        );
        try {
          // console.log(dateinfo.data);
          insertImgFn(dateinfo.data.data);
        } catch (err) {
          console.log(err);
        }
        // console.log(resultFiles);
        // insertImgFn(imgUrl)
      };
      editor.config.onchange = (html) => {
        this.inputComment = html;
      };
      editor.config.onfocus = () => {
        // this.blurClear = false
        editor.config.placeholder = "";
      };
      //取消全屏功能
      editor.config.showFullScreen = false;
      editor.create();
    },
  },
  async mounted() {
    await this.getData();
    // await this.treeForeach_(this.tree_comment,0);
    await this.Allthumbs();
    await this.thumbs();
    this.wangEditorFuntion();
    this.$bus.$on("addreply", (data) => {
      this.chrildadd = data;
    });

    this.$bus.$on("delreply", (data) => {
      this.chrilddel = data;
    });

    this.$bus.$on("ismore", (data) => {
      if (typeof data.Id != "undefined") {
        this.tree_comment = this.treeForeach(this.tree_comment, data.Id);
        // console.log("---", this.levelMoreList);
        // this.tree_comment = this.treeForeachlevelMore(this.tree_comment, data.Id);
      }

      if (typeof data.index == "number") {
        this.$set(this.tree_comment[data.index], "more", true);
        this.$set(this.oindex[data.index], "more", true);
      }
    });

    this.userinfo = this.user;
    this.hosts = this.host;

    await this.loadTopic();
  },
  beforeDestroy() {
    this.$bus.$off("addreply");
    this.$bus.$off("delreply");
    this.$bus.$off("ismore");
  },
  computed: {
    ...mapState(["host", "user"]),
  },
  watch: {
    chrildadd: {
      immediate: true, //初始化时让handler调用一下
      deep: true, //深度监视
      handler() {
        this.getData();
      },
    },
    chrilddel: {
      // immediate:true, //初始化时让handler调用一下
      // deep:true,//深度监视
      handler(newValue) {
        this.getuserinfo(newValue.id, newValue.type);
      },
    },
  },
};
</script>

<style scoped>
@import "../../src/assets/css/comment.css";

.article .comments .comment {
  position: relative;
  display: flex;
  /* justify-content: space-evenly */
  align-items: center;
  /* overflow-x:scroll 只是x方向 */
}
.delete {
  display: none;
}
.article .comments .comment .actions:hover .delete,
.article .comments .comment .actions:hover .delete i {
  color: red;
  font-size: 0.875em;
  display: inline-block;
}
.article .comments .comment .actions:hover i.style {
  font-size: 0.875em;
  /* height: 14.7px; */
  /* vertical-align:middle */
  line-height: 0;
}
.article .comments .comment .content .actions:hover span {
  cursor: pointer;
}
.article .comments .comment .content .actions {
  position: relative;
  /* @@@ */
  /* background-color: rebeccapurple; */
  z-index: 10;
}
/* .article .comments .comment  .content .actions span:nth-child(1){
  width: 100%;
  display: inline-block;
} */
.article .comments .comment .actions:hover .delete {
  position: absolute;
  right: 30px;
}

.ui.threaded.comments {
  margin-bottom: 30px;
  /* box-shadow: -1px 0 0 rgba(64,158,255,.15); */
  /* background-color: yellow; */
}
.Comment_reply li .bottom {
  padding: 0 10px;
  display: block;
  position: relative;
}
.top {
  display: flex;
}
/* .content{
  background-color: var(--commentbackgroun);
} */
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
  color: var(--defaultcolor);
  /* flex-direction: column; */
}

.article {
  flex: 1;
  position: relative;
}
.article .top {
  /* height: 100px; */
  position: relative;
}
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
/* ----------------------------------------------
 * Generated by Animista on 2022-3-17 21:2:38
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@keyframes jello-vertical {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
.jello-vertical {
  animation: jello-vertical 0.9s both;
  color: var(--thumbs-color);
}
.right {
  width: 300px;
}

.Like-or-dislike-by-default {
  color: var(--thumbs-color);
}
</style>