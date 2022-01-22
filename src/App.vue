<template>
  <div id="app" >
    <Backtop />
      <!-- <el-backtop ></el-backtop> -->
    <!-- <Backtop/> -->
<!-- style="overflow-y: auto" -->
    <!-- style="height:520px;overflow: auto;" -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <!-- <login /> -->
<!-- <router-link active-class="active" to="/login">login</router-link>  -->
<Header v-show="!isshow" />
<Animation v-show="isshow"  />
<!-- <Backtop idname="#app"/> -->
<Couplet />
<!-- <el-backtop target="#app" :visibility-height="10" :right="40" :bottom="40"></el-backtop> -->
     
<router-view v-show="!isshow" ></router-view>
<!-- <Home/> -->
<!-- <router-view ></router-view> -->
<!-- <Home/> -->
   <!-- <el-backtop target="#app" :visibility-height=1></el-backtop> -->

 </div>
</template>

<script>
import Header from './components/Header.vue'
import Backtop from './components/part/Backtop.vue'
import Animation from './components/Animation'
import Couplet from './components/part/Couplet.vue'
export default {
  name: 'App',
  data(){
    return{
      id:"#app",
      isshow:true,
    }
  },
  components: {
Header,Backtop,Animation,Couplet
  },
  methods:{
      out_l(){
          setTimeout(()=>{
               this.isshow=false
                         console.log(this.isshow+"2s")

          },5900)
          console.log(this.isshow)
      },

  },
    mounted() {
      this.$bus.$on('getshou',(data)=>{
        this.isshow = data
      })
      this.out_l();
  },
   		beforeDestroy() {
			this.$bus.$off('getshou')
		},
}
</script>

<style >
@import './font/iconfont.css';
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
html,body,#app{
  /* @@@ 设置充满 */
    /* background-color: #e8ebf0; */
    height: 100%;
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
