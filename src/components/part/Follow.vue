<template>
  <div class="Follow">
    <ul>
      <li
        v-for="(obj, index) in follow.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="index"
        @click="toTopic(obj)"
      >
        <div class="content">
          <h5 class="name">{{ obj.name }}</h5>
          <p class="ellipsis_1 word-break">{{ obj.descrition }}</p>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :total="follow.length"
    />
  </div>
</template>

<script>
export default {
  name: "Follow",
  data() {
    return {
      activeName: "first",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      follow: [],
    };
  },
  methods: {
    async load() {
        try {
          let _this = this;
          const dateinfo = await _this.$axios.get(
            "http://127.0.0.1:8008/my/getUserCategory"
          );

          if (dateinfo.data.status === 1) {
            this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "error",
              offset: 100,
            });
          } else {
            _this.follow = dateinfo.data.data;
          }
        } catch (err) {
          console.log(err);
        }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
      // console.log(this)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
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
  },
  async mounted() {
    await this.load();
  },
};
</script>
