<template>
  <div class="version_heart pannel Debug" v-show="isShow">
    <el-form ref="form" label-width="130px" style="width: 100%">
      <!-- 噢上帝啊，你会freestyle吗？ -->
      <h5>请开始你的表演</h5>
      <el-form-item label="主题颜色">
        <colorPicker v-model="form[0].val"></colorPicker>
        <!-- <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker></olorPicker> -->
      </el-form-item>
      <el-form-item label="主背景颜色">
        <colorPicker v-model="form[1].val"></colorPicker>
      </el-form-item>
      <el-form-item label="字体颜色">
        <colorPicker v-model="form[2].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航颜色">
        <colorPicker v-model="form[3].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航鼠标悬浮颜色">
        <colorPicker v-model="form[4].val"></colorPicker>
      </el-form-item>
      <el-form-item label="导航选中">
        <colorPicker v-model="form[5].val"></colorPicker>
      </el-form-item>
      <!-- <div > -->
      <el-button type="primary" size="mini" @click="onSubmit"
        >立即创建</el-button
      >
      <el-button size="mini" @click="isShow = !isShow">取消</el-button>
      <!-- </div> -->
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Debug_color",
  data() {
    return {
      isShow: true,
      form: [
        { style: "--theme_backgroun_colorcc", val: "#fff" },
        { style: "--theme", val: "#e8ebf0" },
        { style: "--defaultcolor", val: "#333" },
        { style: "--el-menu--horizontal", val: "#909399" },
        { style: "--el-menu-item-hover", val: "#ecf5ff" },
        { style: "--White-to-grey", val: "#fff" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.form.forEach(function (value, index, array) {
        document.documentElement.style.setProperty(
          array[index].style,
          array[index].val
        );
        console.log(array[index].style, array[index].val);
      });
    },
  },
};
</script>
<style scoped>
.Debug {
  /* width: 16%; */
  width: 300px;
  text-align: center;
}
.bottom {
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