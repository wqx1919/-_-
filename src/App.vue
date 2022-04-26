<template>
  <div id="app" :style="isheight">
    <!-- <Backtop v-if="!isshow"/> -->
    <!-- 111111111 -->
    <!-- <el-backtop ></el-backtop> -->
    <!-- <Backtop/> -->
    <!-- style="overflow-y: auto" -->
    <!-- style="height:520px;overflow: auto;" -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <login /> -->
    <!-- <router-link active-class="active" to="/login">login</router-link>  -->
    <Header v-show="!Admin  && !Login && !isshow" />
    <Animation v-show="isshow" />
    <Backtop idname="#app" v-if="!isshow" />
    <Couplet />
    <!-- <el-backtop target="#app" :visibility-height="10" :right="40" :bottom="40"></el-backtop> -->

    <router-view v-show="!isshow"></router-view>
    <!-- <Home/> -->
    <!-- <router-view ></router-view> -->
    <!-- <Home/> -->
    <!-- <el-backtop target="#app" :visibility-height=1></el-backtop> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Backtop from "./components/part/Backtop.vue";
import Animation from "./components/Animation";
import Couplet from "./components/part/Couplet.vue";
export default {
  name: "App",
  data() {
    return {
      id: "#app",
      isshow: true,
      isheight: {
        height: "",
      },
      Login: false,
      path: "",
      Admin:false
    };
  },
  components: {
    Header,
    Backtop,
    Animation,
    Couplet,
  },
  methods: {
    out_l() {
      if (this.isshow == true)
        setTimeout(() => {
          this.isshow = false;
          // this.isheight = "height:auto;";
          //  console.log(this.isshow+"2s")
        }, 5900);
      // console.log(this.isshow)
    },
    // FountionLogin() {
    //   if (this.$route.path == "/login") {
    //     this.Login = true;
    //   } else {
    //     this.Login = false;
    //   }
    // },
  },
  watch: {
    $route:{
      deep:true,//深度监视
      handler(newVal,oldVal){
        console.log(newVal.path)
        if (newVal.path == "/login") {
          this.Login = true;
        } else {
          this.Login = false;
        }
        let theRegularRules =/\/Admin.*/
        this.Admin = theRegularRules.test(newVal.path);
      }

    },
  },
  mounted() {
    let _this = this;
    this.path = this.$route.path;
    this.$bus.$on("getshou", (data) => {
      this.isshow = data;
    });
    if (localStorage.getItem("Animation") != "true") {
      //其他页面刷新没有开屏动画
      // @@@ 字符串的形式存储在localStorage
      // alert(localStorage.getItem('Animation'))
      // alert("111")
      this.isshow = false;
    } else {
      this.isshow = true;
    }
    this.out_l();
    //刷新页面时候判单是否是admin路径
    let theRegularRules =/\/Admin.*/
    this.Admin = theRegularRules.test(this.$route.path);
  },
  beforeDestroy() {
    this.$bus.$off("getshou");
  },
};
</script>

<style >
@import "./font/iconfont.css";
/* :root{
--theme:#e8ebf0
} */
/* html,body,#app {height: 100%;} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* color: var( --theme); */
  /* height: 100vh;   */
  /* // 不必是100vh，只需要是该容器显示的最大高度即可 */
  /* overflow-x: hidden; */
  /* overflow-x: auto;overflow-y: auto; */
  /* height: 100%; */
  /* background-color: var(--theme); */
  position: relative;
  /* margin-top: 60px; */
}
html,
body,
#app {
  /* @@@ 设置充满 */
  /* background-color: #e8ebf0; */
  height: 100%;
  /* @@@设置自动 */
  /* height: auto; */
  background-color: var(--theme);
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
