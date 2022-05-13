const { query } = require('express')
const db = require('../db/index')
// var express = require('express');
// var router = express.Router();
// var path = require('path')
exports.gettopic = (req, res, next) => {
  // console.log(req)
  const SELECT_sql = "SELECT * from topic where status=1"
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
function totree(chlichid, list_) {
  var list = JSON.parse(JSON.stringify(list_));
  let obj = {};
  let result = [];
  let count = 0
  //  let list = JSON.parse(JSON.stringify(list_))
  //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
  list.map((el) => {
    obj[el.id] = el;
  });
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i].status == 0)
      list[i].content = "该评论已删除";
    if (chlichid == list[i].comment_id) { //挂载在哪一条著评论下,是回复的儿子,回复的回复的爸爸
      count++;
      let id = list[i].reply_id;
      let type = list[i].reply_type

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
  if (typeof result[0] != 'undefined') {
    result[0].count = count;
    // console.log( typeof result[0])
  }
  return result;
  // this.replydata =result
}
function handler(id, data) {
  // id:评论表id
  // data 回复表数据
  let newdata = JSON.parse(JSON.stringify(data)) // 确保原来对象不变
  let list = [];
  for (let key in newdata) {
    if (id === newdata[key].comment_id) { //回复id==评论id（子回复id挂在这个评论的第一个回复下【第一次楼中楼】）
      list.push(newdata[key]);
    }
  }
  let result = totree(list, 1);
  // console.log(result)
  return result;
}
// 添加论题(帖子)_评论或者回复（意思楼中楼我把他分成俩个表）
exports.gettopic_comment = (req, res) => {
  //  SQL 语句
  const id = req.body.topic_id
  // const sql = `select * from comment where id=? `
  const sql = `select comment.id,comment.topic_id,comment.topic_type,comment.content,comment.from_user_id,comment.status,comment.create_at,user.account,user.avtar 
    from comment left join user on comment.from_user_id=user.id 
    where comment.topic_id=? `
  const data = {}
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.body.topic_id, (err, results) => {
    if (err) return res.cc(err)
    // console.log(results)
    const comment_results = results
    // const sql2 = `select * from reply where comment_id in(select id from comment where id=?) `
    const sql2 = `SELECT reply.id,reply.comment_id,reply.reply_id,reply.reply_type,reply.content,reply.from_user_id,reply.status,reply.create_at,user.account from_user_account,user.avtar from_user_avtar,reply.to_user_id,to_user.account as to_user_account,to_user.avtar as to_user_avtar
      FROM reply 
      left join user on reply.from_user_id=user.id 
      left join user to_user on reply.to_user_id=to_user.id
      where comment_id in (select comment.id from comment where topic_id = ? ) `

    db.query(sql2, id, (err, results) => {
      const reply_results = results
      // console.log(reply_results)
      if (err) return res.cc(err)
      let test = "cc"
      let tree = []
      // for(let element=0;element<comment_results.length;element++){
      //      tree.push(totree(comment_results[element].id,reply_results)); //把数组转化位数结构
      // }
      // 方法一
      // for(let element=0;element<comment_results.length;element++){
      //   if(tree[element])
      //   comment_results[element].children=[tree[element]]; //合并评论
      // }
      // 方法二 区别在与前后加入
      for (let element = 0; element < comment_results.length; element++) {
        if (comment_results[element].status == 0)
          comment_results[element].content = "该评论已删除"

        tree.push(totree(comment_results[element].id, reply_results))
        if (tree[element])
          comment_results[element].children = tree[element] //子元素变成数组@@ []会导致结构不一
      }
      initTree(comment_results, 0)
      res.send({
        status: 0,
        message: '获取帖子评论_回复数据成功！',
        data: { comment_results },
      })
    })
  })
}
function initTree(tree, level) {
  tree.forEach((data) => {
    if ( data.children && level!=0 && level % 5 == 0) {
      console.log(level,"***",data.id);
      data.more = true
    } else {
      data.more = false
    }
    data.level = level
    data.levelMore = false
    data.children && initTree(data.children, level + 1); // 遍历子树
  })
}
function treeForeach(tree, id) {
  for (let data of tree) {
    if (data.id == id) {
      return data
    }
    if (data.children) {
      return treeForeach(data.children, id); // 遍历子树
    }
  }
}

//更多评论
exports.ReplyDetail = (req, res) => {
  const comment_id = req.body.comment_id
  const sql2 = `SELECT reply.id,reply.comment_id,reply.reply_id,reply.reply_type,reply.content,reply.from_user_id,reply.status,reply.create_at,user.account from_user_account,user.avtar from_user_avtar,reply.to_user_id,to_user.account as to_user_account,to_user.avtar as to_user_avtar
  FROM reply 
  left join user on reply.from_user_id=user.id 
  left join user to_user on reply.to_user_id=to_user.id
  where comment_id  = ?  `
  db.query(sql2, comment_id, (err, results) => {
    const reply_results = results
    if (err) return res.cc(err)
    let tree = []
    tree = totree(comment_id, reply_results)
    // // 方法二 区别在与前后加入
    // for (let element = 0; element < comment_results.length; element++) {
    //   if (tree[element])
    //     comment_results[element].children = tree[element] //子元素变成数组@@ []会导致结构不一
    // }
    //数组（此时变成树状结构）改变
    initTree(tree, 0)
    tree = treeForeach(tree, "W0qU7_msu0PLtrDWjNdFL")
    res.send({
      status: 0,
      message: '获取回复数据成功！',
      data: { tree },
    })
  })
}
// 添加论题(帖子) 在某个分类下
exports.addCategoryTpoic = (req, res) => {
  // 定义插入帖子的 SQL 语句
  const sql = `insert into topic set ?`
  // 执行插入帖子的 SQL 语句
  db.query(sql, req.body, (err, results) => {
    // console.log(req.body)
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('新增帖子失败！')
    res.cc('新增帖子成功！', 0)
  })
}

//搜索帖子
exports.searchTopic = (req, res, next) => {
  // console.log(req.query.searchKeyword)
  const SELECT_sql = "SELECT * from topic where content like'%" +
    req.query.searchKeyword + "%' or title like '%" +
    req.query.searchKeyword + "%'"
  console.log(SELECT_sql)
  db.query(SELECT_sql, (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // 影响的行数是否等于 0
    if (results.length == 0) return res.cc('查无此项')
    res.send({
      status: 0,
      message: '查询帖子成功！',
      data: results
    })
  })
}

//编辑帖子数据
exports.updateTopic = (req, res, next) => {
  // console.log(req.query.searchKeyword)
  const SELECT_sql = "update topic set ? where id = ?"
  console.log(SELECT_sql)
  const topic_id = req.body.id
  //  delete req.body.id
  console.log(req.body, topic_id)
  db.query(SELECT_sql, [req.body, topic_id], (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // 影响的行数是否等于 0
    if (results.affectedRows == 0) return res.cc('查无此项')
    res.send({
      status: 0,
      message: '更新帖子成功！',
      data: results
    })
  })
}

//根据id获取帖子
exports.getTopicById = (req, res, next) => {
  // console.log(req)
  const SELECT_sql = "SELECT * from topic where id=? and status =1 "
  db.query(SELECT_sql, req.query.id, (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // console.log(results)
    if (results.length !== 1) return res.cc('帖子不存在或者已被删除！')
    res.send({ status: 0, data: results[0] })
  })
}
//删除帖子（改变状态为 0）
exports.delteTopicById = (req, res, next) => {
  const SELECT_sql = "update topic set status=0 where id = ?"
  db.query(SELECT_sql, [req.body.id], (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // 影响的行数是否等于 0
    if (results.affectedRows == 0) return res.cc('删除帖子失败')
    res.send({
      status: 0,
      message: '删除帖子成功！',
      data: results
    })
  })
}
