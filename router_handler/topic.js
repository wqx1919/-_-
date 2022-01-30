const db = require('../db/index')
// var express = require('express');
// var router = express.Router();
// var path = require('path')
exports.gettopic = (req,res,next)=>{
    // console.log(req)
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
}
// 获取帖子评论列表的处理函数
// JS中对象赋值只传值不传对象（地址）的方法，改变新值不影响旧值的两种方法
// var newData=JSON.parse(JSON.stringify(data));
 function totree(chlichid,list_) {
   var list=JSON.parse(JSON.stringify(list_));
    let obj = {};
    let result = [];
  //  let list = JSON.parse(JSON.stringify(list_))
    //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
    list.map((el) => {
      obj[el.id] = el;
    });
    for (let i = 0, len = list.length; i < len; i++) {
      if(chlichid == list[i].comment_id){ //挂载在哪一条著评论下,是回复的儿子,回复的回复的爸爸
            let id = list[i].reply_id;
            let type=list[i].reply_type
          if (id == chlichid && type === "comment") {    // 头部
            result.push(list[i]);
            continue;
          }
          if (obj[id].children) {
            obj[id].children.push(list[i]);
          } else {
            obj[id].children = [list[i]];
          }
        }
      }
    return result;
    // this.replydata =result
  }
 function  handler(id,data) {
  // id:评论表id
  // data 回复表数据
    let newdata = JSON.parse(JSON.stringify(data)) // 确保原来对象不变
    let list = [];
    for (let key in newdata) {
      if (id === newdata[key].comment_id ) { //回复id==评论id（子回复id挂在这个评论的第一个回复下【第一次楼中楼】）
         list.push(newdata[key]);
      }
    }
    let result =  totree(list, 1);
    // console.log(result)
    return result;
  }
exports.gettopic_comment = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const id =  req.body.topic_id
    // const sql = `select * from comment where id=? `
    const sql = `select comment.id,comment.topic_id,comment.topic_type,comment.content,comment.from_user_id,user.account,user.avtar 
    from comment left join user on comment.from_user_id=user.id 
    where comment.topic_id=? `
    const data ={}
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, {topic_id:id},(err, results) => {
      if (err) return res.cc(err)
    const  comment_results = results
      // const sql2 = `select * from reply where comment_id in(select id from comment where id=?) `
      const sql2 = `SELECT reply.id,reply.comment_id,reply.reply_id,reply.reply_type,reply.content,reply.from_user_id,user.account from_user_account,user.avtar from_user_avtar,reply.to_user_id,to_user.account as to_user_account,to_user.avtar as to_user_avtar
      FROM reply 
      left join user on reply.from_user_id=user.id 
      left join user to_user on reply.to_user_id=to_user.id
      where comment_id in (select comment.id from comment where topic_id = ?);`

      db.query(sql2,{topic_id:id},(err, results) => {
        const reply_results = results
        if (err) return res.cc(err)
        let test ="cc"
        let tree=[]
        for(let element=0;element<comment_results.length;element++){
             tree.push(totree(comment_results[element].id,reply_results)); //把数组转化位数结构
        }
        for(let element=0;element<comment_results.length;element++){
          if(tree[element])
          comment_results[element].children=[tree[element]]; //合并评论
        }
        res.send({
          status: 0,
          message: '获取帖子评论_回复数据成功！',
          data: {comment_results,tree},
        })
      })
    })

  }
// 获取帖子分类列表的处理函数
exports.getArtCates = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const sql = `select * from topic where status=0 order by id asc`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取帖子分类数据成功！',
        data: results,
      })
    })
  }
  
  // 新增帖子分类的处理函数
  exports.addArticleCates = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = `select * from topic where topic_tag_id=? or topic_category_id=?`
    // 2. 执行查重的 SQL 语句
    db.query(sql, [req.body.topic_tag_id, req.body.topic_category_id], (err, results) => {
      // 3. 判断是否执行 SQL 语句失败
      if (err) return res.cc(err)
  
      // 4.1 判断数据的 length
      if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
      // 4.2 length 等于 1 的三种情况
      if (results.length === 1 && results[0].topic_tag_id === req.body.topic_tag_id && results[0].topic_category_id === req.body.topic_category_id) return res.cc('分类名称与分类别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].topic_tag_id === req.body.topic_tag_id) return res.cc('分类名称被占用，请更换后重试！')
      if (results.length === 1 && results[0].topic_category_id === req.body.topic_category_id) return res.cc('分类别名被占用，请更换后重试！')
  
      // 定义插入帖子分类的 SQL 语句
      const sql = `insert into topic set ?`
      // 执行插入帖子分类的 SQL 语句
      db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增帖子分类失败！')
        res.cc('新增帖子分类成功！', 0)
      })
    })
  }
  
  // 删除帖子分类的处理函数
  exports.deleteCateById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = `update topic set status=0 where id=?`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('删除帖子分类失败！')
      res.cc('删除帖子分类成功！', 0)
    })
  }
  
  // 根据 Id 获取帖子分类的处理函数
  exports.getArtCateById = (req, res) => {
    // 定义根据 ID 获取帖子分类数据的 SQL 语句
    const sql = `select * from topic where id=?`
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.length !== 1) return res.cc('获取帖子分类数据失败！')
      res.send({
        status: 0,
        message: '获取帖子分类数据成功！',
        data: results[0],
      })
    })
  }
  
  // 根据 Id 更新帖子分类的处理函数
  exports.updateCateById = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from topic where Id<>? and (topic_tag_id=? or topic_category_id=?)`
    // 调用 db.query() 执行查重的 SQL 语句
    db.query(sql, [req.body.Id, req.body.topic_tag_id, req.body.topic_category_id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
  
      // 判断名称和别名被占用的4种情况
      if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].topic_tag_id === req.body.topic_tag_id && results[0].topic_category_id === req.body.topic_category_id) return res.cc('分类名称与别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].topic_tag_id === req.body.topic_tag_id) return res.cc('分类名称被占用，请更换后重试！')
      if (results.length === 1 && results[0].topic_category_id === req.body.topic_category_id) return res.cc('分类别名被占用，请更换后重试！')
  
      // 定义更新帖子分类的 SQL 语句
      const sql = `update topic set ? where Id=?`
      // 执行更新帖子分类的 SQL 语句
      db.query(sql, [req.body, req.body.Id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新帖子分类失败！')
        res.cc('更新帖子分类成功！', 0)
      })
    })
  }
// router.engine('art', require('express-art-template'));
// module.exports = router;   //暴露接口