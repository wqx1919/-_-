<template>
<div class="pannel version_heart Register ">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.name" placeholder="邮箱或者用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type='password' v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input type='password' v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="性别" >
      <el-select v-model="form.region" placeholder="请选择性别" style="width: 100%;">
        <el-option label="男" value="nan"></el-option>
        <el-option label="女" value="nv"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="生日">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>
        <el-form-item label="注册">
 <el-button type="primary" round>提交</el-button>
    </el-form-item>
  </el-form>
</div>


</template>

<script>
export default {
  name: "Register",
   data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  
};
</script>

<style scoped>
/* .el-form-item__content{
 display: flex;
  width: 100%;
  justify-content: space-between;
} */
.Register{
  width: 500px;
}
</style>