<template>
  <div class="search">
    <div class="min_box">
      <!-- 提示 -->
      <el-result 
        v-if="!topic.length"
       icon="error" :title="resultMessage" >
        <template slot="extra">
          <el-button type="primary" @click="toBack()" size="medium">返回</el-button>
        </template>
      </el-result>
      <el-result
        v-if="topic.length"
        icon="success"
        :title="resultMessage"
        subTitle="点击列表即可跳转"
      >
        <template slot="extra">
          <el-button type="primary" @click="toBack()" size="medium">返回</el-button>
        </template>
      </el-result>
      <!-- 渲染列表 -->
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
            <div class="content">
              <h5 class="title">{{ obj.title }}</h5>
              <p>{{ obj.content }}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        v-if="topic.length"
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="topic.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicList",
  data() {
    return {
      topic: [], //搜素结果小说所有的帖子
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      resultMessage: "搜索成功",
      icon: "warning",
    };
  },
  methods: {
    
    toBack(){
     this.$router.back()
    } ,
    //获取搜索结果
    async searchTopic() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/api/searchTopic",
          // {params:{ topic_user_id: this.$route.params.topic_user_id ,type:"comment"}}
          { params: { searchKeyword: _this.searchKeyword } }
        );
        if (res.data.status === 1) {
          // alert(res.data.message);
          _this.resultMessage = res.data.message;
          _this.icon = "error";
          _this.topic = [];
        } else {
          _this.topic = res.data.data;
          _this.resultMessage = res.data.message;
          _this.icon = "success";
        }
      } catch (err) {
        console.log(err);
      }
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
  async mounted() {
    await this.searchTopic();
    // Vue官方写法
    // this.$watch(
    //   () => this.$route.query,
    //   async () => {
    //     // 对路由变化做出响应...
    //     await this.searchTopic();
    //     // console.log(toParams,previousParams)
    //   }
    // );
  },
  computed: {
    searchKeyword() {
      return this.$route.query.searchKeyword;
    },
  },
  watch: {
    searchKeyword: {
      async handler() {
        await this.searchTopic();
      },
    },
  },
};
</script>
<style lang="less">
.search {
  width: 60%;
  margin: 20px auto;
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
</style>