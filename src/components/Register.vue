<template>
<div class="pannel version_heart Register ">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" placeholder="邮箱" type="mail"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type='password' v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input type='password' v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="性别" >
      <el-select v-model="form.region" placeholder="请选择性别" style="width: 100%;">
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
 <el-button type="primary" round @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</div>


</template>

<script>
	import {nanoid} from 'nanoid'
import dateFormat from "dateformat";
export default {
  name: "Register",
   data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          email:"",
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      getData1() {
		      var _this = this;
		      let yy = new Date().getFullYear();
		      let mm = new Date().getMonth()+1;
		      let dd = new Date().getDate();
		      let hh = new Date().getHours();
		      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
		      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
          return _this.gettime
		      // console.log(this.gettime)
      },
// ————————————————
// 版权声明：本文为CSDN博主「晨鼠」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/q_qq8/article/details/104348969
      onSubmit() {
        // const now = new Date();

        // dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
              // const newdate = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

        // console.log(newdate+"!@!@")
        // console.log(this.getData1())
        // console.log(this.form.date1+")))((((")
        // Date().getTime()
        // const data  =  this.$moment(Date.getTime()).format('yyyy-mm-dd HH:MM:ss')
    //  const data=   this.$moment(Date.now()).format('yyyy-mm-dd HH:MM:ss')
            // console.log(data+"***")   //    "2019-05-25 08:23:56"
            // console.log(Date.now()+"$$$")
            // console.log(dateFormat(this.form.date1+this.form.date2, "yyyy-mm-dd HH:MM:ss")+"@@@")
            // console.log((new Date).gettime)
      let _this = this;
      let param = new URLSearchParams()
      param.append("id", nanoid())
      param.append("account", this.form.name)
      param.append("email", this.form.email)
      param.append("password", this.form.password)
      const data_birthday = dateFormat(this.form.date1,"yyyy-mm-dd")+" "+dateFormat( this.form.date2,"HH:mm:ss")
      param.append("Birthday", data_birthday)
      console.log(data_birthday+"测试生日")
      param.append("sex", this.form.region)
               const now = new Date();
      param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:MM:ss"))
      // console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss"))
      
       _this.$axios.post('http://127.0.0.1:8008/api/register', param).then(res=>{
        //  console.log(res.data);
        //  console.log(  typeof res.data.status)
         if(res.data.status===1){
            alert(res.data.message)
         }
         else{
          // _this.userToken = res.data.token;
          // 将用户token保存到vuex中
          // _this.changeLogin({ Authorization: _this.userToken });
          // _this.$router.push('/');
          // this.$bus.$emit('getname',this.form.name)
          alert('注册成功');
         }
      },err=>{
        console.log(err);
      })
        // this.$axios.post(()=>{

        // })
        // console.log('submit!');
      }
    },
     mounted() {
        //  const now = new Date();
        // Basic usage
        // const date1 = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
        // console.log(date1+"测试数据")
        // console.log(dateFormat( this.form.date1,"yyyy-MM-dd")+" "+dateFormat( this.form.date2,"HH:mm:ss"))
        // 2022-07-25 21:01:05 console
        // 2022年1月25日21点08分
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