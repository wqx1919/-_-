const db = require('../db/index')
//获取当前关注数量
exports.getfollow = (req, res, next) => {
    const SELECT_sql = "SELECT * from follow where state = 1"
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
//是否关注了
exports.getisfollow = (req, res, next) => {
    let user_id = req.query.user_id
    let category_id = req.query.category_id
    // console.log(req.query)
    // console.log(req)
    const SELECT_sql = "SELECT * from follow where user_id=?  and state=1  and category_id =?"
    db.query(SELECT_sql, [user_id, category_id], (err, results) => {
        // 查询数据失败
        //  console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//  更新数据
exports.postaddfollow = (req, res, next) => {
    // let user_id = req.query.user_id
    // let category_id= req.query.category_id
    // console.log(req.query)
    console.log(req.body)
    const sql = `update follow set state=? where id in (SELECT * FROM (select id FROM follow where category_id=? and user_id=?) as demo)`
    db.query(sql, [req.body.state, req.body.category_id, req.body.user_id], (err, results) => {
        // 查询数据失败
        //  console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}

//查询当前用户关注的分类
exports.getUserCategory = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from category where id in (SELECT category_id from follow where user_id=?)"
    //  console.log(req.query.name)
    db.query(SELECT_sql, req.user.id, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // 影响的行数是否等于 0
        // if (results.length == 0) return res.cc('当前用户无发帖记录')
        // res.send({
        //     status: 0,
        //     message: '查询用户帖子成功！',
        //     data: results
        // })
        // 影响的行数是否等于 1
        // if (results.length !== 1) {
        //     // return res.cc('该用户未操作该贴')
        //     return res.send({
        //         status: 0,
        //         // Failure:'该用户未操作该贴',
        //         messageFailure,
        //         data: -2,
        //     })
        // }
        res.send({
            status: 0,
            message: '查询当前用户关注的分类成功！',
            data: results
        })
    })
}