<template>
  <div class="hot min_box">
    <h3>热门标签</h3>
    <div v-for="item in data" :key="item.id">
      <div @click="toTopic(item)">#{{ item.name }}</div>
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
        "http://127.0.0.1:8008/api/getcategory"
      );
      try {
        if (dateinfo.data.status === 1) {
          alert(dateinfo.data.message);
        } else {
          _this.data = dateinfo.data;
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

<style>
</style>