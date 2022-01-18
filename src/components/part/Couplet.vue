<template>
  <div class="main_box " :class="v_modal">
    <!-- <div class="Floating_window" :style="{ display: isdisplay }"> -->
    <div class="Floating_window">
      <transition-group
        class="middle"
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInDown"
        leave-active-class="animate__backOutUp"
      >
        <div class="The_nUiom left" key="1" v-show="isdisplay">
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
      </transition-group>
    </div>
    <div class="_th-container">
      <div class="_th-click-hover _item-input" @click="getanimation">
        点我动画<span class="iconfont icon-pendant"></span>
      </div>
      <div class="_th-item _item-x2">&gt;</div>
      <div class="_th-item _item-x-2">&lt;</div>
      <div class="_th-item _item-xx2">&gt;&gt;</div>
      <div class="_th-item _item-xx-2">&lt;&lt;</div>
      <div class="_th-item _item-reset">O</div>
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
    };
  },
  methods: {
    getanimation() {
      //   this.isdisplay == "none" ? this.isdisplay="block" : this.isdisplay="none" ;
      this.isdisplay = !this.isdisplay;
      this.myrandom = Math.floor(
        Math.random() * this.ancientChinesePoetry.length
      );
      console.log(Math.floor(Math.random() * this.ancientChinesePoetry.length));
      //    document.body.style("bacc")
            //   this.v_modal == "nonv_modale" ? this.v_modal="" : this.isdisplay="none" ;

    //   this.v_modal = "v_modal";
    },
  },
  created() {
    //   let _this=this;
    //     //   this.chtml();
    //   window.getanimation=_this.getanimation;
    //   window.come=_this.come;
  },
  mounted() {
    // this.chtml();
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
@import '../../assets/css/fw.css';
.v_modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 99999;
}
.main_box{
.Floating_window {
  padding-top: 60px;
  position: absolute;
  // display: block;
  width: 100%;
  height: 100%;
//   z-index: 100001;
  // display: none;;
//   opacity: 0.8;
// background-color: #fff;
   .The_nUiom, 
   .next_link {
    width: 50%;
    position: absolute;
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
      left: 33%;
  }
  .next_link  {
    left:66%;
    animation-delay:0.5s;
  }
  
}}

// :root {
//   --animate-delay: .5s;
// }
</style>