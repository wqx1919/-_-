<template>
  <div class="Floating_window">
    <p>动画</p>
    <span class="iconfont icon-pendant"></span>
  </div>
</template>

<script>
export default {
  name: "Couplet",
  methods: {
    chtml() {
      var style =
        "._th-container ._th-item{margin-bottom:3px;position:relative;width:0;height:0;cursor:pointer;opacity:.3;background-color:aquamarine;border-radius:100%;text-align:center;line-height:30px;-webkit-transition:all .35s;-o-transition:all .35s;transition:all .35s;right:30px}._th-container ._th-item,._th-container ._th-click-hover,._th_cover-all-show-times ._th_times{-webkit-box-shadow:-3px 4px 12px -5px black;box-shadow:-3px 4px 12px -5px black}._th-container:hover ._th-item._item-x2{margin-left:18px;width:40px;height:40px;line-height:40px}._th-container:hover ._th-item._item-x-2{margin-left:17px;width:38px;height:38px;line-height:38px}._th-container:hover ._th-item._item-xx2{width:36px;height:36px;margin-left:16px;line-height:36px}._th-container:hover ._th-item._item-xx-2{width:32px;height:32px;line-height:32px;margin-left:14px}._th-container:hover ._th-item._item-reset{width:30px;line-height:30px;height:30px;margin-left:10px}._th-click-hover{position:relative;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;height:45px;width:45px;cursor:pointer;opacity:.3;border-radius:100%;background-color:aquamarine;text-align:center;line-height:45px;right:0}._th-container:hover{left:-5px}._th-container{font-size:12px;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;left:-35px;top:20%;position:fixed;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:100000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-bottom:3px;}._th-container ._th-item:hover{opacity:.8;background-color:#5fb492;color:aliceblue}._th-container ._th-item:active{opacity:.9;background-color:#1b3a26;color:aliceblue}._th-container:hover ._th-click-hover{opacity:.8}._th-container:hover ._th-item{opacity:.6;right:0}._th-container ._th-click-hover:hover{opacity:.8;width:100px;border-radius:50px;background-color:#5fb492;color:aliceblue}";

      // var displayNum = (1 / timerContext._percentage).toFixed(2);
      var displayNum = "点我动画";

      // 在页面左边添加一个半圆便于修改
      var html =
        '<div class="_th-container">\n' +
        '    <div class="_th-click-hover _item-input">\n' +
        "        x" +
        displayNum +
        "\n" +
        "    </div>\n" +
        '    <div class="_th-item _item-x2">&gt;</div>\n' +
        '    <div class="_th-item _item-x-2">&lt;</div>\n' +
        '    <div class="_th-item _item-xx2">&gt;&gt;</div>\n' +
        '    <div class="_th-item _item-xx-2">&lt;&lt;</div>\n' +
        '    <div class="_th-item _item-reset">O</div>\n' +
        "</div>\n";
      var stylenode = document.createElement("style");
      stylenode.setAttribute("type", "text/css");
      if (stylenode.styleSheet) {
        // IE
        stylenode.styleSheet.cssText = style;
      } else {
        // w3c
        var cssText = document.createTextNode(style);
        stylenode.appendChild(cssText);
      }
      var node = document.createElement("div");
      node.innerHTML = html;
      document.head.appendChild(stylenode);
      document.body.appendChild(node);
    },
  },
  mounted() {
    this.chtml();
  },
};
</script>

<style  lang="less" scoped>
// .Floating_window {
//   width: 100px;
//   height: 20px;
//   margin-bottom: 3px;
//   position: relative;
//   width: 0;
//   height: 0;
//   cursor: pointer;
//   opacity: 0.3;
//   background-color: aquamarine;
//   border-radius: 100%;
//   text-align: center;
//   line-height: 30px;
//   -webkit-transition: all 0.35s;
//   -o-transition: all 0.35s;
//   transition: all 0.35s;
//   right: 30px;
// }
// ._th-container ._th-item,
// ._th-container ._th-click-hover,
// ._th_cover-all-show-times ._th_times {
//   -webkit-box-shadow: -3px 4px 12px -5px black;
//   box-shadow: -3px 4px 12px -5px black;
// }
// ._th-container:hover ._th-item._item-x2 {
//   margin-left: 18px;
//   width: 40px;
//   height: 40px;
//   line-height: 40px;
// }
// ._th-container:hover ._th-item._item-x-2 {
//   margin-left: 17px;
//   width: 38px;
//   height: 38px;
//   line-height: 38px;
// }
// ._th-container:hover ._th-item._item-xx2 {
//   width: 36px;
//   height: 36px;
//   margin-left: 16px;
//   line-height: 36px;
// }
// ._th-container:hover ._th-item._item-xx-2 {
//   width: 32px;
//   height: 32px;
//   line-height: 32px;
//   margin-left: 14px;
// }
// ._th-container:hover ._th-item._item-reset {
//   width: 30px;
//   line-height: 30px;
//   height: 30px;
//   margin-left: 10px;
// }
// ._th-click-hover {
//   position: relative;
//   -webkit-transition: all 0.5s;
//   -o-transition: all 0.5s;
//   transition: all 0.5s;
//   height: 45px;
//   width: 45px;
//   cursor: pointer;
//   opacity: 0.3;
//   border-radius: 100%;
//   background-color: aquamarine;
//   text-align: center;
//   line-height: 45px;
//   right: 0;
// }
// ._th-container:hover {
//   left: -5px;
// }
// ._th-container {
//   font-size: 12px;
//   -webkit-transition: all 0.5s;
//   -o-transition: all 0.5s;
//   transition: all 0.5s;
//   left: -35px;
//   top: 20%;
//   position: fixed;
//   -webkit-box-sizing: border-box;
//   box-sizing: border-box;
//   z-index: 100000;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }
// ._th-container ._th-item:hover {
//   opacity: 0.8;
//   background-color: #5fb492;
//   color: aliceblue;
// }
// ._th-container ._th-item:active {
//   opacity: 0.9;
//   background-color: #1b3a26;
//   color: aliceblue;
// }
// ._th-container:hover ._th-click-hover {
//   opacity: 0.8;
// }
// ._th-container:hover ._th-item {
//   opacity: 0.6;
//   right: 0;
// }
// ._th-container ._th-click-hover:hover {
//   opacity: 0.8;
//   background-color: #5fb492;
//   color: aliceblue;
// }
// ._th_cover-all-show-times {
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 99999;
//   opacity: 1;
//   font-weight: 900;
//   font-size: 30px;
//   color: #4f4f4f;
//   background-color: rgba(0, 0, 0, 0.1);
// }
// ._th_cover-all-show-times._th_hidden {
//   z-index: -99999;
//   opacity: 0;
//   -webkit-transition: 1s all;
//   -o-transition: 1s all;
//   transition: 1s all;
// }
// ._th_cover-all-show-times ._th_times {
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   background-color: rgba(127, 255, 212, 0.51);
//   text-align: center;
//   line-height: 300px;
//   position: absolute;
//   top: 50%;
//   right: 50%;
//   margin-top: -150px;
//   margin-right: -150px;
// }
</style>