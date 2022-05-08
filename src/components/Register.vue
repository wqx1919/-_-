<template>
  <div class="pannel version_heart Register">
    <el-form ref="form" :model="form" :rules="rule" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="邮箱"
          type="mail"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmpassword">
        <el-input type="password" v-model="form.confirmpassword"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="form.region"
          placeholder="请选择性别"
          style="width: 100%"
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
            value-format="yyyy-mm-dd"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            value-format="HH:MM:ss"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="注册">
        <el-button type="primary" round @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import dateFormat from "dateformat";
export default {
  name: "Register",
  data() {
    let checkPwd2 = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请确认密码不能为空"));
      } else if (value != this.form.password) {
        callback(new Error("2次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        email: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        confirmpassword: "",
        password: "",
      },
      rule: {
        name: [
          // { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /[^admin]/,
            message: "姓名不能输入admin",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        confirmpassword: [
          { validator: checkPwd2, trigger: "blur", required: true },
        ],
      },
    };
  },
  methods: {
    //格式化-时间（未使用）
    dateformatMy() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return _this.gettime;
      // console.log(this.gettime)
    },
    onSubmit() {
      let _this = this;
      let param = new URLSearchParams();
      param.append("id", nanoid());
      param.append("account", this.form.name);
      param.append("email", this.form.email);
      param.append("password", this.form.password);
      param.append("Birthday", this.form.date1 + " " + this.form.date2);

      // console.log(data_birthday + "测试生日");
      param.append("sex", this.form.region);
      const now = new Date();
      param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
      // console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss"))

      _this.$axios.post("http://127.0.0.1:8008/api/register", param).then(
        (res) => {
          if (res.data.status === 1) {
            _this.$message({
              showClose: true,
              message: res.data.message,
              type: "error",
              offset: 100,
            });
          } else {
            _this.$message({
              showClose: true,
              message: "注册成功",
              type: "success",
              offset: 100,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    //  const now = new Date();
    // Basic usage
    // const date1 = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    // console.log(date1+"测试数据")
    // console.log(dateFormat( this.form.date1,"yyyy-MM-dd")+" "+dateFormat( this.form.date2,"HH:MM:ss"))
    // 2022-07-25 21:01:05 console
    // 2022年1月25日21点08分
  },
};
</script>

<style scoped>
/* .el-form-item__content{
 display: flex;
  width: 100%;
  justify-content: space-between;
} */
.Register {
  width: 500px;
}
</style>