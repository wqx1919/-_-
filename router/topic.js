const db = require('../db/index')
var express = require('express');
var router = express.Router();
// var path = require('path')
router.post("/SELECT_topic",(req,res,next)=>{
   const SELECT_sql ="SELECT * from topic"
//    console.log(1)
//    res.send("1")
//    db.query(SELECT_sql, (err, results) => {
//        if(err)
//        console.log(err.message)
//        console.log(results)
//     // res.send(results)
//   })
// console.log(SELECT_sql)
// console.log(db)
    db.query(SELECT_sql, (err, results) => {
    // 查询数据失败
    console.log("1")
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // console.log(results)
    res.send(results)
    }) 
})
// router.engine('art', require('express-art-template'));
module.exports = router;   //暴露接口