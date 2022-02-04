const { type } = require('os')
const db = require('../db/index')
// 新加评论
exports.addtopic_comment = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    // const content =  req.body.content
    // const sql = `select * from comment where id=? `
    let sql=""
    // console.log(req.body.type==="comment")
    if(req.body.type==="comment"){
        sql = `insert into comment set ?`
    }
    else{
     sql = `insert into reply set ?`
    }
    const data ={}
    //   // 调用 db.query() 执行 SQL 语句
      console.log(req.body)
    //   console.log(req.user.id)
    delete req.body['type']
      db.query(sql, {...req.body,from_user_id:req.user.id }, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 判断影响的行数
        if (results.affectedRows !== 1) return res.cc('新增评论失败！')
        // 成功
        res.cc('新增评论成功', 0)
      })
  
  }
// 删除评论分类的处理函数
exports.deletecommentById = (req, res) => {
    // 定义标记删除的 SQL 语句
    let sql=""
    if(req.query.type==='comment'){
        sql = `update comment set status=0 where id=?`
    }
    else{
     sql = `update reply set status=0 where id=?`
    }
    delete req.body['type']
    // console.log(req.body)
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.query.id, (err, results) => {
        console.log(sql)
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除评论失败！')
        res.cc('删除评论成功！', 0)
    })
}