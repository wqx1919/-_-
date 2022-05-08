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
        <template slot="title">更多</template>
        <el-menu-item index="2-1" @click="setclass">
          <!-- 话题 -->
          <div
            class="router-link stylecolor"
            style="color: inherit"
            @click="toAllcategory"
          >
            话题
          </div>
        </el-menu-item>
        <!-- <el-menu-item index="2-2">个人中心</el-menu-item> -->
        <el-menu-item index="2-2" @click="toCommnet">评论</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title">换肤</template>
          <el-menu-item index="2-3-1" v-on:click="onchang('night')"
            >黑夜</el-menu-item
          >
          <el-menu-item index="2-3-2" v-on:click="onchang('default')"
            >默认</el-menu-item
          >
          <el-menu-item index="2-3-3" v-on:click="onchang('custom')">
            自定义
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">公告</template>
          <el-menu-item index="2-4-1" @click="open">规则</el-menu-item>
          <el-menu-item index="2-4-2" @click="statement">声明</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item class="search" @keydown.enter.native="toTopicList">
        <el-input
          v-model="inputValue"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-menu-item>
      <!-- <div class="right" style="width:50px;height:60px"> -->
      <el-menu-item
        index=""
        v-show="ISuser"
        style="width: 20px; cursor: default"
        :disabled="true"
      ></el-menu-item>
      <!-- <el-menu-item index="3" v-show="ISuser">消息中心</el-menu-item> -->
      <el-menu-item index="3" v-show="ISuser"
        >&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item
      >

      <el-menu-item index="4" v-show="!ISuser">
        <router-link class="router-link" to="/register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="5" v-show="!ISuser">
        <router-link class="router-link" to="/login">登录</router-link>
      </el-menu-item>
      <el-menu-item index="6" v-show="ISuser">
        <!-- <router-link class="router-link" to="/login"> -->
        <!-- <div class="pic">
          <img src="" alt="">
        </div> -->
        <el-submenu index="7">
          <template slot="title">
            <a class="avatar">
              <img :src="hosts + userinfo.avtar" alt="头像" />
            </a>
          </template>
          <el-menu-item index="7-1" @click="toUser">{{
            userinfo.account
          }}</el-menu-item>
          <!-- <el-menu-item index="7-2">我的收藏</el-menu-item> -->
          <el-menu-item index="7-3" @click="toUpdate">个人资料</el-menu-item>
          <el-menu-item index="7-4" @click="checkout">登出</el-menu-item>
        </el-submenu>
        <!-- </router-link> -->
      </el-menu-item>
      <!-- </div> -->
    </el-menu>
    <debugcolor v-show="isdebug_color" />
  </div>
</template>

<script >
import debugcolor from "../components/part/Debug_color.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Header",
  components: {
    debugcolor,
  },
  data() {
    return {
      inputValue: "",
      color: "#ff0000",
      activeIndex: "1",
      // activeIndex: "2",
      isshow: false,
      isdebug_color: false,
      ISuser: this.$store.state.Authorization != "",
      test2: "",
      test: "",
      // isau = this.$store.state.Authorization,
      userinfo: "",
      hosts: "",
      // 传值不安全，舍去
      // searchResult:[]
      // user:JSON.parse(this.user())
    };
  },
  methods: {
    toTopicList() {
      this.$router.push({
        path: "/TopicList",
        query: {
          // searchResult:this.searchResult
          searchKeyword: this.inputValue,
        },
      });
      this.inputValue = "";
    },
    ...mapMutations(["changeLogin"]),
    headleChangeColor() {
      console.log(this.color);
    },
    onchang(val) {
      //定义了一个类
      class themesyle {
        //构造函数
        constructor(style, val) {
          this.style = style;
          this.val = val;
        }
      }
      if (val == "night") {
        //置空数组
        const array = [];
        array.push(new themesyle("--defaultcolor", "#fff"));
        array.push(new themesyle("--theme", "#333"));
        array.push(new themesyle("--White-to-grey", "#333"));
        array.push(new themesyle("--theme_backgroun_colorcc", "black"));
        array.push(new themesyle("--el-menu--horizontal", "#fff"));
        array.push(new themesyle("--el-menu-item-hover", "#ecf5ff"));
        array.forEach(function (value, index, array) {
          document.documentElement.style.setProperty(
            array[index].style,
            array[index].val
          );
        });
      }
      if (val == "default") {
        const array = [];
        array.push(new themesyle("--defaultcolor", "#333"));
        array.push(new themesyle("--theme", "#e8ebf0"));
        array.push(new themesyle("--White-to-grey", "#fff"));
        array.push(new themesyle("--theme_backgroun_colorcc", "#fff"));
        array.push(new themesyle("--el-menu--horizontal", "#909399"));
        array.push(new themesyle("--el-menu-item-hover", "#ecf5ff"));
        array.forEach(function (value, index, array) {
          document.documentElement.style.setProperty(
            array[index].style,
            array[index].val
          );
        });
      }
      //如果是自定义的华，开关
      if (val == "custom") {
        this.isdebug_color = !this.isdebug_color;
      }
    },
    //给绑定的类赋值
    setclass() {
      this.isactive = "is-active";
    },
    //去全部分类
    toAllcategory() {
      this.$router.push("/Allcategory");
    },
    //公告
    open() {
      this.$alert("请文明发言", "发帖规则", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    //声明
    statement() {
      this.$alert("这是这个小说书评网站", "更多功能，敬请期待", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    //去评论
    toCommnet() {
      this.$router.push("/Comment");
    },
    //去个人中心
    toUser() {
      this.$router.push("/User");
    },
    //去我的资料
    toUpdate() {
      this.$router.push("/Update");
    },
    checkout() {
      this.ISuser = false;
      this.test2 = 2;
      //修改vuex 状态
      this.$store.commit("changeLogin", { Authorization: "" });
      this.$store.commit("updateUser", "");
      //清理 localStorage
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.userinfo = this.user;
    this.hosts = this.host;
  },
  beforeDestroy() {
    this.$bus.$off("getname");
  },
  watch: {
    immediate: true, //初始化时让handler调用一下
    deep: true, //深度监视
    getCount(val) {
      if (val === "") {
        this.ISuser = false;
      } else {
        this.ISuser = true;
      }
    },
    UpdataUserInfo(val) {
      this.userinfo = this.user;
    },
  },
  computed: {
    //  ...mapMutations(['changeLogin']),
    ...mapState(["host", "user"]),
    getCount() {
      return this.$store.state.Authorization;
    },
    UpdataUserInfo() {
      return this.user;
    },
  },
};
</script>

<style scoped >
.header {
  top: 0;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;

  z-index: 99999;
  height: 60px;
}
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
.avatar {
  height: 48px;
  width: 48px;
}
</style>