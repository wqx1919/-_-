<template>
  <div class="ui threaded comments" ref="comment_header">
    <multistage
      style="width: 100%"
      ref="status"
      :children="reply"
      :oindex="index"
      :more_ex_progs="more"
    />
  </div>
</template>

<script>
import multistage from "./Multistage";
export default {
  name: "ReplyDetail",
  data() {
    return {
      reply: [],
      index: 0,
      more: "",
    };
  },
  components: { multistage },
  watch: {
    $route: {
      immediate: true, //初始化时让handler调用一下
      deep: true, //深度监视
      handler(newValue) {
        (this.reply = newValue.query.replyData),
          (this.index = newValue.query.oindex),
          (this.more = newValue.more_ex_progs);
        console.log("000");
      },
    },
  },
};
</script>