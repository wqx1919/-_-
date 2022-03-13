<template>
  <div class="main version_heart">
    <div class="tltle pannel">
      <el-image
        class="pic"
        style="width: 100px; height: 100px"
        :src="bookinfo.imgUrl"
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
          <!-- <h2>书名xxxxxxxx</h2> -->
          <h2>{{ keyWord }}</h2>
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
      bookinfo: {
        imgUrl: "",
        lastTime: "",
        site: "",
        desc: "",
      },
      // url: require("../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg"),
      // url: bookinfo.imgUrl,
      srcList: [
        // require("../../public/img/0072Vf1pgy1fodqig7h5nj318g0p0qv5.jpg"),
        // `${this.imgUrl}`,
        // bookinfo.imgUrl
      ],
      // test:[
      //     this.bookinfo.imgUrl
      // ],
      keyWord: "斗破苍穹",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    listAssign(arrA, arrB) {
      Object.keys(arrA).forEach((key) => {
        arrA[key] = arrB[key] || arrA[key];
      });
    },
    getData() {
      axios.get(`/api8${this.keyWord}&cid=eef_&os=ios&appverion=1`).then(
        (response) => {
          // const base =response.data.all_book_items[0];
          // const listAssign = (arrA, arrB) => Object.keys(arrA).forEach(key => { arrA[key] = arrB[key] || arrA[key]});
          this.listAssign(this.bookinfo, response.data.all_book_items[0]);
          this.srcList=response.data.all_book_items[0].imgUrl.split(';')
          //  this.bookinfo.imgUrl= base.imgUrl
          //  this.bookinfo.lastTime=base.lastTime
          //  this.bookinfo.site=base.site
          //  this.bookinfo.desc=base.desc
          //  console.log(this.bookinfo.imgUrl)
          // console.log(response.data.all_book_items[0]);
          // console.log(this.srcList)
          //  var newsrcList = response.data.all_book_items[0].imgUrl.split(';');
          //  this.srcList=newsrcList
          //  console.log(newsrcList)
        },
        (error) => {
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
      width: 110px !important;
      height: 150px !important;
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