<template>
  <div class=" User">
    <!-- 基本资料 -->
    <div class="info min_box">
      <div class="top">
        <!-- 头像... -->
        <el-avatar shape="square" :size="122" :src="avatar" />
        <div class="right">
          <!-- 昵称 -->
          <h1 class="name">
            {{ userInfo.account }}
          </h1>
          <!-- 邮箱 -->
          <p>{{ userInfo.email }}</p>
          <el-button type="primary" @click="toUpdate"> 修改资料 </el-button>
        </div>
      </div>
    </div>

    <div class="user_outline">
      <!-- 用户数据 -->
      <el-tabs type="border-card" class="min_box user_push">
        <!-- 用户的关注的书名 -->

        <el-tab-pane label="主题" name="first">
          <ul>
            <li>
              <router-link
                class="router-link style datalist"
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
                  (currentPageTopic - 1) * pagesizeTopic,
                  currentPageTopic * pagesizeTopic
                )"
                :key="index"
              >
                <div class="content">
                  <h5 class="title">{{ obj.title }}</h5>
                  <p >{{ obj.content }}</p>
                </div>
              </router-link>
            </li>
          </ul>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChangeTopic"
            @current-change="handleCurrentChangeTopic"
            :current-page="currentPageTopic"
            :page-size="pagesizeTopic"
            :total="topic.length"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 用户发布的帖子 -->

        <el-tab-pane label="板块" name="second">
          <div
            class="category"
            v-for="item in category.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )"
            :key="item.id"
            @click="toTopic(item)"
          >
            书名: {{ item.name }}
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="category.length"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>

      <!-- 简略信息 -->
      <div class="user_brief">
        <div class="notflex min_box">
          <p>性别:{{ userBrief.sex }}</p>
          <p>UserID:{{ userBrief.userId }}</p>
          <p>注册时间:{{ create_atDateformat }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "dateformat";
import { mapState } from "vuex";
export default {
  name: "User",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        email: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        password: "",
        confirmPassword: "",
      },
      userInfo: "",
      // avatars: ''
      topic: [],
      currentPageTopic: 1, //初始页Topic
      pagesizeTopic: 10, //    每页的数据Topic
      category: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      activeName: "first",
      userBrief: [],
    };
  },
  async mounted() {
    const now = new Date();
    console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
    this.userInfo = this.user;
    await this.getUserTopic();
    await this.getUserCategory();
    await this.getUserBrief();
    console.log(this.userInfo);
    // console.log( this.host+ JSON.parse(this.user).avtar)
  },
  methods: {
    //修改资料
    toUpdate() {
      //  this.UpdataShow = !this.UpdataShow
      //  debugger
      this.$router.push("/Update");
    },
    //获取简略用户信息
    async getUserBrief() {
      let _this = this;
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/my/userBrief"
      );
      try {
        if (dateinfo.data.status === 1) {
          this.$message({
            showClose: true,
            message: dateinfo.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.userBrief = dateinfo.data.data[0];
        }
      } catch (err) {
        console.log(err);
      }
    },

    //获取用户关注了那些书
    async getUserCategory() {
      let _this = this;
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/my/getUserCategory"
      );
      try {
        if (dateinfo.data.status === 1) {
          this.$message({
            showClose: true,
            message: dateinfo.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.category = dateinfo.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //去当前
    toTopic(item) {
      this.$router.push({
        path: "/topic",
        query: item,
      });
    },
    async getUserTopic() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/my/userTopic"
        );

        if (res.data.status === 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
          // alert("00")
        } else {
          _this.topic = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    onSubmit() {},
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChangeTopic: function (size) {
      this.pagesizeTopic = size;
      // console.log(this.pagesizeTopic); //每页下拉显示数据
      // console.log(this)
    },
    handleCurrentChangeTopic: function (currentPage) {
      this.currentPageTopic = currentPage;
      // console.log(this.currentPageTopic); //点击第几页
      // console.log(this.topic.slice((this.currentPageTopic-1)*this.pagesizeTopic,this.currentPageTopic*this.pagesizeTopic))  //第几页数据
      console.log(
        (this.currentPageTopic - 1) * this.pagesizeTopic,
        this.currentPageTopic * this.pagesizeTopic
      );
      // console.log(this.topic.length)
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
      // console.log(this)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      // console.log(this.topic.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))  //第几页数据
    },
  },
  computed: {
    ...mapState(["host", "user"]),
    avatar() {
      return typeof this.user === "string"
        ? this.host + JSON.parse(this.user).avtar
        : this.host + this.user.avtar;
    },
    // 格式化时间
    create_atDateformat() {
      return dateFormat(this.userBrief.create_at, "yyyy-mm-dd HH:MM:ss");
    },
  },
};
</script>

<style lang="less">
.User {
  display: block;
  width: 800px;
  margin: 10px auto;
  // background-color: var(--theme_backgroun_colorcc);
  .info {
    padding-bottom: 20px;
    flex: 1;
    display: flex;
    .top {
      display: flex;
      flex: 1;
      .el-avatar img{
       width: 100%;
       height: auto;
      }
      .right {
        // flex: 1;
        // flex-grow: 1;
        // display: flex;
        flex: 1;
        margin-left: 15px;
      }
    }
  }
  .user_outline {
    display: flex;
    .user_push {
      flex: 1;
      .style {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        width: 100%;
      }
      .category:hover {
        color: var(--category-hover);
      }
    }
    .user_brief {
      margin-left: 10px;
      width: 290px;
      margin-left: 10px;
      .notflex {
        margin-left: 0;
        padding-bottom: 20px;
      }
    }
  }
}
</style>