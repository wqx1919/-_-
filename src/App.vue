<template>
  <div id="app" :style="isheight">
    <!-- 头部是否显示 -->
    <customHeader v-show="!Admin  && !Login && !isshow" />
    <!-- 开屏动画是否显示 -->
    <Animation v-show="isshow" />
    <!-- 回到顶部 -->
    <Backtop idname="#app" v-if="!isshow" />
    <!-- 诗句 -->
    <Couplet />
    <router-view v-show="!isshow"></router-view>
  </div>
</template>

<script>
import customHeader from "./components/Header.vue";
import Backtop from "./components/part/Backtop.vue";
import Animation from "./components/Animation";
import Couplet from "./components/part/Couplet.vue";
export default {
  name: "App",
  data() {
    return {
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
    customHeader,
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
        // console.log(newVal.path)
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
    this.$bus.$on("getshow", (data) => {
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
    this.$bus.$off("getshow");
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
