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

。。。无语没设置好app的高度
html,body,#app{
    height: 100%;
}
这是因为我要监听属性
2022年1月20日20点34分
使用position 定位时，要注意
子元素使用 %，切记父元素要有值！！！ 不为0x0
2022年1月20日23点42分

  if(localStorage.getItem('Animation')!='true'){ //其他页面刷新没有开屏动画
      // @@@ 字符串的形式存储在localStorage
        // alert(localStorage.getItem('Animation'))
        // alert("111")
       this.isshow =false
      }else{
       this.isshow =true
      }
      2022年1月26日11点18分

刚才查到吓尿我了。。 git还是好用啊 把丢失的数据找回了
js 对象。传递参数会直接传递值过去。
得先把它转成数字符串，然后再把它转成对象，这样就变成一个全新的
多表查询左链接 
同步axios 发送请求
数据最好在服务端处理完毕，直接发给客户端，这个调适也比较方便
2021-1月28日22:28
对了评论是用嵌套递归来实现的，在vue里面体现为组件的递归
评论课堂用函数转换成一个数结构（数组转树）
        for(let element=0;element<comment_results.length;element++){
          tree.push(totree(comment_results[element].id,reply_results))
          if(tree[element])
          comment_results[element].children = tree[element] //子元素变成数组@@ []会导致结构不一
        }
2022年1月30日19点17分

        getBoundingClientRect ( ) 返回值：对象 有6个属性
// left（元素左侧相对于可视区左上角的距离）
// right（元素右侧相对于可视区左上角的距离）
// top（元素上边相对于可视区左上角的距离）
// bottom（元素下边相对于可视区左上角的距离）
// width（可视宽度）
// height（可视高度）
滚动
2022年2月5日19点33分
方法1：
//先获取目标位置距离
mounted() {
  this.$nextTick(() => {
     setTimeout(() => {
        let targetbox= document.getElementById('targetbox');
        this.target= targetbox.offsetTop;        
   })
  })
}
//再滑动指定距离
document.body.scrollTop = this.target;
方法2：
this.$nextTick(() => {
     this.$refs.DOM.scrollTo(0,200);
})
方法3：
document.getElementById("target").scrollIntoView();
————————————————
版权声明：本文为CSDN博主「KWMax」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yaojie5519/article/details/104503278
        // @@不能用offset ,因为offset是距离最近定位的距离
//         getBoundingClientRect ( ) 返回值：对象 有6个属性
// left（元素左侧相对于可视区左上角的距离）
// right（元素右侧相对于可视区左上角的距离）
// top（元素上边相对于可视区左上角的距离）
// bottom（元素下边相对于可视区左上角的距离）
// width（可视宽度）
// height（可视高度）
2022年2月5日19点40分
 this.$nextTick(()=>{
        document.querySelector('#input_txt').scrollIntoView()
        window.scrollTo(0,window.scrollY-300) //导航遮掩 
        }
        网页可见区域宽： document.body.clientWidth;

网页可见区域高： document.body.clientHeight;

网页可见区域宽： document.body.offsetWidth(包括边线的宽);

网页可见区域高： document.body.offsetHeight(包括边线的宽);

网页正文全文宽： document.body.scrollWidth;

网页正文全文高： document.body.scrollHeight;

网页被卷去的高： document.body.scrollTop;

网页被卷去的左： document.body.scrollLeft;

网页正文部分上： window.screenTop;

网页正文部分左： window.screenLeft;

屏幕分辨率的高： window.screen.height;

屏幕分辨率的宽： window.screen.width;

屏幕可用工作区高度： window.screen.availHeight;

屏幕可用工作区宽度：window.screen.availWidth;

scrollHeight: 获取对象的滚动高度。

scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离

scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离

scrollWidth:获取对象的滚动宽度

offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度

offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置

offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置

event.clientX 相对文档的水平座标

event.clientY 相对文档的垂直座标

event.offsetX 相对容器的水平坐标

event.offsetY 相对容器的垂直坐标

document.documentElement.scrollTop 垂直方向滚动的值

event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量

要获取当前页面的滚动条纵坐标位置，用：

document.documentElement.scrollTop;

而不是：

document.body.scrollTop;
2022年2月5日19点44分
爸爸的爸爸叫爷爷
      //     console.log(this.$refs.status[index]) // 我是子组件的数据
      //  }
      this.$refs.status[0].$parent.$parent.$data.more2 =  this.more
      2022年2月9日14点29分
