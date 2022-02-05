<template>
  <div class="multistage">
  <div v-if="children != null" class="comments">
    <div class="comment" v-for="subArticleComment in children" :key="subArticleComment.id">
      <a class="avatar">
        <img :src="imgSrc" alt="头像">
      </a>
      <div class="content">
        <a class="author">{{subArticleComment.from_user_account}}</a>
        <div class="metadata">
          <!-- <span class="date">{{subArticleComment.createByStr}}</span> -->
          <span> 2022年2月5日15点16分 </span>
        </div>
        <div class="text">{{subArticleComment.content}} </div>
        <div class="actions">
          <a class="reply">回复</a>
        </div>
      </div>
      <multistage :children="subArticleComment.children"/>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'multistage',
  props: ['children'],
  data () {
    return {
         imgSrc: require( "../../../public/img/noavatar.png"),
    }
  }
}
</script>

<style scoped>

</style>

