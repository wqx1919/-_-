<template>
  <div class="all_category version_heart">
    <div class="title min_box"><h5>全部分类</h5></div>
    <div class="content min_box">
      <ul>
        <li
            class="router-link style datalist"
            v-for="(obj, index) in category.slice(
              (currentPagecategory - 1) * pagesizecategory,
              currentPagecategory * pagesizecategory
            )"
            :key="index"
            @click="toTopic(obj)"
          >
            <div class="content">
              <h5 class="name">{{ obj.name }}</h5>
              <p class="ellipsis_1 word-break">{{ obj.descrition }}</p>
            </div>
          <!-- </router-link> -->
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChangecategory"
        @current-change="handleCurrentChangecategory"
        :current-page="currentPagecategory"
        :page-size="pagesizecategory"
        :total="category.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Allcategory",
  data() {
    return {
      currentPagecategory: 1, //初始页
      pagesizecategory: 10, //    每页的数据
      activeName: "first",
      category: [],
    };
  },
  async mounted() {
    await this.load();
  },
  methods: {
    async load() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/api/getcategory"
        );

        if (res.data.status === 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.category = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    toTopic(obj) {
      this.$router.push({
        path: "/topic",
        query: {
          id: obj.id,
          name: obj.name,
        },
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChangecategory: function (size) {
      this.pagesizecategory = size;
    },
    handleCurrentChangecategory: function (currentPage) {
      this.currentPagecategory = currentPage;
    },
  },
};
</script>
<style lang="less">
.all_category {
  //  display: flex;
  display: block;
  width: 700px;
}
</style>
