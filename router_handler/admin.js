//Admin 封禁用户
// 导入数据库操作模块
const { trace } = require('console')
const db = require('../db/index')

const sqlQuery = require('../db/promise')

exports.AdminBan = (req, res, next) => {
    //俩个步骤 判断 状态是否等于 1 ；执行封禁或解封 ---、、、算了写俩个api吧
    // 定义 SQL 语句
    const sqlStr = 'update user set ? where id=?'
    // 执行 SQL 语句
    const ban = { ban: req.body.ban }
    db.query(sqlStr, [ban, req.body.user_id], (err, results) => {
        // console.log(results,ban)
        if (err) return console.log(err.message)
        if (results.affectedRows === 1) {
            console.log('更新user数据成功')
        }
    })
    // 封禁用户
    if (req.body.ban == 0) {
        // 定义插入帖子的 SQL 语句
        const sql = `insert into ban set ?`
        // 执行插入帖子的 SQL 语句
        delete req.body.ban //删除无用字段
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('封禁用户失败！')
            res.cc('封禁用户成功！', 0)
        })
    } else {
        //解封用户
        const sqlStr = 'delete from ban where user_id=?'
        // 执行 SQL 语句
        db.query(sqlStr, req.body.user_id, (err, results) => {
            if (err) return console.log(err.message)
            // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
            if (results.affectedRows === 1) {
                res.cc('解封用户成功', 0)
            }
        })
    }

}
// 查询指定用户字段
exports.AdminUser = async (req, res, next) => {
    // 定义根据 ID 获取文章分类数据的 SQL 语句
    const sql = "select ban,account,id from user limit " + req.query.offset + ",9"

    const sqlAllUser = "select count(*) number from user "

    // 调用 db.query() 执行 SQL 语句
    let sqlAllUserResults = await sqlQuery(sqlAllUser)
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 0) return res.cc('获取用户数据失败！')
        res.send({
            status: 0,
            message: '获取用户数据成功！',
            data: results,
            number: sqlAllUserResults[0].number
        })
    })
}

//申诉信息
exports.AdminMessage = async (req, res, next) => {
    // 定义根据 ID 获取文章分类数据的 SQL 语句
    const sql = "SELECT  user.id, account ,unblock,reason   FROM user LEFT JOIN ban on ban.user_id = user.id  WHERE unblock!='' limit " + req.query.offset + ",9"
    const sqlAllUser = "SELECT count(*) number FROM ban WHERE unblock!=''"

    // 调用 db.query() 执行 SQL 语句
    let sqlAllUserResults = await sqlQuery(sqlAllUser)
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        // if (results.length == 0) return res.cc('获取用户数据失败！')
        res.send({
            status: 0,
            message: '获取用户数据成功！',
            data: results,
            number: sqlAllUserResults[0].number
        })
    })
}

//查询是否被封禁
exports.AdminIsReason = async (req, res, next) => {
    // 定义根据 ID 获取文章分类数据的 SQL 语句
    const sql = "SELECT reason,user_id FROM ban LEFT JOIN `user` on ban.user_id =`user`.id WHERE user_id in (SELECT id FROM `user` WHERE account = ?)"
    // 调用 db.query() 执行 SQL 语句
    try {
        const results = await sqlQuery(sql, req.query.account)
        if (results.length == 0) {
            // return res.cc('获取用户数据失败！')
            res.send({
                status: 0,
                message: '用户未被封禁'
            })
        } else {
            //1.显示封禁原因

            res.send({
                status: 0,
                message: '获取封禁原因成功',
                data: results[0]
            })
        }
    } catch (error) {
        console.log(err)
    }
}

//2.提交申诉理由 
exports.AdminAddUnblock = async (req, res, next) => {
    console.log(req.body)
    const sqlUnblock = "update ban set ? where user_id in (select id from user where account = ?)"
    try {
        const UnblockObj = { unblock: req.body.unblock }
        const Unblock = await sqlQuery(sqlUnblock, [UnblockObj, req.body.account])
        if (Unblock.affectedRows != 1) return res.cc('提交申诉理由失败！')
        res.send({
            status: 0,
            message: '提交申诉理由成功！',
        })
    } catch (error) {
        res.cc(error)
    }
}
