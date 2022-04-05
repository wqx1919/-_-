<template>
  <div class="page-AdiminMessage">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.account.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="id" prop="id"> </el-table-column>
      <el-table-column label="姓名" prop="account"> </el-table-column>
      <!-- <el-table-column label="状态" prop="ban"> </el-table-column>
       -->
      <el-table-column label="申诉信息" prop="unblock"></el-table-column>
      <el-table-column label="封禁理由" prop="reason"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索当前页"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="unblockOpen(scope.$index, scope.row, 1)"
            :disabled="scope.row.ban === 1"
            >通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :total="number"
    />
  </div>
</template>

<script>
export default {
  name: "AdmineMessage",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1, //初始页
      pagesize: 8, //    每页的数据
      number: 0,
    };
  },
  methods: {
    async loadData() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/admin/AdminMessage",
          // {params:{ _user_id: this.$route.params._user_id ,type:"comment"}}
          { params: { offset: _this.pagesize * (_this.currentPage - 1) } }
        );

        if (res.data.status === 1) {
          alert(res.data.message);
          // alert("00")
        } else {
          //   console.log(res.data);
          _this.tableData = res.data.data;
          _this.number = res.data.number;
          //   await _this.thumbs("like");
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
    handleCurrentChange: async function (currentPage) {
      this.currentPage = currentPage;
      await this.loadData();
      console.log(this.currentPage, this.pagesize * (this.currentPage - 1)); //点击第几页
      // console.log(this..slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))  //第几页数据
    },
    async unblockOpen(index, row, status) {
      let _this = this;
      // 发送axios 请求 目的是 更新user 字段和 插入封禁用户ban 表
      let param = new URLSearchParams();
      param.append("ban", status);
      param.append("user_id", row.id);
      const res = await _this.$axios.post(
        "http://127.0.0.1:8008/admin/AdminBan",
        param
      );
      try {
        if (res.data.status === 1) {
          this.$message({
            offset: 100,
            type: "error",
            message: res.data.message,
          });
        } else {
          await this.loadData();
          this.$message({
            offset: 100,
            type: "success",
            message: "解禁用户成功",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>

<style>
</style>