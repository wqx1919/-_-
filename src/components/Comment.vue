<template>
  <div class="version_heart pannel Comment">
    <h3>请输入你的精彩发言</h3>
    <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
      <el-form-item label="输入标题">
        <el-input
          v-model="sizeForm.title"
          placeholder="请起个让人眼前一亮的标题"
        ></el-input>
      </el-form-item>
      <el-form-item :label="inputBookName">
        <el-input
          v-model="sizeForm.name"
          :placeholder="bookNameRlaceholder"
          :disabled="isDisable"
          @blur="inputBookNameBlur"
        ></el-input>
      </el-form-item>
      <!-- 如果输入的书名数据库不存在,会出现个输入描述的的输入框 -->
      <el-form-item label="描述" v-if="sizeForm.isBookNew">
        <el-input
          v-model="sizeForm.descrition"
          placeholder="亲，这是个新的书名，请输入书名描述"
        ></el-input>
      </el-form-item>
      <div id="myWangEditor" ref="myWangEditor" style="z-index: 1001">
        <!-- <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p> -->
        <div class="default" v-if="blurClear">
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
import dateFormat from "dateformat";
import { mapState } from "vuex";
export default {
  name: "Comment",
  data() {
    return {
      editorContent: "", //内容
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        inputComment: "", //输入的帖子内容
        title: "", //标题
        isBookNew: "", //是否展示新书的输入款
        descrition: "", //小说描述
      },
      isDisable: false,
      bookNameRlaceholder: "输入小说名字",
      inputBookName: "输入小说名字",
      isNew: false,
      editRouterParameterBookName: "",
      editorWangEditor: "",
      blurClear: true,
    };
  },
  created() {},
  async mounted() {
    // var _this = this; // eslint-disable-line no-unused-vars
    var editor = new wangEditor(this.$refs.myWangEditor); //实例化wangeditor
    editor.config.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
    editor.config.uploadFileName = "myFileName"; //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
    editor.config.withCredentials = true; //跨域上传中如果需要传递 cookie 需设置 withCredentials
    editor.config.uploadImgTimeout = 3000; //自定义 timeout 时间，这里是设置的3秒
    editor.config.zIndex = 10;
    // 配置菜单栏，删减菜单，调整顺序
    editor.config.menus = [
      "bold",
      "head",
      // "link",
      "italic",
      "underline",
      "image",
      "emoticon",
      "undo",
      "redo",
    ];
    editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      // 上传图片，返回结果，将图片插入到编辑器中
      let _this = this;
      // console.log(JSON.parse(this.user).id)
      let param = new FormData(); // 创建form对象
      param.append("myFileName", resultFiles[0]); // 将文件存入myFileName下面
      const dateinfo = await _this.$axios.post(
        "http://127.0.0.1:8008/addcomentfile",
        param
      );
      try {
        insertImgFn(dateinfo.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    editor.config.debug = true;
    // this.toListenUp(editor); //监听上传的各个阶段
    editor.config.onchange = (html) => {
      this.inputComment = html;
    };
    this.editorWangEditor = editor;
    editor.config.onfocus = () => {
      // console.log("1")
      this.blurClear = false;
    };
    editor.config.showFullScreen = false;
    editor.create();
    // debugger
    //如有传值过来对的书名
    this.sizeForm.name = this.$route.query.category_name;

    //编辑页面
    // 传值过来的标题
    this.sizeForm.title = this.$route.query.title;
    //传值过来的内容----回显
    // editor.txt.html(this.$route.query.content);
    if (this.$route.query.form === "edit") {
      await this.loadTopic(); //获取书名
      await this.loadTopicContent(); //获取内容 | 并赋值到对象
      editor.txt.html(this.sizeForm.inputComment);
      this.sizeForm.name = this.editRouterParameterBookName;
      this.isDisable = true;
    } else {
      //判断当前的书名是否可以输入（默认可以输入disabled值为false），如果是从分类里面的"发帖"就是只读的，如果是从别的地方就说明可以写别的这个变量用来判读axios的接口调用
      this.isDisable = !!this.$route.query.isDisable;
      if (this.isDisable) {
        //当他为真是说明不可输入，就说明有路由赚过来的书名
        this.bookNameRlaceholder = this.$route.query.category_name;
        this.inputBookName = "当前分类";
        this.isNew = true;
      }
    }
  },
  methods: {
    //获取焦点去掉默认字
    FuntionBlurClear() {
      this.blurClear = false;
      // console.log("!!");
    },
    //根据id获取帖子
    async loadTopicContent() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/api/getTopicById",
          { params: { id: _this.$route.query.id } }
        );
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.sizeForm.inputComment = res.data.data.content_html;
          _this.sizeForm.title = res.data.data.title;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //根据id获取帖子分类信息
    async loadTopic() {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/api/getByIdcategory",
          { params: { id: _this.$route.query.topic_category_id } }
        );
        if (res.data.status === 1) {
          _this.$message({
            showClose: true,
            message: res.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.editRouterParameterBookName = res.data.data.name;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onSubmit() {
      //来自编辑页面

      if (this.$route.query.form === "edit") {
        let _this = this;
        let param = new URLSearchParams();
        param.append("title", _this.sizeForm.title);
        param.append("content_html", _this.inputComment);
        param.append("content", _this.editorWangEditor.txt.text());

        param.append("id", _this.$route.query.id);
        const dateinfo = await _this.$axios.post(
          "http://127.0.0.1:8008/api/updateTopic",
          param
        );
        try {
          if (dateinfo.data.status === 1) {
            _this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "error",
              offset: 100,
            });
          } else {
            _this.$message({
              showClose: true,
              message: "更新帖子成功",
              type: "success",
              offset: 100,
            });
            _this.$router.push({
              name: "details",
              params: { id: _this.$route.query.id },
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        //提交前调用这个失去函数
        await this.inputBookNameBlur();
        let _this = this;
        let param = new URLSearchParams();
        // param.append("topic_user_id", this.user.id);
        param.append("topic_user_id", this.user.id);
        param.append("title", this.sizeForm.title);
        param.append("content_html", _this.inputComment);
        param.append("content", _this.editorWangEditor.txt.text());
        const now = new Date();
        param.append("topic_time", dateFormat(now, "yyyy-mm-dd HH:MM:ss"));
        let dateinfo;
        if (this.isDisable) {
          param.append("topic_category_id", this.$route.query.category_id);
          dateinfo = await _this.$axios.post(
            "http://127.0.0.1:8008/api/addCategoryTpoic",
            param
          );
        } else {
          //全选分类api
          param.append("name", this.sizeForm.name);
          param.append("descrition", this.sizeForm.descrition);
          dateinfo = await _this.$axios.post(
            "http://127.0.0.1:8008/api/addNewCategorTopic",
            param
          );
        }
        try {
          if (dateinfo.data.status === 1) {
            _this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "error",
              offset: 100,
            });
          } else {
            _this.$message({
              showClose: true,
              message: dateinfo.data.message,
              type: "success",
              offset: 100,
            });
            // console.log(dateinfo)
            console.log(dateinfo);
            const getcategoryinfo = await _this.$axios.get(
              "http://127.0.0.1:8008/api/getCategorybookName",
              { params: { name: _this.sizeForm.name } }
            );
            try {
              // console.log(getcategoryinfo.data[0])
              this.$router.push({
                path: "/topic",
                query: getcategoryinfo.data[0],
              });
              // console.log(getcategoryinfo.data);
            } catch (err) {
              console.log(err);
            }
            // const getcategoryinfo = await _this.$axios.get("http://127.0.0.1:8008/api/getByIdcategory",{params:{id:dateinfo.topic_category_id}})
            // this.$router.push({
            //   path:"/topic",
            //   query: getcategoryinfo.data
            // })
            // console.log(getcategoryinfo.data)
            // if(dateinfo.data.length==0){
            //   console.log(dateinfo.data)
            // }else{
            //             _this.$message({
            //   showClose: true,
            //   message: dateinfo.data.message,
            //   type: "error",
            //   offset: 100,
            // });
            //   // 预计返回一个id，然后根据这id查询 或者直接在后端
            //   let getcategoryinfo = await _this.$axios.get("http://127.0.0.1:8008/api/getByIdcategory",{params:{id:dateinfo.topic_category_id}})
            //   this.$router.push({
            //     path:"/topic",
            //     query: getcategoryinfo.data
            //   })
            //   console.log(getcategoryinfo)
            // }
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    //文本框失去焦点之后，发搜axios封装的ajax，返回的数据，页面展示对于信息
    async inputBookNameBlur() {
      console.log("输入框失去焦点");
      //此时应该发个axios请求，判断数据库与输入的字段是否存在
      let _this = this;
      const dateinfo = await _this.$axios.get(
        "http://127.0.0.1:8008/api/getCategorybookName",
        { params: { name: _this.sizeForm.name } }
      );
      try {
        console.log(dateinfo.data);
        if (dateinfo.data.length == 0) {
          this.sizeForm.isBookNew = true; //说明无字段
        } else {
          this.sizeForm.isBookNew = false; //说明有字段
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapState(["Authorization", "user"]),
  },
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
  background-image: linear-gradient(#3b7b9a, #70afca, #a5def1, #ffffff);

  /* * 河白色 #FFFFFF rgb(255, 255, 255)  
* 杏仁黄 #FAF9DE rgb(250, 249, 222)
* 秋叶褐 #FFF2E2 rgb(255, 242, 226)
* 胭脂红 #FDE6E0 rgb(253, 230, 224)
* 青草绿 #E3EDCD rgb(227, 237, 205)
* 海天蓝 #DCE2F1 rgb(220, 226, 241)
* 葛巾紫 #E9EBFE rgb(233, 235, 254)
* 极光灰 #EAEAEF rgb(234, 234, 239) */
}
.default {
  color: #606266;
}
.istyle {
  display: block;
  /* height: 63px;
    width: 41px; */
}
.sumbit {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
}
.sumbit .el-button {
  /* margin-right: 10px; */
}
/* #myWangEditor  .w-e-toolbar{ 
  background-color: palegoldenrod;
  z-index: 1001 !important;
} */
</style>