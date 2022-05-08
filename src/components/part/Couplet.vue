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
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Couplet",
  data() {
    return {
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
    //获取动画
    getanimation() {
      this.isshow == true ? (this.isshow = false) : this.isshow;
      this.isdisplay = !this.isdisplay;
      //Match是数学函数，floor为向下取整
      this.myrandom = Math.floor(
        // Math.random函数返回一个浮点数,  伪随机数在范围从0到小于1
        Math.random() * this.ancientChinesePoetry.length
      );
      if (this.isdisplay === true) {
        this.childheight = this.temp;
      } else {
        this.temp = this.$refs.childheight.offsetHeight;
        this.childheight = 0;
        this.$refs.bacc.style = "background-color:''";
      }
    },
    //此法舍去
    scrollEvent() {
      let _this = this;
      let read = _this.$el.querySelector("#read");
      // console.log(read.scrollToTop);
    },
    //滚动事件之后做什么
    handleScroll() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop >= 10) {
        this.isfixed.position = "sticky";

        this.isfixed.top = "60px";
        this.isfixed.width = "100%";
      } else {
        this.isfixed.position = "";
        this.isfixed.top = "";
        this.isfixed.top = "";
      }
    },
    //自定义开启、关闭
    custom() {
      this.isdisplay = false;
      this.isshow = !this.isshow;
    },
    //合并数组-未用到
    listAssign(arrA, arrB) {
      Object.keys(arrA).forEach((key) => {
        arrA[key] = arrB[key];
      });
    },
    //提交
    onSubmit(val) {
      if (val === "replace") {
        this.ancientChinesePoetry = [];
        this.ancientChinesePoetry.push(this.custom_list);
      } else if (val === "join") {
        this.ancientChinesePoetry.push(this.custom_list);
      }
      //重置表单
      this.custom_list = {
        up: "",
        down: "",
      };
      //切换状态
      this.isdisplay = !this.isdisplay;
      this.isshow = !this.isshow;
    },
  },
  mounted() {
    //监听滚动事件
    window.addEventListener("scroll", this.handleScroll, true);
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
.main_box {
  margin-top: 0;
  // opacity: .5;
  position: relative;
  .Floating_window {
    padding-top: 10px;
    position: absolute;

    width: 100%;
    height: 100%;
    .middle {
      //  position: relative;
      display: block;
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
        z-index: 9999999;
      }
      .The_nUiom {
        left: 4%;
      }
      .next_link {
        left: 11%;
        animation-delay: 0.5s;
      }
      .custom_input {
        max-width: 17%;
      }
    }
  }
}
</style>