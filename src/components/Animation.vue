<template>
  <!-- <transition-group > -->
  <div class="box"  style="height:100%">
    <div class="left swing-in-left-bck" >
        <p class="slide-in-fwd-top">清风不识字</p>
    </div>
    <div class="right swing-in-right-bck" >
      <p class="slide-in-fwd-top2">何故乱翻书</p>
    </div>
    <div class="close" @click="getshou">
     <i class="iconfont icon-guanbi1"></i>
    </div>
  </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
  name: "Animation",
  data(){
    return{
    isshow:true

    }
  },
 methods:{
    getshou(){
         this.isshow=false
         this.$bus.$emit('getshou',this.isshow)
    }
 },

  // data(){
  //   return{
  //     word:["清","风","不","识","字"],
  //    isshow:true
  //   }
  // },

  // methods:{
  //     out_l(){
  //         setTimeout(()=>{
  //              this.isshow=false
  //             console.log(this.isshow+"2s")

  //         },5900)
  //         console.log(this.isshow)
  //     }
  // },
  //   mounted() {
  //     this.out_l();
  // }
};
</script>

<style lang="less" scoped>
@import "../assets/css/animista.css";
// span{

.box {
  width: 100%;
  height: 100%;
  // height: 1000px;
  display: flex;
  // justify-content: space-between;
  // z-index: 99999999;
  // color: orange;

  font-weight: 700;
  font-family: cursive;
  font-size: 66px;
  justify-content: space-evenly;
  text-align: center;
  // position:relative;
  // top: 0;
  // background-color: red;
  .left,
  .right {
    // padding: 100px 200px;
    width: 50%;
    height: 100%;
    //  position:fixed;
      background: url("../../public/img/pexels-pixabay-235985.jpg") 
      no-repeat;
    // position: absolute;
    background-size: cover;
    p{
       position: absolute;
       left: 30%;
      width: 20px;
      height: 50%;
      text-align: center;
    }
  }
  .left {
  //  left: 33%;
   p{
   left: 66%;

   }
  }
  .right {
     background-position: right 0;
    p{
             left: 33%;
    }
      //  left: 66%;
  }
  .close{
    position: absolute;
    right: 52px;
    top: 52px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    // height: 100%;
    font-size:16px;
    z-index: 99999;
    i{
      // width: 100%;
      //  display: block;
      font-size: 30px;
    }
    &:hover{
      // border-radius: 50%;
    //  background-color: #fff;
    //  border: 1px solid #000;
    //  opacity: 0.5;
    // ;
     color: red;
        //  line-height: 44px;

      // font-size: 44px;
    }
  }
}
// }
</style>