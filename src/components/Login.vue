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
    <el-button type="primary" @click="getData">登录</el-button>
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
import { mapMutations } from 'vuex';
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
    ...mapMutations(['changeLogin']),
   async getData() {
     try{
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
      let param = new URLSearchParams()
      param.append("account", this.form.name)
      param.append("password", this.form.password)
      const res=  await  _this.$axios.post('http://127.0.0.1:8008/api/login', param)
        //  console.log(res.data);
        //  console.log(  typeof res.data.status)
         if(res.data.status===1){
            alert(res.data.message)
         }
         else{
          
            _this.userToken = res.data.token;
            let obj ={ Authorization: _this.userToken}
            _this.changeLogin(obj);
              const userinfo =  await  _this.$axios.get("http://127.0.0.1:8008/my/userinfo")
              // console.log(_this.userToken)
            try{
              if(userinfo.data.status===1){
              alert(userinfo.data.message)
              }
              else{
              // console.log(userinfo.data)
              // console.log(999)
                // this.$bus.$emit('getname',userinfo.data.data)
              _this.userinfo = userinfo.data.data ;
              // console.log({ ...obj,userinfo: _this.userinfo})
              let userobj = {userinfo: _this.userinfo}
              _this.changeLogin({...obj,...userobj});
            // 将用户token保存到vuex中
                _this.$router.push('/');
                alert('登陆成功');
              }
           }catch(err){
             console.log(err)
          }
         
         }
      }catch(err){
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
  },
  mounted() {
    
  }
  
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