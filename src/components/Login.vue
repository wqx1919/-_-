<template>
  <div class="box">
    <h5 class="title">欢迎来到新奇书评网站</h5>
    <div class="pannel login version_heart" v-if="!adminShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name" placeholder="邮箱或者用户名" @focus="resetButton"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" @focus="resetButton"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="center" v-if="!reasonFrom.show">
            <el-button type="primary" @click="getData">登录</el-button>
            <router-link to="/register">还没账号？点我注册</router-link>
          </div>
          <!-- <router-link to="/register">还没账号？快去注册</router-link> -->
          <!-- <el-button><a href="">还没账号？快去注册</a></el-button> -->
        </el-form-item>
        <!-- <router-view></router-view> -->
      </el-form>
      <el-button
        v-if="reasonFrom.show"
        type="primary"
        @click="FuntionUnblockShow"
        >账号被封，点击申诉</el-button
      >
      <el-form v-if="unblockShow">
        <el-form-item label="封禁原因">
          {{ reasonFrom.message.reason }}
        </el-form-item>
        <el-form-item label="申诉">
          <el-input v-model="reasonFrom.unblock"></el-input>
        </el-form-item>
        <el-form-item class="reasonFromBotton">
          <el-button @click="cleanUnblock">清空</el-button>
          <el-button type="primary" @click="sumbitUnblock">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="change" v-if="adminShow">
      <el-button type="primary" @click="toHome"> 前台 </el-button>
      <el-button type="primary" @click="toAdmin"> 管理员 </el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      reasonFrom: {
        message: "",
        show: false,
        unblock: "",
      },
      unblockShow: false,
      adminShow:false
    };
  },
  methods: {
    toAdmin(){
      this.$router.push("/Admin");
    },
    toHome(){
      this.$router.push("/");
    },
    ...mapMutations(["changeLogin", "updateUser"]),
    async getData() {
      try {
        let _this = this;
        // axios.post('http://127.0.0.1:8008/api/login').then(
        //   (response) => {
        //     // console.log( typeof response.data)
        //    this.topic=response.data
        //   //  console.log( this.topic[0])
        //   },
        //   (error) => {
        //     console.error(error.response.data);
        //   }
        // );
        //   axios({
        //   method:"post",
        //   url:"http://127.0.0.1:8008/api/login",

        //   params:{
        //       account:this.form.name,
        //       password:this.form.password
        //   }
        // }).then((res)=>{
        //   console.log(res.data);
        // })
        //form-data请求
        // let data = {
        //   //请求参数
        //       account:this.form.name,
        //       password:this.form.password
        // }

        // let formdata = new FormData();
        // for(let key in data){
        //   formdata.append(key,data[key]);
        // }

        // this.$axios.post('http://127.0.0.1:8008/api/login',formdata).then(res=>{
        //    console.log(res.data);
        // },err=>{
        //   console.log(err);
        // })

        let param = new URLSearchParams();
        param.append("account", this.form.name);
        param.append("password", this.form.password);
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/api/login",
          param
        );
        //  console.log(res.data);
        //  console.log(  typeof res.data.status)
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
          _this.reasonFrom.message = res.data.data;
          _this.reasonFrom.show = true;
        } else {
          _this.userToken = res.data.token;
          let obj = { Authorization: _this.userToken };
          _this.changeLogin(obj);
          const userinfo = await _this.$axios.get(
            "http://127.0.0.1:8008/my/userinfo"
          );
          // console.log(_this.userToken)
          try {
            if (userinfo.data.status === 1) {
              _this.$message({
                showClose: true,
                message: userinfo.data.message,
                type: "error",
                offset: 100,
              });
            } else {
              // console.log(userinfo.data)
              // console.log(999)
              // this.$bus.$emit('getname',userinfo.data.data)
              _this.userinfo = userinfo.data.data;
              // console.log({ ...obj,userinfo: _this.userinfo})
              let userobj = { userinfo: _this.userinfo };
              _this.updateUser(_this.userinfo);
              // 将用户token保存到vuex中
              if (_this.form.name === "admin") {
                _this.adminShow = true
                return;
              }
              _this.$router.push("/");
              // alert("登陆成功");
              _this.$message({
                showClose: true,
                message: "登陆成功",
                type: "success",
                offset: 100,
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
      // ————————————————
      // 版权声明：本文为CSDN博主「1学习者1」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
      // 原文链接：https://blog.csdn.net/u011280778/article/details/100436930
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    },
    cleanUnblock() {
      this.reasonFrom.unblock = "";
    },
    FuntionUnblockShow() {
      this.unblockShow = !this.unblockShow;
    },
    async sumbitUnblock() {
      let _this = this;
      let param = new URLSearchParams();
      param.append("account", _this.form.name);
      param.append("unblock", _this.reasonFrom.unblock);
      try {
        const dateinfo = await _this.$axios.post(
          "http://127.0.0.1:8008/admin/AdminAddUnblock",
          param
        );
        if (dateinfo.data.status === 1) {
          this.$message({
            showClose: true,
            message: dateinfo.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          this.$message({
            showClose: true,
            message: dateinfo.data.message + "等待管理员审核",
            type: "success",
            offset: 100,
          });
          _this.reasonFrom.show = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //重置
    resetButton(){
      console.log(1)
      this.reasonFrom.show = false
    }
  },
  mounted() {},
};
</script>

<style lang="less">
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
.box {
  // width: 100%;
  // height: 100%;
  // background: url("../../public/img/CachedImage_1920_1080_POS4.jpg") no-repeat;
  background-size: cover;
  .title{
    text-align: center; 
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login {
    /* width: 500px; */
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    flex-direction: column;

    .center {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
    }
    .reasonFromBotton {
      display: flex;
      justify-content: center;
    }
  }
  .change{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>