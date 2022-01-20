<template>
<div class="version_heart pannel Debug">
  <el-form ref="form" :model="form" label-width="80px" style="width:100%" >
    <el-form-item label="背景颜色">
      <colorPicker  v-model="form[0].val"></colorPicker>
      <!-- <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker></olorPicker> -->
    </el-form-item>
    <el-form-item label="主背景颜色">
      <colorPicker v-model="form[1].val"></colorPicker>
    </el-form-item>
    <el-form-item label="字体颜色">
      <colorPicker v-model="form[2].val"></colorPicker>
    </el-form-item>
    <el-form-item label="导航选中">
      <colorPicker v-model="form[3].val"></colorPicker>
    </el-form-item>
    <el-form-item label="导航颜色">
      <colorPicker v-model="form[4].val"></colorPicker>
    </el-form-item>
    <el-form-item label="导航鼠标悬浮颜色">
      <colorPicker v-model="form[5].val"></colorPicker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: "Debug_color",
  data() {
    return {
        form:[
             
          {style:"--theme_backgroun_colorc",
          val: "#fff",
        },
        
          {
           style:"--theme",
            val: "#e8ebf0"
          },
        
       {style:"--defaultcolor",
        val:"#333"
        },
        
          {style:
        "--el-menu--horizontal",val:"#909399"
        },
        
          {
              style:
        "--el-menu-item-hover",
        val: "#ecf5ff"
        },
        
        {
         style:"--White-to-grey",
         val:"#fff"
        },
        ]
        //           theme_backgroun_colorc={style:"--theme_backgroun_colorc",
        //   val: "#fff",
        // },
        
        //   theme={
        //    style:"--theme",
        //     val: "#e8ebf0"
        //   },
        
        // defaultcolor={style:"--defaultcolor",
        // val:"#333"
        // },
        
        //   el_menu_horizontal={style:
        // "--el-menu--horizontal",val:"#909399"
        // },
        
        //   el_menu_item_hover={
        //       style:
        // "--el-menu-item-hover",
        // val: "#ecf5ff"
        // },
        
        //   White_to_grey={
        //  style:"--White-to-grey",
        //  val:"#fff"
        // },
    //   form: {
    //     theme_backgroun_colorc: "--theme_backgroun_colorc",
    //     val: "#fff",
    //     theme: "--theme",
    //     val: "#e8ebf0",
    //     defaultcolor: "--defaultcolor",
    //     val: "#333",
    //     el_menu_horizontal_active: "--el-menu--horizontal-active",
    //     val: "#303133",
    //     el_menu_horizontal: "--el-menu--horizontal",
    //     val: "#909399",
    //     el_menu_item_hover: "--el-menu-item-hover",
    //     val: "#ecf5ff",
    //     White_to_grey: "--White-to-grey",
    //     val: "#fff",
    //   },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.Debug{
    width: 25%;
}
.el-form{
    display: flex;
    justify-content: space-evenly;
}
.m-colorPicker{
    border: 1px solid #000;
}
</style>