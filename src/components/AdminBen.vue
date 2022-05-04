<template>
  <div class="page-AdminBen">
    <!-- 我是AdminBen -->
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
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.ban === 1">正常</span>
          <!-- //这里使用===还是==得看返回值是什么类型的，需不需要转换啥的，自己尝试一下就可以了，这样直接写也是行的，不过推荐最好使用=== -->
          <span v-else>停用</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索当前页" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="unblockOpen(scope.$index, scope.row, 1)"
            :disabled="scope.row.ban === 1"
            >解封</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="banOpen(scope.$index, scope.row, 0)"
            :disabled="scope.row.ban === 0"
            >封禁</el-button
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
import dateFormat from "dateformat";

export default {
  name: "AdminBen",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1, //初始页
      pagesize: 8, //    每页的数据
      number: 0,
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    async loadData() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/admin/AdminUser",
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
    handleSizeChange (size) {
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
    txtFuntion(value) {
      return value == 1 ? "正常" : "封禁";
    },
    banOpen(index, row, status) {
      console.log(index, row);
      let _this = this;
      //   _this
      _this
        .$prompt("输入封禁理由", "封禁用户", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputErrorMessage: "请输入封禁理由",
          inputPattern: /[^\s]/,
        })
        .then(async ({ value }) => {
          // 发送axios 请求 目的是 更新user 字段和 插入封禁用户ban 表
          let param = new URLSearchParams();
          param.append("ban", status);
          param.append("user_id", row.id);
          param.append("reason", value);
          param.append(
            "create_at",
            dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
          );
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
                message: "封禁用户成功",
              });
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            offset: 100,
            type: "info",
            message: "取消输入",
          });
        });
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
};
</script>

.<style lang="less">
.page-AdminBen {
  .status {
    width: 20px;
  }
}
</style>