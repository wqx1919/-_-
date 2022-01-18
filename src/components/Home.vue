<template>
<div class="version_heart">
    <div class="left min_box">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="推荐" name="first">
          <ul>
            <li>
                
              <router-link class="router-link style" to="/details"
                >
                <div class="pic">
                    <!-- <img src="https://api.vvhan.com/api/acgimg/" alt=""> -->
                  <!-- <img src="https://www.dmoe.cc/random.php" alt=""> -->
                 <img src="../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg" alt="">
                </div>
                <div class="content">
                <h5 class="title">评论标题</h5>
                <p>简略描述</p>
                </div>

                </router-link
              >
            </li>
            <li>
              <router-link class="router-link" to="/Comment">评论</router-link>
            </li>
          </ul>
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
          </ul></el-tab-pane
        >
      </el-tabs>
            <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
   </el-pagination>
   
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
          <img src="../../public/img/random.svg" alt="" />
        </div>
        <div class="frequent_history">
          我的常去
          <div class="history">
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
            <p>神秘复苏</p>
          </div>
        </div>
      </div>
       <Label/>
       <Hot/>
    </div>
    
  </div>

  
</template>

<script>
import '../font/iconfont.js';
import Label from './part/Label.vue';
import Hot from './part/Hot.vue'
export default {
  name: "Home",
components:{
  Label,Hot
},
   data() {
      return {
        activeName: 'first',
      };
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
  border-bottom: 1px solid #e5e5e5;
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
    display: flex;
}
.el-tab-pane ul li .pic {
        display:flex;
height: 50px;
width: 50px;
margin-right: 15px;
}
.style{
    display: flex;
    width: 100%;
}
/* .content{
    display: flex;
} */
::v-deep .el-tabs__header {
    margin: 0 ;
}
/* .el-pagination{
  margin: 0 auto; 
} */
.add{
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 33px;
  transform: (-50% -50%);
  /* top: 400px; */
}
</style>