<template>
  <div class="version_heart pannel Debug">
    <el-form ref="form" :model="form" label-width="130px" style="width: 100%">
      <el-form-item label="背景颜色">
        <colorPicker v-model="form[0].val"></colorPicker>
        <!-- <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker></olorPicker> -->
      </el-form-item>
      <el-form-item label="主背景颜色">
        <colorPicker v-model="form[1].val"></colorPicker>
      </el-form-item>
      <el-form-item label="字体颜色">
        <colorPicker v-model="form[2].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航选中">
        <colorPicker v-model="form[3].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航颜色">
        <colorPicker v-model="form[4].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航鼠标悬浮颜色">
        <colorPicker v-model="form[5].val"></colorPicker>
      </el-form-item>
      <!-- <div class="box">
<div class="left">
                <el-form-item label="背景颜色">
              </el-form-item>

        <el-form-item label="主背景颜色">
         </el-form-item>
      <el-form-item label="字体颜色">
      </el-form-item>
      <el-form-item label="导航选中">
      </el-form-item>
      <el-form-item label="导航颜色">
      </el-form-item>
      <el-form-item label="导航鼠标悬浮颜色">
      </el-form-item> -->
      <!-- <el-form-item> -->
      <!-- </div> -->
       <!-- <div class="right">
        <colorPicker v-model="form[0].val"></colorPicker>
        <colorPicker v-model="form[1].val"></colorPicker>
        <colorPicker v-model="form[2].val"></colorPicker>
        <colorPicker v-model="form[3].val"></colorPicker>
        <colorPicker v-model="form[4].val"></colorPicker>
        <colorPicker v-model="form[5].val"></colorPicker>
       </div>
      </div> -->
        <div class="bottom">
        <el-button type="primary" size="mini" @click="onSubmit">立即创建</el-button>
        <el-button size="mini">取消</el-button>
        </div>

      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Debug_color",
  data() {
    return {
      form: [
        { style: "--theme_backgroun_colorc", val: "#fff" },

        {
          style: "--theme",
          val: "#e8ebf0",
        },

        { style: "--defaultcolor", val: "#333" },

        { style: "--el-menu--horizontal", val: "#909399" },

        {
          style: "--el-menu-item-hover",
          val: "#ecf5ff",
        },

        {
          style: "--White-to-grey",
          val: "#fff",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.Debug {
  width: 16%;
  text-align: center;
}
.box{
      display: flex;
  justify-content: space-evenly;
  align-items: center;
  
}
.right{
    height: 372px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
/* .el-form .el-form-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
} */
.bottom{
    margin-top: -10px;
    margin-bottom: 5px;
}
.el-form-item__label {
  width: 100px;
}
.m-colorPicker {
  border: 1px solid #000;
  /* height: 60px; */
}
</style>