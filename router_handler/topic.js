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
exports.gettopic_comment = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    // console.log(req.query)
    // const id =  req.query.topic_id
    // console.log(req.body)
    const id =  req.body.topic_id
    // const sql = `select * from comment where id=? `
    const sql = `select comment.id,comment.topic_id,comment.topic_type,comment.content,comment.from_user_id,user.account,user.avtar 
    from comment left join user on comment.from_user_id=user.id 
    where comment.topic_id=? `

    const data ={}
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, {topic_id:id},(err, results) => {
      if (err) return res.cc(err)
    //   res.send({
    //     status: 0,
    //     message: '获取帖子评论数据成功！',
    //     data: results,
    //   })
      const comment_results = results
      // const sql2 = `select * from reply where comment_id in(select id from comment where id=?) `\
      const sql2 = `SELECT reply.id,reply.comment_id,reply.reply_id,reply.reply_type,reply.content,reply.from_user_id,user.account from_user_account,user.avtar from_user_avtar,reply.to_user_id,to_user.account as to_user_account,to_user.avtar as to_user_avtar
      FROM reply left join user on reply.from_user_id=user.id 
      left join user to_user on reply.to_user_id=to_user.id
      where comment_id in (select id from comment where topic_id = ?);`

      db.query(sql2,{id:id},(err, results) => {
        const reply_results = results
        if (err) return res.cc(err)
        res.send({
          status: 0,
          message: '获取帖子评论_回复数据成功！',
          data: {comment_results,reply_results},
        })
        // const sql = `select * from reply where comment_id in(select * from comment where id=?) `
        // results.forEach(element => {
        //     console.log(element.id)
        // });
      })
    //   results.forEach(element => {
    //       console.log(element.id)
    //   });
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