<template>
  <div class="main_box Couplet" :style="isfixed" ref="Couplet">
    <!-- <div class="Floating_window" :style="{ display: isdisplay }"> -->
    <div class="Floating_window" ref="bacc">
      <!-- :style="{ height: childheight + 'px' }" -->
      <transition-group
        class="middle clearfix"
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInDown"
        leave-active-class="animate__backOutUp"
      >
        <div
          class="The_nUiom left"
          key="1"
          v-show="isdisplay"
          ref="childheight"
        >
          <!-- {{ancientChinesePoetry[myrandomfuntion].up}} -->
          <!-- <p>上联</p> -->
          <!-- <p ></p> -->
          <!-- <p key="1">清风不识字</p> -->
          {{ ancientChinesePoetry[myrandom].up }}
          <!-- {{myrandom}} -->
        </div>
        <div
          class="next_link right animate__animated animate__bounce"
          key="2"
          v-show="isdisplay"
        >
          {{ ancientChinesePoetry[myrandom].down }}
          <!-- <p>下联</p>  -->
          <!-- <p ></p> -->
        </div>
        <el-form
          class="custom_input"
          key="3"
          label-width="80px"
          v-show="isshow"
        >
          <!-- <div class="custom_input" key="2"> -->
          <el-form-item label="上联">
            <el-input v-model="custom_list.up"></el-input>
          </el-form-item>
          <el-form-item label="下联">
            <el-input v-model="custom_list.down"></el-input>
          </el-form-item>
          <div class="bottom">
            <el-button size="mini" @click="onSubmit('replace')">替换</el-button>
            <el-button size="mini" @click="onSubmit('join')">加入</el-button>
            <!-- <el-button size="mini" @click="onSubmit('done')">确定</el-button> -->
          </div>

          <!-- </div> -->
        </el-form>
      </transition-group>
    </div>
    <div class="_th-container">
      <div class="_th-click-hover _item-input" @click="getanimation">
        点我动画<span class="iconfont icon-pendant"></span>
      </div>
      <div class="_th-item _item-x2" @click="custom">自定义</div>
      <!-- <div class="_th-item _item-x-2">&lt;</div>
      <div class="_th-item _item-xx2">&gt;&gt;</div>
      <div class="_th-item _item-xx-2">&lt;&lt;</div>
      <div class="_th-item _item-reset">O</div> -->
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Couplet",
  data() {
    return {
      //   isdisplay: "none",

      //   html_text:""
      isdisplay: false,
      ancientChinesePoetry: [
        {
          up: "旧书不厌百回读",
          down: "熟读深思子自知",
        },
        {
          up: "闭门即是深山",
          down: "读书随处净土",
        },
        {
          up: "三更灯火五更鸡",
          down: "正是男儿读书时",
        },
        {
          up: "闭门即是深山",
          down: "读书随处净土",
        },
        {
          up: "一日不读书",
          down: "胸臆无佳想",
        },
        {
          up: "读书之法无他，惟是笃志虚心",
          down: "反复详玩，为有功耳",
        },
        {
          up: "尽信书",
          down: "则不如无书",
        },
      ],
      myrandom: 0,
      v_modal: "",
      childheight: 0,
      temp: 500,
      isfixed: { position: "", top: "", width: "" },
      isshow: false,
      // @@@ width:100% 重点
      custom_list: {
        up: "",
        down: "",
      },
    };
  },
  methods: {
    getanimation() {
      //   this.isdisplay == "none" ? this.isdisplay="block" : this.isdisplay="none" ;
      this.isshow == true ? (this.isshow = false) : this.isshow;
      this.isdisplay = !this.isdisplay;
      this.myrandom = Math.floor(
        Math.random() * this.ancientChinesePoetry.length
      );
      // console.log(Math.floor(Math.random() * this.ancientChinesePoetry.length));
      //    document.body.style("bacc")
      //   this.v_modal == "nonv_modale" ? this.v_modal="" : this.isdisplay="none" ;

      //   this.v_modal = "v_modal";
      // if(this)
      if (this.isdisplay === true) {
        this.childheight = this.temp;
        //  this.$refs.bacc.style="background-color:rgba(255, 255, 255, 0.3);z-index:999999;margin-top:10px";
        // this.$refs.bacc.style="background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,250,255,1),rgba(255,0,0,0));z-index:999999;margin-top:10px";
        //  this.$refs.bacc.style="background-color: #DCD9D4;background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%);background-blend-mode: soft-light,screen;z-index:999999;margin-top:10px";
        // this.$refs.bacc.style="background-image:radial-gradient(circle,rgba(255,255,255,1) ,rgba(255,255,255,0));z-index:999999;margin-top:10px";
        // rgba(255,255,255,0), rgba(255,250,255,1),rgba(255,0,0,0)
        //  this.$refs.bacc.style="background-color:rgba(255, 255, 255, 0.3);z-index:999999;margin-top:10px";
        //  this.$refs.childheight.style="	border-top-width: 4px;border-top-style: solid;background-color:var(--defaultcolor);z-index:999999;margin-top:10px";
      } else {
        this.temp = this.$refs.childheight.offsetHeight;
        this.childheight = 0;
        this.$refs.bacc.style = "background-color:''";
      }
      // console.dir(this.$refs.childheight.offsetHeight+"\n"+this.isdisplay+"\n"+this.childheight)
      // console.log(window.getComputedStyle(document.querySelector('#app .Couplet '),null))
    },
    scrollEvent() {
      let _this = this;
      let read = _this.$el.querySelector("#read");
      console.log(read.scrollToTop);
    },
    handleScroll() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
      //  let scrollTop = document.querySelector(".Couplet").scrollTop;
      // console.log(document.documentElement.scrollTop);
      // console.log(scrollTop);
      if (scrollTop >= 10) {
        this.isfixed.position = "sticky";

        this.isfixed.top = "60px";
        this.isfixed.width = "100%";
      } else {
        this.isfixed.position = "";
        this.isfixed.top = "";
        this.isfixed.top = "";
      }
      // let offsetTop = document.querySelector('.middle').offsetTop;
      // console.log(offsetTop)
    },
    custom() {
      this.isdisplay = false;
      this.isshow = !this.isshow;
      console.log(this.$refs.up_custom);
      //  this.ancientChinesePoetry.push()
    },
    listAssign(arrA, arrB) {
      Object.keys(arrA).forEach((key) => {
        arrA[key] = arrB[key];
      });
    },
    onSubmit(val) {
      if (val === "replace") {
        this.ancientChinesePoetry = [];
        this.ancientChinesePoetry.push(this.custom_list);
      } else if (val === "join") {
        this.ancientChinesePoetry.push(this.custom_list);
      }
      this.custom_list = {
        up: "",
        down: "",
      };
    },
    // handleScroll(e){      var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;      // 执行代码
    // console.log(scrollTop)
    // }
    //    scroll(e){
    //     //滚动的像素+容器的高度>可滚动的总高度-100像素
    //     if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
    //       this.loadMore();    //加载更多
    //     }
    //   },
    //   handleScroll () {
    //   if (!this.$refs.categoryTable) {
    //     return;
    //   }
    //   let offsetTop = this.$refs.categoryTable.$el.getBoundingClientRect().top;
    //   console.log(offsetTop)
    //   if (offsetTop < 160) {
    //     this.isFixed = true;
    //   } else {
    //     this.isFixed = false;
    //   }
    // }
    // ————————————————
    // 版权声明：本文为CSDN博主「溱rr洧」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/qq_32375417/article/details/84875026
    // getchildhiegt(){
    //       console.dir(this.$refs.childheight)
    // }
  },
  created() {
    //   let _this=this;
    //     //   this.chtml();
    //   window.getanimation=_this.getanimation;
    //   window.come=_this.come;
    // console.log(this.$ref.height)
  },
  mounted() {
    // this.chtml();
    // this.getchildhiegt();
    window.addEventListener("scroll", this.handleScroll, true);
    //  window.addEventListener('scroll', this.handleScroll, true);
    //  document.querySelector("Couplet").addEventListener('scroll',this.handleScroll)
  },
  computed: {
    //    myrandomfuntion(){
    //     //    console.log(Math.round(Math.random()*10-Math.abs((10-(this.ancientChinesePoetry.length)))))
    //     //    return Math.round(Math.random()*(this.ancientChinesePoetry.length))
    //                console.log(Math.floor(Math.random()*this.ancientChinesePoetry.length))
    //         return this.myrandom=Math.floor(Math.random()*this.ancientChinesePoetry.length)
    //    }
  },
};
</script>

<style  lang="less" scoped>
@import "../../assets/css/fw.css";
.v_modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 99999;
}
// .Couplet {
// margin-top: 0;
// opacity: .5;
// position: relative;
// border-radius: 5%;
// width: 990px;
// }
.main_box {
  margin-top: 0;
  // opacity: .5;
  position: relative;
  .Floating_window {
    // padding-top: 60px;
    // right: 0;
    padding-top: 10px;
    position: absolute;
    // position: fixed;
    // top: 60px;
    // display: block;
    width: 100%;
    // margin-left: 19px;
    height: 100%;
    // background-color:rgba(0, 0, 0, 0.5);

    //   z-index: 100001;
    // display: none;;
    //   opacity: 0.8;
    // background-color: #fff;
    .middle {
      //  position: relative;
      display: block;
      //  height: 100%;
      width: 100%;
      height: 100%;
      .The_nUiom,
      .next_link {
        width: 50%;
        position: absolute;
        right: 0;

        width: 20px;
        min-height: 388px;
        //  line-height: 24px;
        font-family: cursive;
        font-weight: 700;
        font-size: 22px;
        text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
        //   border: 1px solid #000;
        z-index: 9999999;
        //   background-color: #fff;
      }
      .The_nUiom {
        left: 4%;
      }
      .next_link {
        left: 11%;
        animation-delay: 0.5s;
      }
      .custom_input {
        // width: 120px;
        max-width: 17%;
        // margin-top: 20px;
        // min-width: 12.5%;
        //         .el-form-item__label {
        //   width: 100px;
        // }
      }
    }
  }
}

// :root {
//   --animate-delay: .5s;
// }
</style>