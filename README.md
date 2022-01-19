# -_-
# wu-
一些问题
2022年1月11日19点49分
我遇到的第一个问题的理解就是vue，没有好
怎么弄显示内容，然后我在app.vue里面不先跳转路由
<router-link active-class="active" to="/register">Register</router-link>
只写展示
<router-view></router-view>
一切都完美了
2022年1月11日19点51分
可以用v-if来然后导航的选项是否显示注册和登录
2022年1月12日10点45分
图标字体无法引入；
解决办法：在css @import './font/iconfont.css';
上午的问题
回到顶部无法显示
解决办法：
  <el-backtop 
    :target=idname
    :bottom="100" 
    :visibility-height="1">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>
  注意点：其中target是默认没有v-bing 事件的，只不过我是把它分成了组件次在后面传值过来要用到的
  说到这个传值我就忘记了要加v-bing 也就是：s  
  r2022年1月13日16点42分

正则：https://juejin.cn/post/6844904048194224135
标签内匹配举例:
/<iframe(([\s\S])*?)<\/iframe>/
复制代码
这里我匹配的是iframe标签及内容，若要匹配其他标签就替换就可以了； 还可以匹配指定属性的html标签
const regbody = / < img  src = "\/\/bookcover\.yuewen\.com\/qdbimg\/.*" > /
起点匹配封面
  2022年1月14日14点35分
书名——封面用api能完成了，希望这个api能坚持到我身边答辩的那一刻2022年1月14日21点08分
。。。我特殊论了，elem的主题我用不了 2022年1月15日20点16分
说一下那个：
我起因是为了用ele的主题然后发现安装不了就百度，查到要一写前置条件，发现还是装不了。然后查到右更换node办不办10-12.0.0 这样我的是16，所谓下nvm，node版本管理，没想到还是不行，然后查到css可以用变量（早就查到了就图省事，选择了用主题。。。我的错），然后想到用vue-3可以传递参数到style，。。，接下来ele-ui不能用了，百度了要变成ele-puls，好吧，那就更吧，没想到这个更新的太多内容，连下拉框都改了，哎

2022年1月16日11点25分
color:inherit;继承父样式 2022年1月16日21点09分
https://github.com/wqx1919/-_-/edit/main/README.md 更新到这边
我作业发生了一个愚蠢的错误，把less文件运行了，然后覆盖了css文件（pannel。css）也就是说我白写了css，然后只能凭借记忆来修复了，经过这件事，我用了vscode查看历史记录的来辅助已经现在学着用git来同步。。。
今天做客换符的格式化（就是写个构造函数，然后不断 push到数组里面），然后遍历循环跟换换肤的css3v变量
o 对了今天那个postion：flexed 一直抖动，我用sticky属性 来解决
哎，总之那个覆盖我真的是没想到。。。
2022年1月19日20点32分
