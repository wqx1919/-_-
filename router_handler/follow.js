const db = require('../db/index')
exports.getfollow = (req,res,next)=>{
   const SELECT_sql ="SELECT * from follow where state = 1"
    db.query(SELECT_sql, (err, results) => {
    // 查询数据失败
    // console.log(results)
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // console.log(results)
    res.send(results)
    }) 
}
exports.getisfollow = (req,res,next)=>{
    let user_id = req.query.user_id
    let category_id= req.query.category_id
    // console.log(req.query)
    // console.log(req)
    const SELECT_sql ="SELECT * from follow where user_id=?  and state=1  and category_id =?"
     db.query(SELECT_sql,[user_id,category_id], (err, results) => {
     // 查询数据失败
    //  console.log(results)
     if (err) return console.log(err.message)
     // 查询数据成功
     // 注意：如果执行的是 select 查询语句，则执行的结果是数组
     // console.log(results)
     res.send(results)
     }) 
 }
 exports.postaddfollow = (req,res,next)=>{
    // let user_id = req.query.user_id
    // let category_id= req.query.category_id
    // console.log(req.query)
    console.log(req.body)
      const sql = `update follow set state=? where id in (SELECT * FROM (select id FROM follow where category_id=? and user_id=?) as demo)`
     db.query(sql,[req.body.state,req.body.category_id,req.body.user_id], (err, results) => {
     // 查询数据失败
    //  console.log(results)
     if (err) return console.log(err.message)
     // 查询数据成功
     // 注意：如果执行的是 select 查询语句，则执行的结果是数组
     // console.log(results)
     res.send(results)
     }) 
 }