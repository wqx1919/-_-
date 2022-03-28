const db = require('../db/index')
const sqlQuery = require('../db/promise')
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
exports.postaddfollow = async (req, res, next) => {
    // let user_id = req.query.user_id
    // let category_id= req.query.category_id
    // console.log(req.query)
    // console.log(req.body)
    const SELECT_sql = `SELECT count(*) number from follow where category_id=? and user_id=?`
    try {
        let results = await sqlQuery(SELECT_sql, [req.body.category_id, req.user.id]);
        if (results[0].number == 0) {
            const sql = `insert into follow set ?`
            try {
                console.log([req.body.state, req.body.category_id, req.user.id])
                let results = await sqlQuery(sql, {...req.body, user_id:req.user.id});
                // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
                if (results.affectedRows !== 1) return res.cc('关注失败！')
                if(req.body.state == 1){
                    res.send({
                        status:0,
                        message:"关注成功"
                    })
                }
                if(req.body.state == 0){
                    res.send({
                        status:0,
                        message:"取关成功"
                    })
                }

            } catch (error) {
                res.cc(error)
            }
        }
        else {
            const sql = `update follow set state=? where id in (SELECT * FROM (select id FROM follow where category_id=? and user_id=?) as demo)`
            try {
                let results = await sqlQuery(sql, [req.body.state, req.body.category_id, req.user.id]);
                if (results.affectedRows !== 1) return res.cc('关注失败！')
                if(req.body.state == 1){
                    res.send({
                        status:0,
                        message:"关注成功"
                    })
                }
                if(req.body.state == 0){
                    res.send({
                        status:0,
                        message:"取关成功"
                    })
                }
            } catch (error) {
                res.cc(error)
            }
        }
    } catch (error) {
        res.cc(error)
    }
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

//热门标签（采用关注数量来实现）
exports.getFollowCategory = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT category.name,category_id FROM follow   LEFT JOIN category on follow.category_id = category.id  where state=1 GROUP BY category_id LIMIT 10"
    //  console.log(req.query.name)
    db.query(SELECT_sql, req.user.id, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // 影响的行数是否等于 0
        if (results.length == 0) return res.cc('暂无热门')
        res.send({
            status: 0,
            message: '查询获取热门标签成功！',
            data: results
        })
    })
}