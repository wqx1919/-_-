<template>
  <div class="multistage " >
    <div v-if="children != null" class="comments" ref="box_shadow" >
      <!-- {{children[0].id}} -->
      <!-- {{typeof children[0]}} -->
          <div 
          v-if="!children[0] || !wu_more "
            class="grandpaline _1DooEIX-1Nj5rweIc5cw_E 2"
            
            @click="un_moreshow('',oindex)"
          >
          
          <!-- {{ JSON.stringify(children[0].children[0])+"00"}} -->
            <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
              <i class="threadline"></i>
            </div>
          </div>

           <!-- {{moreT}} -->
          <div>
           
          <div
            class="comment " :class="{showtime: subArticleComment.more}"
            v-for="(subArticleComment,index) in children"
            :key="subArticleComment.id"
          >
          <!-- {{subArticleComment.more}} -->
          <!-- <div v-if="keychildren"> -->
             <div class="expand_wu " v-if=" subArticleComment.more" @click="moreshow({Id:subArticleComment.id,obj:subArticleComment.more})">
            <!-- <p>
        更 <i>{{ keyword }}</i> 评论
      </p> -->
            <span class="iconfont icon-icon-expand_wu-copy expand"></span>
            </div>
          <div >
            <div
              class="grandpaline _1DooEIX-1Nj5rweIc5cw_E"
              v-if=" !subArticleComment.more || !more"
              @click="moreshow({Id:subArticleComment.reply_id,obj:subArticleComment.more})"
            >
            
            <div class="fatherline _36AIN2ppxy_z-XSDxTvYj5 t1_hvu4r1z">
              <i class="threadline"></i>
            </div>
            </div>
  
       
            <a class="avatar">
              <img :src="hosts+subArticleComment.from_user_avtar" alt="头像" />
            </a>
            <div class="content">
              <a class="author">{{ subArticleComment.from_user_account }}</a>
              <div class="metadata">
                <span class="date">{{subArticleComment.create_at}}</span>
                <!-- <span> 2022年2月5日15点16分 </span> -->
              </div>
              <div class="text">{{ subArticleComment.content }}</div>
              <div class="actions"  v-if="!subArticleComment.more"> 
                <span class="reply" @click="showCommentInput(subArticleComment)"
                  >回复</span
                >
                <span
                  style="margin-right: 15px"
                  class="delete"
                  v-if="
                   ( userinfo.account === subArticleComment.from_user_account || 'admin' === userinfo.account ) &&
                    subArticleComment.status === '1'
                  "
                  @click="getuserinfo(subArticleComment.id)"
                >
                  <i class="iconfont icon-shanchu_icon style"></i>
                  删除
                </span>
              </div>
              <transition name="fade">
                <div
                  class="input-wrapper"
                  v-if="showdataId === subArticleComment.id"
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
                      @click="commitreply(subArticleComment, 'reply')"
                      >确定</el-button
                    >
                  </div>
                </div>
              </transition>
            </div>
          </div>
            <multistage ref="status" :children="subArticleComment.children" :oindex="index" v-if="!subArticleComment.more"  :more_ex_progs="more" />
          </div>
        
            <!-- </div> -->
          </div>
      </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import dateFormat from "dateformat";
import { mapMutations,mapState } from 'vuex';
export default {
  name: "multistage",
  props: ["children",'oindex','more_ex_progs'],
  data() {
    return {
      imgSrc: require("../../../public/img/noavatar.png"),
      inputComment: "",
      showdataId: "",
      // ismyselfy: this.$store.state.name,
      // ismyselfy: JSON.parse(this.$store.state.user),
      userinfo:"",
      more: false,
      keyword: "少",
      line2:"",
      showtime:'',
      more2:false,
      moreT:false,
      more_ex:false,
      wu_more:true,
      keychildren:[],
      // host:'http://127.0.0.1:8008'
      hosts:""
    };
  },
  methods: {
    un_moreshow(_,obj){
        this.$bus.$emit("ismore", {index:obj});
        this.wu_more =!this.wu_more
        console.log(obj)
    },
    moreshow(obj) {
      // console.log(this.$parent)
      // if (this.keyword == "多") this.keyword = "少";
      // else {
      //   this.keyword = "多";
      // }
    //  this.more_ex  =  this.more2 = this.more = !this.more;
      // 放大               回复           线
      if(!this.more && typeof obj =="number"){
        // this.keychildren[obj]=''
           this.keychildren.splice(obj,1);
      }
      // this.children[0] =this.more 
      // if(!this.children[0]){
      //   this.moreT = true
      //   if(this.more)
      //    this.moreT = false
      // }
      // if (typeof obj !="undefined"&&  obj.reply_type == "comment"){
      //   this.$bus.$emit("ismore", { more: this.more, obj: obj });
      // }
      // if(obj==''){
      //   this.$bus.$emit("ismore", { index:oindex });
      //   // console.log(oindex)
      // }
      // this.showtime= " 'position': 'relative'; 'display': 'flex';'align-items': 'center;"
      // this.showtime ='showtime'
      // this.$parent.$data.more2 = this.more //传值给父组件
      // // this.$parent.$el.firstChild.className =' comments showtime'
      // // this.$el.parentNode.className ='comments showtime'
      // this.$parent.$data.more_ex = this.more //传值给父组件
      // this.$parent.$data.more = this.more //传值给父组件
      // if(this.more)
      // this.$parent.$data.showtime=this.more
      // console.log(this.$parent.$data.showtime)
    //  this.$forceUpdate() 
      // 父传子
      // if(obj=='parent'){
      // this.more =!this.more
      //  this.$children[0].$data.more = this.more //传值给儿子组件
      // }
      // console.log(this.$el.parentNode)
    //  console.log(this.$children[0].$data)
    // console.log(this.$el)
    // if( typeof obj.parent =="number"){
      // this.$parent.$data.more2 = this.more //传值给父组件
      // this.$parent.$data.more_ex = this.more //传值给父组件
      // this.$parent.$data.more = this.more //传值给父组件
      // console.log(typeof obj !="undefined" && typeof obj.Id !="undefined")
      if(typeof obj !="undefined" && typeof obj.Id !="undefined"){
      // this.$parent.$data.keychildren.push(obj.parent) //obj.parent //
      // this.$parent.$data.keychildren[obj.indexT]=obj.parent
      // console.log( this.$parent.$data.keychildren)
       this.$bus.$emit("ismore", obj);
      //  if(  obj.obj==true)
       this.more =obj.obj && this.more
      //  this.more = true;
        //  this.$forceUpdate() 
        // console.log(obj)
      // this.$forceUpdate() 
      //  console.log(1)
      }
    //  }
    },
    async commitreply(data, reply_type) {
      try {
        let _this = this;
        let param = new URLSearchParams();
        param.append("id", nanoid());
        param.append("reply_id", data.id);
        param.append("comment_id", data.comment_id);
        param.append("content", this.inputComment);
        param.append("reply_type", reply_type);
        param.append("to_user_id", data.from_user_id); //给谁发消息（上一个留言的用户）
         const now = new Date();
        param.append("create_at", dateFormat(now, "yyyy-mm-dd HH:mm:ss"))
        param.append("type", "reply");
        const res = await _this.$axios.post(
          "http://127.0.0.1:8008/addtopic_comment",
          param
        );
        if (res.data.status === 1) {
          alert(res.data.message);
        } else {
          this.$bus.$emit("addreply", nanoid());
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(this.inputComment);
    },
    cancel() {
      this.showdataId = "";
    },
    showCommentInput(data, reply) {
      if (reply) {
        this.inputComment = "@" + reply.fromName + " ";
      } else {
        this.inputComment = "";
      }
      this.showdataId = data.id;
    },
    getuserinfo(id) {
      this.$bus.$emit("delreply", { id: id, type: "reply" });
    },
  },
  mounted(){
     this.userinfo = JSON.parse(this.user)
     this.hosts=this.host
    // this.$bus.$on('moret',(data)=>{
    //  this.moreT = data
    // })
      //  console.log(this.$refs.status.$data) // 我是子组件的数据
  },
  beforeDestroy(){
    // this.$bus.$off('moret')
  },
   computed: {
    ...mapState(['host','user']),
    children_com (){
      // this.$forceUpdate() 
     
      return this.children
    }
  },
  //  watch:{
  //           children:(newVal,oldVal) => {
  //               console.log(newVal);
  //               // this.children_com = newVal;
  //           }
  //       }
  // watch:{
  //   more_ex_progs:{
  //    immediate:true,
  //     handler(newValue,oldValue){
  //        this.more = newValue
  //        this.more2 =!this.more
  //       //  console.log(newValue)
  //       console.log(this)
  //     }
  //   }
  // }
};
</script>

<style >
@import "../../../src/assets/css/comment.css";
</style>