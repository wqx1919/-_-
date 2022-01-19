<template>
  <div class="header" v-show="isshow">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">
        <router-link class="router-link" to="/">主页</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title" >书评</template>
        <el-menu-item index="2-1" @click="setclass">
          <!-- 话题 -->
          <router-link
            class="router-link stylecolor"
            style="color: inherit"
            to="/topic"
            >话题</router-link
          >
          <!-- ref="selectedDate"   :class="isactive" -->
        </el-menu-item>
        <el-menu-item index="2-2">个人中心</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title">换肤</template>
          <el-menu-item index="2-3-1" v-on:click="onchang('night')"
            >黑夜</el-menu-item
          >
          <el-menu-item index="2-3-2" v-on:click="onchang('default')"
            >默认</el-menu-item
          >
          <el-menu-item index="2-3-3" v-on:click="onchang('custom')"
            >自定义</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">公告</template>
          <el-menu-item index="2-4-1">规则</el-menu-item>
          <el-menu-item index="2-4-2">声明</el-menu-item>
          <el-menu-item index="2-4-3">评论</el-menu-item>
        </el-submenu>
       </el-submenu>
      <el-menu-item class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search">
          <!-- v-model="input2" -->
        </el-input>
      </el-menu-item>
      <!-- <div class="self"> -->
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <router-link class="router-link" to="/Register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link class="router-link" to="/login">登录</router-link>
      </el-menu-item>
      <!-- </div> -->
    </el-menu>

  </div>
</template>

<script >
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
       activeIndex: "2",
      // theme_backgroun_colorcc: "red",
      // isactive: "a",
      isshow: false,
      // theme_parameter: [
      //   {
      //     theme_backgroun_colorc:"--theme_backgroun_colorc",
      //     val: "#fff",
      //   },
      //   {
      //     theme:"--theme",
      //       val: "#e8ebf0"
      //     },
      //   {
      //   defaultcolor:"--defaultcolor",
      //   val:"#333"
      //   },
      //   {
      //     el_menu_horizontal_active:"--el-menu--horizontal-active",
      //   val:"#303133"
      //   },
      //   {
      //     el_menu_horizontal:
      //   "--el-menu--horizontal",val:"#909399"
      //   },
      //   {
      //     el_menu_item_hover:
      //   "--el-menu-item-hover",
      //   val: "#ecf5ff"
      //   },
      //   {
      //     White_to_grey:
      //   "--White-to-grey",
      //    val:"#fff"
      //   },
      // ],
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    onchang(val) {
      // console.log(11111);
      class  themesyle {
        constructor(style, val) {
          this.style=style;
          this.val=val;
        }
      }


//             const default_theme= [
//         {
//           theme_backgroun_colorc:"--theme_backgroun_colorc",
//           val: "#fff",
//         },
//         {
//           theme:"--theme",
//             val: "#e8ebf0"
//           },
//         {
//         defaultcolor:"--defaultcolor",
//         val:"#333"
//         },
//         {
//           el_menu_horizontal:
//         "--el-menu--horizontal",val:"#909399"
//         },
//         {
//           el_menu_item_hover:
//         "--el-menu-item-hover",
//         val: "#ecf5ff"
//         },
//         {
//           White_to_grey:
//         "--White-to-grey",
//          val:"#fff"
//         },
//       ];
//       const height_theme= [
//         {
//           theme_backgroun_colorc:"--theme_backgroun_colorc",
//           val: "#fff",
//         },
//         {
//           theme:"--theme",
//             val: "#e8ebf0"
//           },
//         {
//         defaultcolor:"--defaultcolor",
//         val:"#333"
//         },
//         {
//           el_menu_horizontal:
//         "--el-menu--horizontal",val:"#909399"
//         },
//         {
//           el_menu_item_hover:
//         "--el-menu-item-hover",
//         val: "#ecf5ff"
//         },
//         {
//           White_to_grey:
//         "--White-to-grey",
//          val:"#fff"
//         },
//       ];
//       theme.forEach(function(value,index,array){

//       array[index]; //结果为true


//       sum+=value; 

//  });
//       for (const key in object) {
//         if (Object.hasOwnProperty.call(object, key)) {
//           const element = object[key];
          
//         }
//       }

        //  const  el_menu_horizontal = array.push(new themesyle("--el-menu--horizontal","#fff") 
      if (val == "night") {
            const array=[];
     array.push(new themesyle("--defaultcolor","#fff")) 
     array.push(new themesyle("--theme","#333") )
     array.push(new themesyle("--White-to-grey","#333") )
     array.push(new themesyle("--theme_backgroun_colorcc","black")) 
     array.push(new themesyle("--el-menu--horizontal","#fff")) 
     array.push(new themesyle("--el-menu--horizontal-active","#fff"))
          array.forEach(function(value,index,array){
          document.documentElement.style.setProperty(array[index].style, array[index].val);
          });
          //  console.log(array)

        // document.documentElement.style.setProperty("--theme", "#333");
        // document.documentElement.style.setProperty("--White-to-grey", "#333");
        // document.documentElement.style.setProperty(
        //   "--theme_backgroun_colorcc",
        //   "black"
        // );
        // document.documentElement.style.setProperty("--defaultcolor", "#fff");
        // //  头部样式
        // document.documentElement.style.setProperty(
        //   "--el-menu--horizontal-active",
        //   "#fff"
        // );
        // document.documentElement.style.setProperty(
        //   "--el-menu--horizontal",
        //   "#fff"
        // );
        // document.documentElement.style.setProperty(
        //   "--el-menu-item-hover",
        //   "orange"
        // );
        // const a ="--theme_backgroun_colorcc"
        // document.querySelector(".el-menu--horizontal>.el-menu-item:nth-child(3):not(.is-disabled):hover").setAttribute("style", "--White-to-grey:#000");
          // console.log(this.theme_parameter[0].theme_backgroun_colorc)
          // var array=[el_menu_horizontal]
          // console.log(array)
          // console.log(JSON.stringify(el_menu_horizontal))
                    // console.log(el_menu_horizontal.style)
        // document.querySelector('.el-menu--horizontal>.el-submenu .el-submenu__title:hover').setAttribute('style', 'background-color:#333');
      }
      if (val == "default") {
            const array=[];
     array.push(new themesyle("--defaultcolor","#333")) 
     array.push(new themesyle("--theme","#e8ebf0") )
     array.push(new themesyle("--White-to-grey","#fff") )
     array.push(new themesyle("--theme_backgroun_colorcc","#fff")) 
     array.push(new themesyle("--el-menu--horizontal","#909399")) 
     array.push(new themesyle("--el-menu--horizontal-active","#303133"))
        array.forEach(function(value,index,array){
        document.documentElement.style.setProperty(array[index].style, array[index].val);
      })};
      //  document.documentElement.style.setProperty("--theme","yellow");
      //  document.documentElement.style.setProperty("--theme_backgroun_colorcc","red");
    },
    setclass() {
      this.isactive = "is-active";
    },
    //  out_l(){
    //       setTimeout(()=>{
    //            this.isshow=true
    //               console.log(this.isshow+"2s")
    //       },5000)
    //       console.log(this.isshow)
    //   }
  },
  // mounted(){
  //   this.out_l();
  // }
  // beforeCreate () {
  //       // document.querySelector('body').setAttribute('style', '--theme:rgb(250,0,0)')
  //       // document.querySelector('#app').setAttribute('style', '--theme:rgb(0,25,20)')
  //       /*选中文档节点，好像全局变量是在html文档上的，所以可以这样动态修改*/

  //   },
  //       beforeDestroy () {

  //   document.querySelector('body').removeAttribute('style')

  // }
};
</script>

<style scoped >
.header {
  top: 0;

  width: 100%;
  /* !important */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 99999;
  height: 60px;
  background-color: var(--theme_backgroun_colorcc);
  /* color: var(--theme); */
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: var(--el-menu--horizontal-active);
}
/* .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid #409eff;
  color: var(--el-menu--horizontal-active);
} */
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  /* color: var(--el-menu--horizontal); */
}
.el-menu {
  display: flex;
  justify-content: space-around;
  background-color: var(--theme_backgroun_colorcc);
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: var(--el-menu-item-hover);
  color: var(--defaultcolor);
}
/* .el-submenu__title:hover {
    background-color:var(--el-menu-item-hover);
        color: var(--defaultcolor);

} */

/* .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: var(--theme);
} */

/* .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color:var(--el-menu-item-hover) ;
} */

.search {
  flex: 1;
  max-width: 21%;
  min-width: 35%;
}
.self {
  display: flex;
}
/* .el-menu .el-menu-item:not(:nth-child(-n+2)){
    flex: 1;
}*/
.el-menu .el-menu-item:not(:nth-child(n + 3)) {
  justify-content: right;
}

.el-menu-item {
  /* padding: 0; */
  padding-left: 20px;
  padding-right: 20px;
  /* background-color: tomato; */
  /* width: 68px;
  height: 60px; */
}
/* .router-link-exact-active{
  display: block;
  background-color: palegoldenrod;
   padding: 0;
  width: 68px;
  height: 60px;
  width: 100%;
  height:100% ;
  } */
.router-link {
  display: block;
  /* background-color: palegoldenrod; */
  width: 100%;
  height: 100%;
}
/* .stylecolor{
    color: #909399;
  }
   .stylecolor:hover{
    color: #303133;
  } */

/* .el-menu .el-menu-item{
        z-index: 99999 !important;

  } */
/* .Comment .el-menu--horizontal .el-menu--popup .el-menu-item{

  } */
/* .el-submenu .el-menu-item{
    z-index: 99999 !important;
  } */
</style>