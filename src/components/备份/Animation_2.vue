<template>
  <div class="box" >
    <transition-group style="width:50%"
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInLeftBig"
      leave-active-class="animate__rotateOutUpLeft"
    >
      <div class="left" v-show="isshow"  key="1">
        <transition-group
          appear
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInDown animate__delay-2s"
          leave-active-class="animate__backOutUp"
        >
        <!-- <p v-for="(p,index) in word" :key="index">
        {{p}}-{{index}}  
        </p> -->
        <p key="1">清风不识字</p>
       </transition-group>
      </div>
     </transition-group>
    <transition-group style="width:50%;marght-left:50%"
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__rotateOutUpRight"
    >
      <div class="right" key="2" v-show="isshow">
        <transition-group
          appear
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInDown animate__delay-2s"
          leave-active-class="animate__backOutUp"
        >
          <p key="1" v-show="isshow">何故乱翻书</p>
        </transition-group>
      </div>
    </transition-group>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Animation",
  data(){
      return{
        isshow:true,
      word:["清","风","不","识","字"]
    }
  
      
  },
  methods:{
      out_l(){
          setTimeout(()=>{
               this.isshow=false
            // console.log(this.isshow+"2s")

          },3500)
        //   console.log(this.isshow)
      }
  },
  mounted() {
      this.out_l();
  }
};
</script>

<style lang="less" scoped>
h1 {
  mask-type: 100px;
  background-color: orange;
}
.box {
  width: 100%;
//   height: 100%;
//   height: 1000px;
  display: flex;
  justify-content: space-between;
  //   z-index: 99999999;
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
    background: url("../../public/img/pexels-pixabay-235985.jpg") no-repeat;
    background-size: contain;
    p{
        width: 20px;
    }
  }
  .left {
  }
  .right {
  }
}
</style>