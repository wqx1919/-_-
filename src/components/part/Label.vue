<template>
  <div class="hot min_box">
    <h4>关注最多标签</h4>
    <div>
      <div
        v-for="item in data"
        :key="item.id"
        @click="toTopic(item)"
        class="content"
      >
        <span>#</span>{{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Label",
  data() {
    return {
      data: [],
    };
  },
  async mounted() {
    await this.getDate();
  },
  methods: {
    async getDate() {
      let _this = this;
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/my/getFollowCategory"
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
          _this.data = dateinfo.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    toTopic(item) {
      this.$router.push({
        path: "/topic",
        query: item,
      });
    },
  },
  computed: {
    //奇数
    oddNumber() {
      let arr = [];
      for (const key in this.data) {
        if (key % 2 != 0) {
          arr.push(this.data[key]);
        }
      }
      return arr;
    },
    //偶数
    even() {
      let arr = [];
      for (const key in this.data) {
        if (key % 2 == 0) {
          arr.push(this.data[key]);
        }
      }
      return arr;
    },
  },
};
</script>

<style lang="less">
.hot {
  h4{
    color: var(--defaultcolor);
  }
  .content {
    padding: 0px 9px;
    border-radius: 20px;
    font-size: 12px;
    background-color: rgb(244, 244, 244);
    color: rgb(85, 85, 85);
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 0px;
    line-height: 24px;
    span {
      margin-right: 4px;
      color: rgb(255, 84, 0);
    }
  }
}
</style>