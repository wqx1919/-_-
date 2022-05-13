<template>
  <div class="main version_heart">
    <div class="tltle pannel">
      <el-image
        class="pic"
        style="width: 100px; height: 100px"
        :src="bookinfo.imgUrl"
        :preview-src-list="srcList"
      >
      </el-image>

      <div class="left">
        <div class="top">
          <!-- <h2>书名xxxxxxxx</h2> -->
          <h2>{{ keyWord }}</h2>
          <!-- 关注内容 -->
          <div>{{ followNumber }}</div>
        </div>
        <div class="info">
          <!-- <a>12345</a><span>粉丝</span>  -->
          <!-- 多少关于这个小说话题的评论 -->
          <a>{{ topicNumber }}</a
          ><span>主题</span>
        </div>
      </div>

      <div class="right">
        <el-button
          type="primary"
          round
          class="pay_attention_to"
          @click="postaddfollow"
        >
          <i
            class="iconfont icon-zengjia iconfontstly"
            v-if="followjiaShow"
          ></i>

          {{ follow }}</el-button
        >
        <el-button
          type="primary"
          round
          class="pay_attention_to"
          @click="toAddCommen"
        >
          <i class="iconfont icon-bianji-icon iconfontstly"></i>
          发表帖子</el-button
        >
      </div>
    </div>
    <div class="topic pannel">
      <div class="content">
        <div class="left min_box">
          <ul>
            <li>
              <router-link
                class="router-link style"
                :to="{
                  name: 'details',
                  params: {
                    title: obj.title,
                    content: obj.content,
                    id: obj.id,
                    topic_category_id: obj.topic_category_id,
                    topic_user_id: obj.topic_user_id,
                  },
                }"
                v-for="(obj, index) in topic.slice(
                  (currentPage - 1) * pagesize,
                  currentPage * pagesize
                )"
                :key="index"
              >
                <!-- {{obj}}--- -->
                <!-- {{topic.slice((currentPage-1)*pagesize,currentPage*pagesize)}} -->

                <div class="content">
                  <h5 class="title">{{ obj.title }}</h5>
                  <p>{{ obj.content }}</p>
                </div>
              </router-link>
            </li>
            <!-- <li>
              <router-link class="router-link" to="/Comment">评论</router-link>
            </li> -->
          </ul>
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="topic.length"
          >
          </el-pagination>
          <router-link class="router-link add" to="/Comment">
            我也要说
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24_fayanduihualiuyan"></use>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Topic",
  data() {
    return {
      topicNumber: "", //关于这个小说的帖子数量
      followNumber: "", //关注数量
      bookinfo: {
        imgUrl: "",
        lastTime: "",
        site: "",
        desc: "",
      },
      srcList: [], //图片列表
      keyWord: "斗破苍穹", //测试使用的默认值
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      topic: [], //所属小说所有的帖子
      follow: "关注",
      followjiaShow: true, //加号是否展示
    };
  },
  async mounted() {
    await this.getFollowNumber();
    await this.getcategory_topic();
    await this.followShow();
    await this.getData(this.$route.query.name);
  },
  methods: {
    //合并数组
    listAssign(arrA, arrB) {
      Object.keys(arrA).forEach((key) => {
        arrA[key] = arrB[key] || arrA[key];
      });
    },
    //获取网上图片
    async getData(key) {
      this.keyWord = key;
      let result = await axios.get(`/api8${key}&cid=eef_&os=ios&appverion=1`);
      try {
        if (result.data.all_book_items[0].name != key) {
          // alert("网上话题未找到,暂无图片");
          this.$message({
            showClose: true,
            message: "网上话题未找到,暂无图片",
            type: "warning",
            offset: 100,
          });
          return;
        }
        this.listAssign(this.bookinfo, result.data.all_book_items[0]);
        this.srcList = result.data.all_book_items[0].imgUrl.split(";");
        this.bookinfo.desc = result.data.all_book_items[0].desc;
      } catch (error) {
        console.error(error.result.data);
      }
    },
    //获取该分类下的帖子
    async getcategory_topic() {
      let response = await axios.get(
        "http://127.0.0.1:8008/api/getcategory_topic",
        { params: { name: this.$route.query.name } }
      );
      let _this = this;
      try {
        _this.topic = response.data;
        _this.topicNumber = response.data.length;
      } catch (error) {
        console.error(error.response.data);
      }
    },
    //获取关注这个话题的数量
    async getFollowNumber() {
      let _this = this;
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/my/getfollow"
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
          _this.followNumber = dateinfo.data.length;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 是否关注
    async followShow() {
      let _this = this;
      // console.log(this.user.id)
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/my/getisfollow",
        {
          params: {
            user_id: this.user.id,
            category_id: this.$route.query.id,
          },
        }
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
          // _this.followNumber = dateinfo.data.length;
          if (dateinfo.data.length == 0) {
            console.log(dateinfo.data);
            _this.follow = "关注";
            _this.followjiaShow = true;
            return;
          }
          _this.follow = "已关注";
          _this.followjiaShow = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 加关注//取消
    async postaddfollow() {
      let _this = this;
      let param = new URLSearchParams();
      param.append("category_id", _this.$route.query.id);
      if (_this.followjiaShow) {
        param.append("state", 1);
      } else {
        param.append("state", 0);
      }
      // _this.followjiaShow =!_this.followjiaShow
      // console.log(this.user.id)
      const dateinfo = await _this.$axios.post(
        "http://127.0.0.1:8008/my/postaddfollow",
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
          if (dateinfo.data.length == 0) {
            _this.follow = "关注";
            _this.followjiaShow = true;
            await _this.getFollowNumber();
            return;
          } else {
            _this.follow = "已关注";
            _this.followjiaShow = false;
            _this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "success",
              offset: 100,
            });
            await _this.followShow();
            await _this.getFollowNumber();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 去发表帖子
    toAddCommen() {
      // console.log(this.$route.query)
      console.log(11);
      this.$router.push({
        path: "/comment",
        query: {
          category_name: this.$route.query.name,
          category_id: this.$route.query.id,
          isDisable: true,
          // demo: "111",
        },
      });
    },
    //分页
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      //每页下拉显示数据
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      //点击第几页
      this.currentPage = currentPage;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" >
.main {
  flex-direction: column;
  .tltle {
    height: 100px;
    border-radius: 5px;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    .pic {
      width: 110px !important;
      height: 150px !important;
      margin-top: -65px;
    }
    .left {
      flex: 1;
      margin-left: 10px;
      .top {
        // display: flex;
        h2 {
          font-size: 22px;
          font-weight: bold;
          display: inline-block;
          margin: 0px 10px 8px 0px;
          vertical-align: middle;
        }
        div {
          border: 1px solid rgb(176, 188, 196);
          border-radius: 12px;
          font-size: 12px;
          vertical-align: text-bottom;
          color: rgb(124, 141, 156);
          padding: 0px 6px;
          margin-right: 10px;
          display: inline-block;
        }
      }
      .info {
        display: flex;
        a {
          font-size: 16px;
          font-weight: bold;
          font-family: Arial;
          margin-right: 6px;
          color: rgb(24, 195, 210);
        }
        span {
          font-size: 12px;
          margin-right: 20px;
        }
      }
    }
    // justify-content: space-between;
    .right {
      display: flex;
      // margin-left: 328px;
      .pay_attention_to {
        height: 30px;
        display: flex;
        align-items: center;
        // 法1
        //       flex: 1;
        // text-align: right;
        // 法2
        margin-left: 50px;
        // left: 50px;
        // justify-content: flex-end;
        /deep/ span {
          width: 100%;
        }
      }
    }
  }
  .topic {
    margin-top: 30px;
    .left {
      flex: 1;
      position: relative;
      ul {
        /* border-bottom: 1px solid #e5e5e5; */
        // padding: 20px;
        .style {
          display: flex;
          border-bottom: 1px solid #e5e5e5;
          width: 100%;
          .pic {
            display: flex;
            height: 50px;
            width: 50px;
            margin-right: 15px;
            img {
              width: 100%;
              /* display: block; */
            }
          }
        }
      }
    }
  }
}
</style>