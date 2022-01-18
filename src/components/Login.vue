<template>
   <div class="pannel login version_heart ">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.name" placeholder="邮箱或者用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type='password' v-model="form.password"></el-input>
    </el-form-item>

      <el-form-item>
        <div class="center">
    <el-button type="primary" @click="onSubmit">注册</el-button>
    <router-link to="/register">还没账号？点我注册</router-link>
        </div>
    <!-- <router-link to="/register">还没账号？快去注册</router-link> -->
    <!-- <el-button><a href="">还没账号？快去注册</a></el-button> -->
      </el-form-item>
        <router-view></router-view>
  </el-form>
   </div>

</template>
<script>
export default {
  name:'Login',
  data() {
    return {
      form: {
        name: "",
        password:'',
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    },
  },
};
</script>

<style scoped>
/* .el-form-item:last-child{
  background-color: palegoldenrod;
  display: flex;
  width: 100%;
  justify-content: space-between;
} */
/* .el-form-item__content{
 display: flex;
  width: 100%;
  justify-content: space-between;
} */
.center{
 display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.login{
  /* width: 500px; */
  width: 350px;
}
</style>