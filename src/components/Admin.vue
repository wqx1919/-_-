<template>
  <div class="page-admin">
    <el-header>新奇书评网站管理</el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/">
            <span slot="title">去前台</span>
          </el-menu-item>
          <el-menu-item index="/Admin/AdminBen">
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/Admin/AdmineMessage">
            <span slot="title">申诉消息</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <el-main>
        <div class="initialize" v-if="$route.path == '/Admin'">
          <h1>欢迎你，亲爱的管理员</h1>
        </div>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      initialize: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less">
.page-admin {
  height: 100%;
  height: ~"calc(100% - 60px)";
  .el-header{
    line-height: 60px;
    font-weight: 600;
    background-image: linear-gradient(#70afca, #a5def1,#d5f0f9, #ffffff);
  }
  .el-container {
    height: 100%;
    // height: ~"calc(100% - 30px)";
    // height: calc(100% - 60px);
    .aside {
      background-color: var(--theme_backgroun_colorcc);
    }
    .el-main {
      background: url("../../public/img/CachedImage_1920_1080_POS4.jpg")
        no-repeat;
      background-size: cover;
      position: relative;
      .initialize {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // background: url("../../public/img/infinity-107158.jpg") cover
      }
    }
  }
  //  width: 300px;
}
</style>