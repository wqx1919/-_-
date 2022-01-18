<template>
  <div class="main version_heart">
    <div class="tltle pannel">
      <el-image
        class="pic"
        style="width: 100px; height: 100px"
        :src="url"
        :preview-src-list="srcList"
      >
      </el-image>
      <!-- :src="require('../../public/img/头像数据.png')"
        :src="require(url)" -->
      <!-- <img src="../../public/img/头像数据.png" alt=""> -->

      <!-- <div class="pic">
        <img src="../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg" alt="">
                <img src="../../public/img/头像数据.png" alt="">
      </div> -->
      <div class="left">
        <div class="top">
          <h2>书名xxxxxxxx</h2>
          <div>+ 3274</div>
        </div>
        <div class="info">
          <a>12345</a><span>粉丝</span> <a>1762345</a><span>主题</span>
        </div>
      </div>

      <div class="right">
        <el-button type="primary" round class="pay_attention_to">
          <i class="iconfont icon-zengjia iconfontstly"></i>

          关注</el-button
        >
        <el-button type="primary" round class="pay_attention_to">
          <i class="iconfont icon-bianji-icon iconfontstly"></i>
          发表帖子</el-button
        >
      </div>
    </div>
    <div class="topic pannel">
      <div class="content">
        <ul>
          <li>评论</li>
          <li>评论</li>
          <li>评论</li>
          <li>评论</li>
          <li>评论</li>
          <li>评论</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script  scoped>
import axios from "axios";

export default {
  name: "Topic",
  data() {
    return {
      // src:"require('./aa.jpg')",
      // src:require('../../public/img/头像数据.png'),
      url: require("../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg"),
      // url: '../../public/img/头像数据.png',
      srcList: [
        require("../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg"),
      ],
      keyWord: "斗破苍穹",
      bookininfo:[
        imgUrl,
        lastTime,
        site,
        desc
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
          var pa = new  URLSearchParams();
      // https://www.qidian.com//search?kw=斗破苍穹
      // https://www.qidian.com/search?kw=%E8%8B%9F%E5%9C%A8%E7%A5%9E%E8%AF%A1%E4%B8%96%E7%95%8C
            //  axios.get("/api/search?kw=%E8%8B%9F%E5%9C%A8%E7%A5%9E%E8%AF%A1%E4%B8%96%E7%95%8C",{headers:{"Content-Type" : "application/json"}}).then(
      //  axios.get("/api").then(
      // axios.get("/api3/rank/info/?rankid=23784&page=1&json=true").then(
      // ,{headers:{"Content-Type":"text/html;charset=utf-8"}}).then(
        // axios.get("/api2/s?ie=utf-8&f=8&rsv_bp=1&tn=88093251_10_hao_pg&wd=%E7%99%BE%E5%BA%A6%E6%90%9C%E7%B4%A2api&oq=%25E4%25BD%25A0%25E5%25A5%25BD&rsv_pq=c9f179fa0001488a&rsv_t=25e7bxH%2B%2BCsFBTGwoJ1o5NByIqkFuR2suRhYIv5RW3uEUa7yC%2BYw0mLqcfWpYVOmuhDZzKHbFHNA&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=17&rsv_sug1=15&rsv_sug7=100&rsv_sug2=0&rsv_btype=t&inputT=5341&rsv_sug4=5341").then(
        // https://www.baidu.com/
              //  axios.get("http://127.0.0.1:8002/api",this.keyWord).then(
                //  axios.get(`/api/search?kw=${this.keyWord}`).then(
        axios.get(`/api8${this.keyWord}&cid=eef_&os=ios&appverion=1`).then(
        (response) => {
          //   console.log('请求成功了',response.data.items)
          // const regbody = /<img src="\/\/bookcover\.yuewen\.com\/qdbimg\/.*">/;
          
          console.log(response.data.all_book_items[0]);
          // console.log(response.data.match(regbody));
        },
        (error) => {
          // console.log("请求失败了", error.message);
          console.error(error.response.data);   
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  flex-direction: column;
  .tltle {
    height: 100px;
    // width: 100%;
    // width: 1000px;
    // border: 1px solid #333;
    border-radius: 5px;
    // background-color:#333 ;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    .pic {
      width: 130px !important;
      height: 130px !important;
      margin-top: -65px;
    }
    .left {
      flex: 1;
      margin-left: 10px;
      .top {
        // display: flex;
        h2 {
          font-size: 22px;
          font-weight: bold;
          display: inline-block;
          margin: 0px 10px 8px 0px;
          vertical-align: middle;
        }
        div {
          border: 1px solid rgb(176, 188, 196);
          border-radius: 12px;
          font-size: 12px;
          vertical-align: text-bottom;
          color: rgb(124, 141, 156);
          padding: 0px 6px;
          margin-right: 10px;
          display: inline-block;
        }
      }
      .info {
        display: flex;
        a {
          font-size: 16px;
          font-weight: bold;
          font-family: Arial;
          margin-right: 6px;
          color: rgb(24, 195, 210);
        }
        span {
          font-size: 12px;
          margin-right: 20px;
        }
        // p {
        //   margin-left: 10px;
        //   span {
        //     margin-left: 10px;
        //   }
        // }
      }
    }
    // justify-content: space-between;
    .right {
      display: flex;
      // margin-left: 328px;
      .pay_attention_to {
        height: 30px;
        display: flex;
        align-items: center;
        // 法1
        //       flex: 1;
        // text-align: right;
        // 法2
        margin-left: 50px;
        // left: 50px;
        // justify-content: flex-end;
        /deep/ span {
          width: 100%;
        }
      }
    }
  }
  .topic {
    // margin: 170px auto;
    // flex-direction: row;
    // display:flex;
    /* display: block !important; */
  }
}
</style>