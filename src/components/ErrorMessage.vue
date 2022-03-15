<template>
  <div class="pannel ErrorMessage">
      出错了{{message}}未找到
  </div>
</template>

<script>
export default {
  name:"ErrorMessage",
  data(){
      return{
          message:""
      }
  },
  mounted(){
     this.message = this.$route.query.message
  }
}
</script>

<style>
  .ErrorMessage{
      margin-top: 50px;
      /* /* height: 600px; */
      width: 100%;
  }
</style>