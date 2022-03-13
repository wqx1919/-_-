<template>
  <div class="version_heart pannel Comment">
    <h3>请输入你的精彩发言</h3>
<el-form ref="form" :model="sizeForm" label-width="80px" size="mini">    <el-form-item label="输入标签">
      <el-input v-model="sizeForm.name"></el-input>
    </el-form-item>
        <div id="myWangEditor" ref="myWangEditor" style="z-index:1001">
      <!-- <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p> -->
      <div class="default">
      <p>好言一句三冬暖，恶语伤人六月寒</p>
      <p>请文明发言哦</p>
      </div>
    </div>
        <!-- <el-button round>        
           <i class="iconfont icon-tijiaoneihe istyle"></i>
           <span class="iconfont con-tijiaoneihe"></span>

        </el-button> -->
    <el-form-item class="sumbit">
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>

    </el-form>

  </div>
</template>

<script>
import wangEditor from "wangeditor"; //引入刚npm安装的wangeditor插件

export default {
  name: "Comment",
  data() {
    return {
      editorContent: "", //内容
       sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  },
  created() {},
  mounted() {
    // var _this = this; // eslint-disable-line no-unused-vars
    var editor = new wangEditor(this.$refs.myWangEditor); //实例化wangeditor
    editor.config.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
    editor.config.uploadFileName = "myFileName"; //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
    editor.config.withCredentials = true; //跨域上传中如果需要传递 cookie 需设置 withCredentials
    editor.config.uploadImgTimeout = 3000; //自定义 timeout 时间，这里是设置的3秒
    editor.config.uploadImgServer =
      "http://127.0.0.1:8008/ueditor/wangeditor/upload"; //上传到后台的接口
    editor.config.debug = true;
    // this.toListenUp(editor); //监听上传的各个阶段
    editor.create();
  },
  methods:{
    onSubmit(){
      console.log(1)
    }
  }
};
</script>

<style scoped>
.Comment {
  /* justify-content: center; */
  flex-direction: column;
  /* background-color: palegoldenrod; */
 /* background-color: palevioletred; */
  /* background-color: #ff7582; */
  /* background-color: #ffd180; */
    /* background-color: #FAF9DE; */
 /* background-image: linear-gradient(#e66465, #9198e5); */
  background-image: linear-gradient(#3B7B9A,
#70AFCa,
#A5DEF1,
#FFFFFF);

  /* * 河白色 #FFFFFF rgb(255, 255, 255)  
* 杏仁黄 #FAF9DE rgb(250, 249, 222)
* 秋叶褐 #FFF2E2 rgb(255, 242, 226)
* 胭脂红 #FDE6E0 rgb(253, 230, 224)
* 青草绿 #E3EDCD rgb(227, 237, 205)
* 海天蓝 #DCE2F1 rgb(220, 226, 241)
* 葛巾紫 #E9EBFE rgb(233, 235, 254)
* 极光灰 #EAEAEF rgb(234, 234, 239) */

}
.default{
    color: #606266;
}
 .istyle{
    display: block;
    /* height: 63px;
    width: 41px; */
}
.sumbit{
    width: 100%;
    margin-top: 10px ;
    display: flex;
    justify-content: space-between;
    /* flex-direction: column; */
}
.sumbit .el-button{
    /* margin-right: 10px; */
} 
/* #myWangEditor  .w-e-toolbar{ 
  background-color: palegoldenrod;
  z-index: 1001 !important;
} */

</style>