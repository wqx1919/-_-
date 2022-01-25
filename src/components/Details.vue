<template>
  <div class="Details version_heart">
    <div class="article pannel">
      <div class="top">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            更多<i class="iconfont icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              >编辑历史
              <i class="iconfont icon-bianji-icon iconfontstly"></i>
            </el-dropdown-item>
            <el-dropdown-item
              >复制
              <i class="iconfont icon-fuzhi iconfontstly_fuzhi"></i>
            </el-dropdown-item>
            <el-dropdown-item>
              举报 <i class="iconfont icon-tousujubao iconfontstly_jubao"></i>
            </el-dropdown-item>
            <el-dropdown-item>
              删除
              <!-- （管理员和自己） -->
              <i class="iconfont icon-shanchu_icon iconfontstly_shanchu"></i>
            </el-dropdown-item>
            <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="body">
        <!-- 文章数据 -->
        <h3 class="tltle">{{$route.params.title}}</h3>
        <div class="text">{{$route.params.content}}</div>
      </div>
      <div class="bottom">
        <i class="iconfont icon-24px"></i>
                <i class="iconfont icon-caozuo_cai_24px"></i>

        <i class="iconfont icon-pinglun"></i>
      </div>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
    <div class="right">
      <Label />
      <Hot />
    </div>
  </div>
</template>

<script >
import Label from "./part/Label.vue";
import Hot from "./part/Hot.vue";
export default {
  name: "Details",
  props:['content','title'],
  components: {
    Label,
    Hot,
  },
  methods: {
    
  },
   mounted() {
     console.log(this.$route)
  },
};
</script>

<style scoped>
.el-dropdown-link:hover {
  cursor: pointer;
  color: #409eff;
  /* position: absolute ;
  top: 0;
  right: 0; */
}
.el-dropdown {
  /* border: 1px solid #000; */
  position: absolute;
  top: 0;
  right: 0;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.Details {
  display: flex;
  /* flex-direction: column; */
}
/* .article { */
/* border: 1px solid #000; */
/* border: 1px solid #a18cd1; */

/* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */
/* position: relative; */
/* } */
.article{
  flex: 1;
  position:relative;
}
.article .top {
  /* height: 100px; */
  position: relative;
}
/* .article .top i {
  position: absolute;
  top: 0;
  right: 0;
} */
/* .article  i {
font-size:14px ;
} */

.article .el-pagination{
  position: absolute;
  bottom: 0;
}
.el-dropdown-menu {
  text-align: center;
}

.iconfontstly {
  font-size: 14px !important;
  /* background-color: palegoldenrod; */
}
.el-dropdown-menu .el-dropdown-item:nth-child(2) {
  position: relative;
}
/* .iconfontstly_jubao{
  position: absolute;
  font-size: 20px; */
/* top: 50%; */
/* left: 58%; */
/* margin-top: 10px; */
/* } */

/* .bottom {
  display: flex;
  justify-content: space-evenly;
} */
.tltle{
  text-align:center;
}
</style>