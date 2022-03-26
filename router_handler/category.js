const db = require('../db/index')
// var express = require('express');
// var router = express.Router();
// var path = require('path')
exports.getcategory = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from category"
    db.query(SELECT_sql, (err, results) => {
        // 查询数据失败
        console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//根据id查询信息
exports.getByIdcategory = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from category where id=?"
    db.query(SELECT_sql,req.query.id, (err, results) => {
        // 查询数据失败
        console.log(results)
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//根据名字返回类别信息
// exports.getByNmaeCategory = (req, res, next) => {
//     // console.log(req)
//     const SELECT_sql = "SELECT * from category where name ?"
//     db.query(SELECT_sql,req.query, (err, results) => {
//         // 查询数据失败
//         console.log(results)
//         if (err) return console.log(err.message)
//         // 查询数据成功
//         // 注意：如果执行的是 select 查询语句，则执行的结果是数组
//         // console.log(results)
//         res.send(results)
//     })
// }
//获取当前小说的所有主题（帖子）
exports.getcategory_topic = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from topic where topic_category_id in(SELECT id from category where name=?)"
    //  console.log(req.query.name)
    db.query(SELECT_sql, req.query.name, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
//获取当前小说的所有主题（帖子）
exports.getCategoryIdTopic = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from topic where topic_category_id in(SELECT id from category where name=?)"
    //  console.log(req.query.name)
    db.query(SELECT_sql, req.query.name, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        // console.log(results)
        res.send(results)
    })
}
// 新增帖子分类的处理函数(category),及其书名这个大类下的一个帖子
const topic = require('../router_handler/topic')
exports.addNewCategorTopic = (req, res) => {
    // 定义插入帖子分类的 SQL 语句
    this.getcategory_topic
    console.log(req.body)
    var  selectResult = null
    const sql = `insert into category set ?`
    // 执行插入帖子分类的 SQL 语句
    db.query(sql, {name:req.body.name,descrition:req.body.descrition}, (err, results) => {
        this.selectResult = 1
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增帖子分类失败！')
        console.log('新增帖子分类成功！')
        selectResult = results.insertId;//获取自动生成的id
        delete req.body['name']
        delete req.body['descrition']
        //新id
            // console.log(selectResult)
        req.body.topic_category_id = selectResult 
        topic.addCategoryTpoic(req,res)
        // console.log(selectResult)
        // res.cc('新增帖子分类成功！', 0)
    })
    console.log(selectResult)
    // const SELECT_sql = "SELECT id from category where name=?"
  
    // db.query(SELECT_sql,req.body.name, (err, results) => {
    //     // console.log('results @@@@')
    //     // console.log(results)
    //      selectResult = results.insertId;//获取自动生成的id
    //     // selectResult =results[0].RowDataPacket.id
    //     // console.log(results)
    // })
    // console.log(global.selectResult)

    // delete req.body['name','descrition']
    // //新id
    // req.body.topic_category_id = selectResult 
    // topic.addCategoryTpoic(req,res)
}

//查询小说是否存在
exports.getCategorybookName = (req, res, next) => {
    // console.log(req)
    const SELECT_sql = "SELECT * from category where name=?"
    //  console.log(req.query.name)
    db.query(SELECT_sql, req.query.name, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        console.log(results)
        res.send(results)
    })
}






// 获取帖子分类列表的处理函数
exports.getArtCates = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const sql = `select * from category where status=0 order by id asc`
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

// 新增帖子分类的处理函数(category)
exports.addArticleCates = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = `select * from category where category_tag_id=? or category_category_id=?`
    // 2. 执行查重的 SQL 语句
    db.query(sql, [req.body.category_tag_id, req.body.category_category_id], (err, results) => {
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)

        // 4.1 判断数据的 length
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        // 4.2 length 等于 1 的三种情况
        if (results.length === 1 && results[0].category_tag_id === req.body.category_tag_id && results[0].category_category_id === req.body.category_category_id) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].category_tag_id === req.body.category_tag_id) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].category_category_id === req.body.category_category_id) return res.cc('分类别名被占用，请更换后重试！')

        // 定义插入帖子分类的 SQL 语句
        const sql = `insert into category set ?`
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
    const sql = `update category set status=0 where id=?`
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
    const sql = `select * from category where id=?`
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
    const sql = `select * from category where Id<>? and (category_tag_id=? or category_category_id=?)`
    // 调用 db.query() 执行查重的 SQL 语句
    db.query(sql, [req.body.Id, req.body.category_tag_id, req.body.category_category_id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].category_tag_id === req.body.category_tag_id && results[0].category_category_id === req.body.category_category_id) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].category_tag_id === req.body.category_tag_id) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].category_category_id === req.body.category_category_id) return res.cc('分类别名被占用，请更换后重试！')

        // 定义更新帖子分类的 SQL 语句
        const sql = `update category set ? where Id=?`
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