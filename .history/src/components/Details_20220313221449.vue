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
            <el-dropdown-item v-if="topic_user_account.account === ismyselfy || ismyselfy === userinfo.account ">
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
        <h3 class="tltle">{{ $route.params.title }}</h3>
        <div class="text">{{ $route.params.content }}</div>
      </div>
      <div class="bottom">
        <i class="iconfont icon-24px"></i>
        <i class="iconfont icon-caozuo_cai_24px"></i>
        <i class="iconfont icon-pinglun" @click="jump()"></i>
      </div>
      <!-- <div class="Comment_reply comment" ref="comment_header">
        评论:
        <ul>
          <li
            style="max-height: 500px; overflow: auto"
            v-for="(data, index) in tree_comment"
            :key="index"
          >
      <p v-if="uersinfo[index]">
              昵称:{{uersinfo[index].account}}
              内容:{{ data.content }}
            </p>          
      昵称:{{data.account}}
            内容:{{ data.content }}
            <Replyn :reply="tree_reply_results[index]"  />
      <div class="top">
              <div class="pic">
                [头像]
              </div>
              <p>{{ data.account }}</p>
              <p style="font-size:12px;">2022年2月4日13点51分</p>
            </div>
              <div class="content" style="margin-left:5px">
              <span v-html="data.content"></span>
              </div>
              <p class="bottom">
              <span class="comment-reply" @click="showCommentInput(data)">
                <i class="iconfont icon-pinglun"></i>
                <span >回复</span>
              </span>
              <span style="margin-right:15px;" class="delete" v-if="ismyselfy===data.account && data.status===1"   @click="getuserinfo(data.id)">
                 <i class="iconfont icon-shanchu_icon"></i>
                  删除
              </span>
              </p>
          </li>
        </ul>
       </div> -->
      <div class="ui threaded comments" ref="comment_header">
        <div
          class="comment"
          
          v-for="(data, index) in tree_comment.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :key="data.id"
        >
          <div class="expand_wu"  v-if="data.more " :indexa="data.id" @click="moreshow(data.id,index)">
            
            <!-- {{data.id}} -->
            <!-- <p>
              更 <i>{{ keyword }}</i> 评论
            </p> -->
            <span class="iconfont icon-icon-expand_wu-copy expand"></span>
          </div>
          <div>
          <a class="avatar">
            <img :src="hosts+data.avtar" alt="头像" />
            <!-- {{data.avtar}} -->
            <!-- <img src="../../public/img/noavatar.png" alt="头像"> -->
          </a>
          <div class="content">
            <a class="author">{{ data.account }}</a>
            <div class="metadata">
              <span class="date">{{ data.create_at }}</span>
              <!-- 2022年2月5日15点46分 -->
              
            </div>
            <div class="text" v-html="data.content"  >{{ data.content }}</div>
            <div class="actions" v-if="!data.more" >
              <span class="reply" @click="showCommentInput(data)">回复</span>
              <span
                style="margin-right: 15px"
                class="delete"
                v-if=" userinfo.account === data.account || 'admin' === userinfo.account && data.status === 1"
                @click="getuserinfo(data.id)"
              >
                <i class="iconfont icon-shanchu_icon style"></i>
                删除
              </span>
              
            </div>
          </div>
          <multistage
          ref="replytest"
            v-if="tree_comment.length - 1 != index && !data.more "
            :children="data.children" :oindex="index"
          />
          <!-- 最后一个组件不该用划线 -->
          <div
            class="write-reply"
            v-if="data.children.length > 0 && !data.more"
            @click="showCommentInput(data, $event)"
          >
            <i class="el-icon-edit"></i>
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div
              ref="input_txt"
              id="input_txt"
              class="input-wrapper"
              v-if="showdataId === data.id"
            >
              <el-input
                class="gray-bg-input"
                v-model="inputComment"
                type="textarea"
                :rows="3"
                autofocus
                placeholder="写下你的评论"
              >
              </el-input>
              <div class="btn-control">
                <span class="cancel" @click="cancel">取消</span>
                <el-button
                  class="btn"
                  type="success"
                  round
                  @click="commitreply(data, 'comment')"
                  >确定</el-button
                >
              </div>
            </div>
          </transition>
          </div>

        </div>
  <el-pagination
  background
  layout="prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
  :page-size="pagesize"
  :total="tree_comment.length">
   </el-pagination>
        <!-- <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination> -->
        <div class="input-wrapper">
          <div id="div1">
            <p>写下你的评论</p>
          </div>
          <div class="btn-control">
            <span class="cancel" @click="cancel">取消</span>
            <el-button class="btn" type="success" round @click="commitComment"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <Label />
      <Hot />
    </div>
  </div>
</template>

<script >
import { nanoid } from "nanoid";
import dateFormat from "dateformat";
import Label from "./part/Label.vue";
import Hot from "./part/Hot.vue";
import Replyn from "./part/Replyn.vue";
import multistage from "./part/Multistage";
import wangEditor from "wangeditor"; //引入刚npm安装的wangeditor插件
import { mapMutations,mapState } from 'vuex';
export default {
  name: "Details",
  // props:['content','title'],
  data() {
    return {
      tree_comment: [],
      showdataId: "",
      inputComment: "",
      temp: "",
      ismyselfy: JSON.parse(this.$store.state.user).account,
      userinfo:'',
      topic_user_account: "",
      chrildadd: "",
      chrilddel: "",
      // imgSrc: "https://picsum.photos/id/234/100/100",
      imgSrc: require("../../public/img/noavatar.png"),
      target: "",
      more: false,
      keyword: "多",
      moreobj:{
        id:'',
        obj:{
          id:''
        }
      },
      oindex:{},
        currentPage:1, //初始页
         pagesize:8,    //    每页的数据
        //  host:'http://127.0.0.1:8008',
         hosts:''
      
    };
  },
  components: {
    Label,
    Hot,
    Replyn,
    multistage,
  },
  methods: {
       // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize)  //每页下拉显示数据
            // console.log(this)
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
            // console.log(this.topic.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))  //第几页数据
    },
    treeForeach(tree,id) {
      // tree.forEach(data => {
      //   //  console.log(id)
      //   if(data.id == id ) {
      //     data.more = !data.more
      //     // console.log(data)
      //     // data.m = "2"
      //     func(t)
      //   }
        
      //   data.children && this.treeForeach(data.children,id,func) // 遍历子树
      // })
      for (let data of tree) {
          if(data.id == id ) {
            // data.more = !data.more
            this.$set(data,'more', !data.more)
            // console.log(data)
            // this.obj.$set(keyOfItem, newValue)
            // this.$set(this.student, 'age', 15)
            }
           data.children && this.treeForeach(data.children,id) // 遍历子树
            
      }
      // console.log(tree)
      return tree 
      
    },
    treeForeach_(tree) {
      // console.log(tree)
      // console.log(typeof tree)
      // for (let key in tree) {
      //     // tree[key].more =false
      //     // console.log(tree[key])
      //     // if(tree[key].children)
      //     tree[key].more = false
      //     if(tree[key].children)
      //       this.treeForeach_(tree[key].children)
      //     // console.log(tree[key])
      //     //  this.treeForeach_(tree[key])
      // }
      tree.forEach(data => {
        // data.more = false
         this.$set(data,'more',false)
        data.children && this.treeForeach_(data.children) // 遍历子树
      })
    },
    moreshow(id,index) {
      this.more =true
      // this.moreobj.id = '';
      // alert(this.tree_comment[index].more)
            this.$set(this.tree_comment[index],'more', false)
            // this.$set(this.oindex[index],'more', false)
      // console.log(this.tree_comment[index])
      // this.tree_comment[index].more=false
      // this.oindex[index].more=false
      // this.$forceUpdate() 
      //  console.log(this.tree_comment[index].more)
      // this.moreobj.more=false
    },
    async getData() {
      let _this = this;
      let param = new URLSearchParams();
      param.append("topic_id", this.$route.params.id);
      await _this.$axios
        .post("http://127.0.0.1:8008/api/gettopic_comment", param)
        .then(
          (res) => {
            if (res.data.status === 1) {
              alert(res.data.message);
            } else {
              _this.tree_comment = res.data.data.comment_results;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    async getuserinfo(Id, type = "comment") {
      try {
        let _this = this;
        const res = await _this.$axios.get(
          "http://127.0.0.1:8008/deletecommentById",
          // {params:{ topic_user_id: this.$route.params.topic_user_id ,type:"comment"}}
          { params: { id: Id, type: type } }
        );
        if (res.data.status === 1) {
          alert(res.data.message);
          // alert("00")
        } else {
          await _this.getData();
          console.log("chengg");
        }
      } catch (err) {
        console.log(err);
      }
    },
    likeClick(data) {
      if (data.isLike === null) {
        Vue.$set(data, "isLike", true);
        data.likeNum++;
      } else {
        if (data.isLike) {
          data.likeNum--;
        } else {
          data.likeNum++;
        }
        data.isLike = !data.isLike;
      }
    },
    /**
     * 点击取消按钮
     */
    cancel() {
      this.showdataId = "";
    },
    /**
     * 提交评论
     */
    async commitComment() {
      //   let _this = this;
      //   let param = new URLSearchParams();
      //   param.append("", this.inputComment);
      //  const  res  =  await _this.$axios.post("http://127.0.0.1:8008/my/addtopic_comment", param)
      // .then(
      //   (res) => {
      //     if (res.data.status === 1) {
      //       alert(res.data.message);
      //     } else {
      //        await _this.getData()
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("topic_id", this.$route.params.id);
        param.append("content", this.inputComment);
        param.append("topic_type", this.$route.params.topic_category_id);
         const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:mm:ss"))
        param.append("type", "comment");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
          await _this.getData();
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
    },
    async commitreply(data, reply_type) {
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("reply_id", data.id);
        param.append("comment_id", data.id);
        param.append("content", this.inputComment);
        param.append("reply_type", reply_type);
        param.append("to_user_id", data.from_user_id); //给谁发消息（上一个留言的用户）
        const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:mm:ss"))
        // param.append("dd","测试")
        param.append("type", "reply");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
          await _this.getData();
        }
      } catch (err) {
        console.log(err);
      }
      console.log(this.inputComment);
    },
    /**
     * 点击评论按钮显示输入框
     * data: 当前大评论
     * reply: 当前回复的评论
     */
    jump(e) {
      window.scrollTo({
        top: this.$refs.comment_header.offsetTop,
        behavior: "smooth", //平滑滚动
      }); //跳转指定页面的位置
      // console.log(e)
    },
    showCommentInput(data, reply) {
      this.showdataId = data.id;
      this.$nextTick(() => {
        document.querySelector("#input_txt").scrollIntoView();
        window.scrollTo(0, window.scrollY - 300); //导航遮掩
        console.log(reply);
        // @@不能用offset ,英文offset是距离最近定位的距离
        //         getBoundingClientRect ( ) 返回值：对象 有6个属性
        // left（元素左侧相对于可视区左上角的距离）
        // right（元素右侧相对于可视区左上角的距离）
        // top（元素上边相对于可视区左上角的距离）
        // bottom（元素下边相对于可视区左上角的距离）
        // width（可视宽度）
        // height（可视高度）
      });
    },
  },
  async mounted() {
    await this.getData();
    await this.treeForeach_(this.tree_comment)
    // await this.getuserinfo();
    //  const E = window.wangEditor
    const editor = new wangEditor("#div1");
    editor.config.placeholder = "自定义 placeholder 提示文字";
    editor.config.height = 500;
    editor.config.zIndex = 10;
    // 配置菜单栏，删减菜单，调整顺序
    editor.config.menus = [
      "bold",
      "head",
      "link",
      "italic",
      "underline",
      "image",
      "emoticon",
    ];
    editor.config.onchange = (html) => {
      this.inputComment = html;
    };
    editor.create();
    // for (let index = 0; index < this.tree_comment.length; index++) {
    //   this.oindex[index]={more:false}
    //   this.tree_comment[index].more=false
    //   // this.$forceUpdate() 
    // }
    
    this.$bus.$on("addreply", (data) => {
      this.chrildadd = data;
    });
    
    this.$bus.$on("delreply", (data) => {
    
      this.chrilddel = data;
    });
    
    this.$bus.$on("ismore", (data) => {
      // console.log(data)
      // this.tree_comment[0]
      // console.log( this.tree_comment[0])
      // for (const key in object) {
      //   if (Object.hasOwnProperty.call(object, key)) {
      //     const element = object[key];
          
      //   }
      // }
      // console.log( this.tree_comment[1].children[0].id)
      // console.log(typeof data.index)
      //  console.log( typeof data.index)
      // this.$nextTick(()=>{
        // console.log(data)
      if(typeof data.Id!='undefined'){
           this.tree_comment =  this.treeForeach(this.tree_comment,data.Id)
            //  this.$forceUpdate() 
          // console.log(this.tree_comment)
          // console.log(this.tree_comment)
          // console.log()
      }
      
      if( typeof data.index=='number'){
        // console.log(1)
        // this.tree_comment[data.index].more = true
        // this.oindex[data.index]={more:true}
        // console.log( this.oindex[data.index].more +"00")
        // this.$forceUpdate() 
        //  console.log( this.tree_comment[data.index])
        //  return
            this.$set(this.tree_comment[data.index],'more', true)
            this.$set(this.oindex[data.index],'more', true)
      }
   
      // this.oindex = this.oindex.filter((e)=>{
      //    e[data.index].more=true
      // })
      // if(typeof data == Event){
      //   console.log(data)
      // }
      // for(let e=0;e<this.tree_comment.length;e++){
      //   // console.log(this.tree_comment[e].children)
      //   // console.log(1)
      //  if( typeof data.obj!="undefined" && this.tree_comment[e].id == data.obj.id){
         
      //   //  console.log( this.tree_comment[e].children.id)
      //     this.tree_comment[e].more = true
      //     // consolw.log(e)
      //     // console.log("0000")
      //  }
      // }
      // this.$forceUpdate() 
      // console.log(this.$refs.replytest[2].$data) // 我是子组件的数据
    //     let id =data.obj.reply_id;
    //     let list = [{id:id}]
    // list.map((el) => {
    //   this.moreobj[el.id] = el;
    // });
      // this.moreobj.obj.id = {id};
      // this.moreobj[id]={id:data.reply_id}
    });
      if(typeof this.user =='string')
      this.userinfo = JSON.parse(this.user)
      else
      this.userinfo =this.user
      this.hosts=this.host
  },
  beforeDestroy() {
    this.$bus.$off("addreply");
    this.$bus.$off("delreply");
     this.$bus.$off("ismore");
    // window.removeEventListener('scroll', this.handleScroll)
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     let targetbox = document.getElementById("input_txt");
    //     this.target = targetbox.offsetTop;
    //   });
    // });
  },
  computed: {
     ...mapState(['host','user']),
    //    ALLuersinfo() {
    //   // console.log(id)
    //   const _this =this
    //   var temp1=""
    //   // console.log(this.comment_results)
    //   for (let i = 0; i < this.comment_results.length; i++) {
    //     // if (id === this.comment_results[i].from_user_id){
    //       // console.log(id)
    // _this.$axios.get("http://127.0.0.1:8008/api/alluserinfo", {
    //     params: { id: id },
    //   })
    //   .then(
    //     (res) => {
    //       if (res.data.status === 1) {
    //         // alert(res.data.message)
    //         console.log(res.data);
    //       } else {
    //          console.log(res.data.data.account)
    //         _this.uersinfo.push(res.data.data); //赋值
    //         _this.temp1= res.data.data.account
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //   }
    //   return  11     //  return
    // }
  },
  watch: {
    chrildadd: {
      immediate: true, //初始化时让handler调用一下
      deep: true, //深度监视
      handler() {
        this.getData();
      },
    },
    chrilddel: {
      // immediate:true, //初始化时让handler调用一下
      // deep:true,//深度监视
      handler(newValue) {
        this.getuserinfo(newValue.id, newValue.type);
      },
    },
    //  dataid(new1,ole){
    //    console.log(new1)
    //  }
    //  dataid:{
    //   //  Object.keys(_this.comment_results).forEach(function(key){
    //   //    console.log(_this.reply_results)
    //   //    console.log(key,_this.comment_results[key]);
    //     handler(oldValue,newValue){
    //     let _this  = this
    //     console.log(_this._data.dataid)
    //     // console.log("###")
    //     console.log(oldValue+"@@"+newValue)
    //      Object.keys(_this.reply_results).forEach(function(key2){
    //          if(newValue ===_this.reply_results[key2].comment_id ){
    //            console.log(_this.reply_results[key2].content)
    //            return _this.reply_results[key2].content
    //          }
    //       })
    //     }
    //  }
    //  comment_results_details(id){
    //    let _this  = this
    //   //  Object.keys(_this.comment_results).forEach(function(key){
    //     //  console.log(_this.reply_results)
    //     //  console.log(key,_this.comment_results[key]);
    //      Object.keys(_this.reply_results).forEach(function(key2){
    //          if(id ===_this.reply_results[key2].comment_id ){
    //            console.log(_this.reply_results[key2].content)
    //            return _this.reply_results[key2].content
    //          }
    //       });
    //     }
  },
};
</script>

<style scoped>
@import "../../src/assets/css/comment.css";
/* .expand_wu{
  width: 12px;
  height: 12px;
  display: inline-block;
  margin:0 8px;
  line-height: 12px;
  
  margin-right: ; @@@
}
.expand_wu span.expand{
    color:var( --newCommunityTheme-linkText);
}
:root{
  --newCommunityTheme-line: #EDEFF1;
}
.threadline{
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    border-right: 2px solid var(--newCommunityTheme-line);
    display: block;
    height: 100%;
    width: 50%;
}
._36AIN2ppxy_z-XSDxTvYj5{
    word-break: break-word;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    height: 100%;
    margin-left: 5px;
    vertical-align: top;
    width: 16px;
}
._1DooEIX-1Nj5rweIc5cw_E{
    word-break: break-word;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    z-index: 2;
} */
.article .comments .comment {
  position: relative;
  display: flex;
  /* justify-content: space-evenly */
  align-items: center;
}
.delete {
  display: none;
}
.article .comments .comment .actions:hover .delete,
.article .comments .comment .actions:hover .delete i {
  color: red;
  font-size: 0.875em;
  display: inline-block;
}
.article .comments .comment .actions:hover i.style {
  font-size: 0.875em;
  /* height: 14.7px; */
  /* vertical-align:middle */
  line-height: 0;
}
.article .comments .comment .content .actions:hover span {
  cursor: pointer;
}
.article .comments .comment .content .actions {
  position: relative;
  /* @@@ */
  /* background-color: rebeccapurple; */
  z-index: 10;
}
/* .article .comments .comment  .content .actions span:nth-child(1){
  width: 100%;
  display: inline-block;
} */
.article .comments .comment .actions:hover .delete {
  position: absolute;
  right: 30px;
}
/* .article .comments .comment  .content:hover + .actions { */
/* position: relative; */
/* vertical-align:middle; */
/* line-height: 1; */
/* } */
/* .article .comments .comment  .text:hover + .actions .delete { */
/* position: absolute; */
/* right: 30px; */
/* vertical-align:middle; */
/* line-height: 1; */
/* } */
.ui.threaded.comments {
  margin-bottom: 30px;
  /* box-shadow: -1px 0 0 rgba(64,158,255,.15); */
  /* background-color: yellow; */
}
.Comment_reply li .bottom {
  padding: 0 10px;
  display: block;
  position: relative;
}
.top {
  display: flex;
}
/* .content{
  background-color: var(--commentbackgroun);
} */
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
.article {
  flex: 1;
  position: relative;
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
.article .el-pagination {
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
.tltle {
  text-align: center;
}
.Comment_reply {
  margin-bottom: 32px;
}
.messages {
  margin-left: 20px;
}
.write-reply {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;
  padding: 10px;
  cursor: pointer;
}
.write-reply:hover {
  color: #303133;
}
.write-reply .el-icon-edit {
  margin-right: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.input-wrapper {
  padding: 10px;
}
.input-wrapper .btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}
.input-wrapper .btn-control .cancel {
  font-size: 16px;
  color: #606266;
  margin-right: 20px;
  cursor: pointer;
}
.input-wrapper .btn-control .cancel:hover {
  color: #333;
}
.input-wrapper .btn-control .confirm {
  font-size: 16px;
}
</style>