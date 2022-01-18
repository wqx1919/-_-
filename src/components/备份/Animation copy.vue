<template>
  <!-- <transition-group > -->
  <div class="box" key="3">
    <div class="left swing-in-left-bc fade-out-fwd" key="1">
      <p class="slide-in-fwd-top" key=1>清</p>
            <p class="slide-in-fwd-top" key=2>风</p>
      <p class="slide-in-fwd-top" key=3>不</p>
      <p class="slide-in-fwd-top" key=4>识</p>
      <p class="slide-in-fwd-top" key=5>字</p>

    </div>
    <div class="right swing-in-right-bck fade-out-fwd2" key="2">
      <v-for></v-for>
      <p class="slide-in-fwd-top2">何故乱翻书</p>
    </div>
  </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
  name: "Animation",
  data(){
    return{
      word:["清","风","不","识","字"]
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/animista.css";
// span{

.box {
  width: 100%;
  height: 100%;
  height: 1000px;
  display: flex;
  justify-content: space-between;
  z-index: 99999999;
  color: orange;
  font-weight: 700;
  font-family: cursive;
  font-size: 20px;
  // background-color: red;
  .left,
  .right {
    padding: 100px 200px;
    width: 50%;
    height: 100%;
    background: url("../../public/img/pexels-pixabay-235985.jpg")
      no-repeat;
    background-size: contain;
  }
  .left {
  }
  .right {
  }
}
// }
</style>