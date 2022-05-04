// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')
exports.gettopic = (req,res,next)=>{
    // console.log(req)
   const SELECT_sql ="SELECT * from topic"
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

