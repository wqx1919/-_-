<template>
  <!-- <div class="ml"> -->
  <!-- <p :id=idname>{{idname}}</p> -->
  <el-backtop  :bottom="100" :visibility-height="10">
    <div
      style="
         {
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }
      "
    >
      <i class="iconfont icon-huidaodingbu"></i>
    </div>
  </el-backtop>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Backtop",
  props: ["idname"],
  mounted() {
    console.log(this.idname);
    // console.log(11)
  },
};
</script>

<style>
/* target=".page-component__scroll .el-scrollbar__wrap"  */
</style>