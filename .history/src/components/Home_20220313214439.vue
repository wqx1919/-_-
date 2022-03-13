<template>
<div class="version_heart">
    <div class="left min_box">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="推荐" name="first">
          <ul>
            <li>
                
              <router-link class="router-link style" :to="{
                name:'details',
                params:{
                    title:obj.title,
                    content:obj.content,
                    id:obj.id,
                    topic_category_id:obj.topic_category_id,
                    topic_user_id:obj.topic_user_id
                  }
                }" 

               v-for="(obj,index) in topic.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index"         
                >
                <!-- {{obj}}--- -->
                <!-- {{topic.slice((currentPage-1)*pagesize,currentPage*pagesize)}} -->
                <a class="pic">
                    <!-- <img src="https://api.vvhan.com/api/acgimg/" alt=""> -->
                  <!-- <img src="https://www.dmoe.cc/random.php" alt=""> -->
                 <img src="../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg" alt="">
                </a>
                <div class="content">
                <h5 class="title">{{obj.title}}</h5>
                <p>{{obj.content}}</p>
                </div>
              </router-link>

            </li>
            <!-- <li>
              <router-link class="router-link" to="/Comment">评论</router-link>
            </li> -->
          </ul>
                      <el-pagination
  background
  layout="prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
  :page-size="pagesize"
  :total="topic.length">
   </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="关注" name="second">
          <ul>
            <li >
                <H5>标题</H5>
              <router-link class="router-link" to="/Comment"
                >关注内容</router-link
              >
            </li>
            <li>
              <router-link class="router-link" to="/Comment">评论</router-link>
            </li>
          </ul>
                      <!-- <el-pagination
  background
  layout="prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
  :page-size="pagesize"
  :total="topic.length">
   </el-pagination> -->
          </el-tab-pane
        >
      </el-tabs>

   
        <router-link class="router-link add" to="/Comment">
        我也要说
        <svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-24_fayanduihualiuyan"></use>
</svg>
        <!-- <span class="iconfont icon-24_fayanduihualiuyan
"></span> -->
        </router-link> 

    </div>
    <div class="right">
      <div class="myself min_box">
        <h3>个人中心</h3>
        <div class="pic">
          <!-- <img src="https://joeschmoe.io/api/v1/random" alt="" /> -->
          <!-- <img src="../../public/img/random.svg" alt="" /> -->
          <img :src="hosts+userinfo.avtar" alt="" />
        </div>
        <div class="frequent_history">
          我的常去
          <div class="history">
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <!-- <p @click="test_update">神秘复苏</p> -->
          </div>
        </div>
      </div>
       <Label/>
       <Hot/>
    </div>
    
  </div>

  
</template>

<script>
import axios from "axios";
import '../font/iconfont.js';
import Label from './part/Label.vue';
import Hot from './part/Hot.vue'
import { mapMutations,mapState } from 'vuex';

export default {
  name: "Home",
components:{
  Label,Hot
},
   data() {
      return {
        activeName: 'first',
         currentPage:1, //初始页
         pagesize:10,    //    每页的数据
        topic:[],
        lengh:'',
        userinfo:'',
        hosts:''
      };
    },
    methods: {
    ...mapMutations(['changeLogin']),
     test_update(){
        this.changeLogin({userinfo:0})
     },
    getData() {
      axios.post('http://127.0.0.1:8008/api/SELECT_topic').then(
        (response) => {
          // console.log( typeof response.data)
         this.topic=response.data 
        //  console.log( this.topic[0])
        },
        (error) => {
          console.error(error.response.data);
        }
      );
    },
  // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
            // console.log(this)
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
            // console.log(this.topic.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))  //第几页数据
    },
  },
    mounted() {

      this.getData()
      if(typeof this.user =='string')
      this.userinfo = JSON.parse(this.user)
      else
      this.userinfo =this.user
      this.hosts=this.host
      console.log(localStorage.getItem('Authorization'))
  },
    //  watch:{
    //    immediate:true, //初始化时让handler调用一下
		// 			deep:true,//深度监视
    //     test2(newVal, oldVal) {
    //     //    console.log(newVal);
    //     //      console.log(oldVal);
    //     // console.log("000")
    //     // alert(11)
    //     if(newVal===''){
    //       this.userinfo =''
    //     }else{
    //      this.userinfo = this.user      
    //     }
    //  }
    //  },
   		beforeDestroy() {
			this.$bus.$off('getname')
		},
    computed:{
      // ...mapState(['host','user']),
      ...mapState({
        host:"host",
        user:"user",
        test2:function(state){
        return state.user
      }}),
      
      pagination(){
        // console.log(Math.ceil(this.topic.length/8)+1)
        return Math.ceil(this.topic.length/8)+1
      }
    }
};
</script>

<style scoped>
/* @import '../font/iconfont.css'; */

.left {
  flex: 1;
  position: relative;
}
.right {
  width: 300px;
}
.myself .pic {
  width: 100px;
  margin: 0 auto;
}
.myself .history {
  display: flex;
}
.myself img {
  width: 100px;
}
.left ul li {
  /* border-bottom: 1px solid #e5e5e5; */
  padding: 20px;
}
.el-tabs__header{
 margin: 0 !important;
}
img{
    width: 100%;
    /* display: block; */
}
.el-tab-pane ul li{
    /* display: flex; */
}
.el-tab-pane ul li .pic {
        display:flex;
height: 50px;
width: 50px;
margin-right: 15px;
}
.style{
    display: flex;
      border-bottom: 1px solid #e5e5e5;

    width: 100%;

}
/* .content{
    display: flex;
} */
::v-deep .el-tabs__header {
    margin: 0 ;
}
.el-pagination{
  /* margin: 0 auto;  */
  margin-bottom: 50px;
}
.add{
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 33px;
  transform: (-50% -50%);
  /* top: 400px; */
}
</style>