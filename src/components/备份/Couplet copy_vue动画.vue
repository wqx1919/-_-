<template>
  <div class="main_box">
    <!-- <div class="Floating_window" :style="{ display: isdisplay }"> -->
    <div class="Floating_window"  >
     <transition-group 
          appear
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInDown"
          leave-active-class="animate__backOutUp"
    >
      <div class="The_nUiom left"  key="1">
        <!-- <p>上联</p> -->
        <p v-show="isdisplay">旧书不厌百回读</p>
        <!-- <p key="1">清风不识字</p> -->
      </div>
      <div class="next_link right" key="2">
        <!-- <p>下联</p>  -->
        <p v-show="isdisplay">熟读深思子自知</p>
      </div>
    </transition-group>

    </div>
    <div class="_th-container" >
          <div class="_th-click-hover _item-input" @click="isdisplay=!isdisplay">
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
    isdisplay:false
    };
  },
  methods: {
    // getanimation() {
    // //   this.isdisplay == "none" ? this.isdisplay="block" : this.isdisplay="none" ;
    //      this.isdisplay=!this.isdisplay
    // },
  },
  created(){
    //   let _this=this;
    //     //   this.chtml();
    //   window.getanimation=_this.getanimation;
    //   window.come=_this.come;
  },
  mounted() {
    // this.chtml();
  },
};
</script>

<style  lang="less" scoped>
@import '../../assets/css/fw.css';
.Floating_window {
  padding-top: 60px;
  position: absolute;
  // display: block;
  width: 100%;
  z-index: 99999;
  // display: none;
  .The_nUiom,
  .next_link {
    width: 50%;
    position: absolute;
    p {
      position: absolute;
      width: 20px;
      height: 50%;
    }
  }
  .The_nUiom {
    //   left: 66%;
    p {
      left: 66%;
    }
  }
  .next_link p {
    // left: 33%;
    left: 99%;
  }
}

</style>