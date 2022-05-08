<template>
  <!-- <transition-group > -->
  <div class="box" style="height: 100%">
    <div class="left swing-in-left-bck">
      <p class="slide-in-fwd-top">清风不识字</p>
    </div>
    <div class="right swing-in-right-bck">
      <p class="slide-in-fwd-top2">何故乱翻书</p>
    </div>
    <div class="close" @click="getshow">
      <i class="iconfont icon-guanbi1"></i>
    </div>
  </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
  name: "Animation",
  data() {
    return {
      isshow: true,
    };
  },
  methods: {
    getshow() {
      this.isshow = false;
      this.$bus.$emit("getshow", this.isshow);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/animista.css";
.box {
  width: 100%;
  height: 100%;
  // height: 1000px;
  display: flex;
  font-weight: 700;
  font-family: cursive;
  font-size: 66px;
  justify-content: space-evenly;
  text-align: center;

  .left,
  .right {
    // padding: 100px 200px;
    width: 50%;
    height: 100%;
    //  position:fixed;
    background: url("../../public/img/pexels-pixabay-235985.jpg") no-repeat;
    // position: absolute;
    background-size: cover;
    p {
      position: absolute;
      left: 30%;
      width: 20px;
      height: 50%;
      text-align: center;
    }
  }
  .left {
    p {
      left: 66%;
    }
  }
  .right {
    background-position: right 0;
    p {
      left: 33%;
    }
    //  left: 66%;
  }
  .close {
    position: absolute;
    right: 52px;
    top: 52px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    // height: 100%;
    font-size: 16px;
    z-index: 99999;
    i {
      font-size: 30px;
    }
    &:hover {
      color: red;
    }
  }
}
// }
</style>