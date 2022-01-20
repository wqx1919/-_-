<template>
  <div class="header " v-show="isshow">
    
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">
        <router-link class="router-link" to="/">主页</router-link>
      </el-menu-item>
      <el-submenu index="2" >
        <template slot="title" >书评</template>
        <el-menu-item index="2-1" @click="setclass">
          <!-- 话题 -->
          <router-link
            class="router-link stylecolor"
            style="color: inherit"
            to="/topic"
            >话题</router-link
          >
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
            >
            自定义
            </el-menu-item
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
        </el-input>
      </el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <router-link class="router-link" to="/Register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link class="router-link" to="/login">登录</router-link>
      </el-menu-item>
    </el-menu>
    <debugcolor v-show="isdebug_color"/>

  </div>
</template>

<script >
import debugcolor from '../components/part/Debug_color.vue'
export default {
  name: "Header",
    components: {
  debugcolor
  },
  data() {
    return {
       color: '#ff0000',
      activeIndex: "1",
       activeIndex: "2",
      isshow: false,
      isdebug_color:false
    };
  },
  methods: {

    headleChangeColor(){
    console.log(this.color)
    },
    onchang(val) {
      class  themesyle {
        constructor(style, val) {
          this.style=style;
          this.val=val;
        }
      }
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
      if(val=="custom"){
         this.isdebug_color=!this.isdebug_color
      }
  
    },
    setclass() {
      this.isactive = "is-active";
    },
  
  },
  
};
</script>

<style scoped >
.header {
  top: 0;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position:sticky;

  z-index: 99999;
  height: 60px;

}
        .wrap {
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: var(--el-menu--horizontal-active);
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
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
.search {
  flex: 1;
  max-width: 21%;
  min-width: 35%;
}
.self {
  display: flex;
}

.el-menu .el-menu-item:not(:nth-child(n + 3)) {
  justify-content: right;
}

.el-menu-item {
  padding-left: 20px;
  padding-right: 20px;
}
.router-link {
  display: block;
  width: 100%;
  height: 100%;
}
</style>