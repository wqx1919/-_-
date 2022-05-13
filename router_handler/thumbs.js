const db = require('../db/index')
const sqlQuery = require('../db/promise')

//优化
//合并查询 简化全部帖子
exports.AllTopicThumbs = async (req, res, next) => {
    const SELECT_sql = "SELECT count(*) number from thumbs where state = 1 and thumbs_topic_id=?"
    const sql_state = "SELECT count(*) number from thumbs where state = -1 and thumbs_topic_id=?"
    // 查询数据失败
    // console.log(results)
    // if (err) return console.log(err.message)
    // // 查询数据成功
    // // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // // console.log(results)
    // res.send(results)
    let messageSucceedLike = '获取点赞长度成功', messageFailureLike = '点赞点赞长度失败';
    let messageSucceedUnLike = '获取点赞长度成功', messageFailureUnLike = '点赞点赞长度失败';
    try {
        const results = await sqlQuery(SELECT_sql, req.query.thumbs_topic_id)
        const results_state = await sqlQuery(sql_state, req.query.thumbs_topic_id)
        // 影响的行数是否等于 1
        if (results.length !== 1  ) return res.cc(messageFailureLike)
        if (results_state.length !== 1  ) return res.cc(messageFailureUnLike)
        res.send({
        status: 0,
        messageSucceedLike,
        messageSucceedUnLike,
        data: [
            {
                state: 1,
                number: results[0].number
            },
            {
                state: -1,
                number: results_state[0].number
            },
        ],
    })

    } catch (error) {
        // 执行 SQL 语句失败
        return res.cc(error)
    }
    // console.log(results)


    // console.log(results)
    // res.cc(messageSucceed, 0)
    // console.log(results[0].number)
}

//合并查询 简化
exports.Allthumbs = (req, res, next) => {
    const SELECT_sql = "SELECT state  from thumbs where thumbs_topic_id=? and thumbs_user_id=?"
    console.log(req.query.thumbs_topic_id,req.user.id);
    db.query(SELECT_sql, [req.query.thumbs_topic_id, req.user.id], (err, results) => {
        // 查询数据失败
        // console.log(results)
        // if (err) return console.log(err.message)
        // // 查询数据成功
        // // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // // console.log(results)
        // res.send(results)
        // console.log([req.query.thumbs_topic_id, req.user.id])
        let messageSucceed = '获取当前用户状态成功', messageFailure = '获取当前用户状态失败';
        // if (req.query.state == 1) {
        //     messageSucceed = '获取当前用户状态成功'
        //     messageFailure = '点赞点赞长度失败'

        // } else if (req.query.state == -1) {
        //     messageSucceed = '获取当前用户状态成功'
        //     messageFailure = '获取当前用户状态失败'
        // }
        // else {
        //     messageSucceed = '获取取消长度成功'
        //     messageFailure = '获取取消长度失败'
        // }
        // console.log(results)
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 影响的行数是否等于 1
        if (results.length !== 1) {
            // return res.cc('该用户未操作该贴')
        return res.send({
                status: 0,
                // Failure:'该用户未操作该贴',
                messageFailure,
                data: -2,
            })
        }
        // res.cc(messageSucceed, 0)
        // console.log(results[0].number)
        res.send({
            status: 0,
            messageSucceed,
            data: results[0],
        })
    })
}
exports.getthumbs = (req, res, next) => {
    const SELECT_sql = "SELECT * from thumbs where state = 1 and thumbs_topic_id=? and thumbs_user_id=?"
    db.query(SELECT_sql, [req.query.thumbs_topic_id, req.user.id], (err, results) => {
        // 查询数据失败
        // console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}

//获取当前点赞数量
exports.getthumbs = (req, res, next) => {
    const SELECT_sql = "SELECT * from thumbs where state = 1 and thumbs_topic_id=? and thumbs_user_id=?"
    db.query(SELECT_sql, [req.query.thumbs_topic_id, req.user.id], (err, results) => {
        // 查询数据失败
        // console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//获取当前点踩数量
exports.getUnthumbs = (req, res, next) => {
    const SELECT_sql = "SELECT * from thumbs where state = -1 and thumbs_topic_id=? and thumbs_user_id=?"
    db.query(SELECT_sql, [req.query.thumbs_topic_id, req.user.id], (err, results) => {
        // 查询数据失败
        // console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//是否点赞了
exports.getisthumbs = (req, res, next) => {
    let thumbs_topic_id = req.query.thumbs_topic_id
    // console.log(req.query)
    // console.log(req)
    console.log(req.user.id, req.query.thumbs_topic_id)
    const SELECT_sql = "SELECT * from thumbs where thumbs_user_id=?  and state=0  and thumbs_topic_id =?"
    db.query(SELECT_sql, [req.user.id, thumbs_topic_id], (err, results) => {
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
// 此时存在点赞或者点踩
exports.postaddthumbs = async (req, res, next) => {
    const sql = `select count(id) as number FROM thumbs where thumbs_topic_id=? and thumbs_user_id=?`
    // const sql = `select *  FROM thumbs where thumbs_topic_id=1`
    try {
        let results = await sqlQuery(sql, [req.body.thumbs_topic_id, req.user.id]);

        if (results[0].number == 0) {
            const sql = `insert into thumbs set ?`
            try {
                console.log([req.body.state, req.body.thumbs_topic_id, req.user.id])
                let results = await sqlQuery(sql, { ...req.body, thumbs_user_id: req.user.id });
                // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
                if (results.affectedRows !== 1) return res.cc('点赞失败！')
                if (req.body.state == 1) {
                    res.cc('点赞成功', 0)
                } else if (req.body.state == -1) {
                    res.cc('点踩成功', 0)
                }
                else {
                    res.cc('取消成功', 0)
                }
            } catch (error) {
                res.cc(error)
            }
        }
        else {
            const sql = `update thumbs set state=? where id in (SELECT * FROM (select id FROM thumbs where thumbs_topic_id=? and thumbs_user_id=?) as demo)`
            try {
                let results = await sqlQuery(sql, [req.body.state, req.body.thumbs_topic_id, req.user.id]);
                if (results.affectedRows !== 1) return res.cc('点踩失败！')
                if (req.body.state == 1) {
                    res.cc('点赞成功', 0)
                } else if (req.body.state == -1) {
                    res.cc('点踩成功', 0)
                }
                else {
                    res.cc('取消成功', 0)
                }
            } catch (error) {
                res.cc(error)
            }
        }
    } catch (error) {
        res.cc(error)
    }
}

exports.thumbsdemo = async (req, res, next) => {
    const sql = `select count(id) as number FROM thumbs where thumbs_topic_id=? and thumbs_user_id=?`
    // const sql = `select *  FROM thumbs where thumbs_topic_id=1`
    try {
        let results = await sqlQuery(sql, [req.body.thumbs_topic_id, req.user.id]);

        if (results[0].number == 0) {

            const sql = `insert into thumbs set ?`
            try {
                console.log([req.body.state, req.body.thumbs_topic_id, req.user.id])
                let results = await sqlQuery(sql, [req.body.state, req.body.thumbs_topic_id, req.user.id]);
                if (results.affectedRows !== 1) return res.cc('点赞失败！')
                res.cc('点赞成功', 0)
            } catch (error) {
                res.cc(error)
            }
        }
        else {
            const sql = `update thumbs set state=? where id in (SELECT * FROM (select id FROM thumbs where thumbs_topic_id=? and thumbs_user_id=?) as demo)`
            try {

                let results = await sqlQuery(sql, [req.body.state, req.body.thumbs_topic_id, req.user.id]);
                if (results.affectedRows !== 1) return res.cc('点赞失败！')
                res.cc('点赞成功', 0)
            } catch (error) {
                res.cc(error)
            }
        }
    } catch (error) {
        res.cc(error)
    }
}