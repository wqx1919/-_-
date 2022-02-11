// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
const { userInfo } = require('os')
// var express = require('express');
// var router = express.Router();
// 注册新用户的处理函数
// console.log("scew")
exports.register=(req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // console.log("scew")
  console.log(req.body)
  // 对表单中的数据，进行合法性的校验
  // if (!userinfo.account || !userinfo.password) {
  //   return res.send({ status: 1, message: '用户名或密码不合法！' })
  // }

  // 定义 SQL 语句，查询用户名是否被占用
  const sqlStr = 'select * from user where account=?'
  db.query(sqlStr, userinfo.account, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log( userinfo.password)
    //  res.send( userinfo.password)
    // 定义插入新用户的 SQL 语句
    const sql = 'insert into user set ?'
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, { 
      id: userinfo.id,
      email: userinfo.email,
      account: userinfo.account, 
      password: userinfo.password,
      Birthday: userinfo.Birthday,
      create_at: userinfo.create_at }, (err, results) => {
      // console.log(userinfo)
    // console.log( userinfo.password)
      // 判断 SQL 语句是否执行成功
      // if (err) return res.send({ status: 1, message: err.message })
      if (err) return res.cc(err)
      // 判断影响行数是否为 1
      // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      // 注册用户成功
      // res.send({ status: 0, message: '注册成功！' })
      res.cc('注册成功！', 0)
    })
  })
}

// 登录的处理函数
exports.login=(req, res) => {
  // 接收表单的数据
  const userinfo = req.body
  console.log(userinfo)
  // 定义 SQL 语句
  const sql = `select * from user where account=?`
  // 执行 SQL 语句，根据用户名查询用户的信息
  db.query(sql, userinfo.account, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！查无此号')

    // TODO：判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    // res.send(results[0].password === userinfo.password )
     if (!compareResult) return res.cc('登录失败！密码错误')

    // TODO：在服务器端生成 Token 的字符串
    const user = { ...results[0], password: '', avtar: '' }
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token:  'Bearer ' + tokenStr,
      
    })
  })
}
// module.exports = router;   //暴露接口

// 获取指定用户基本信息的路由
exports.ALLUserInfo = (req, res) => {
  console.log("this is ALLUserInfo")
 // 定义查询用户信息的 SQL 语句
  const userinfo =  req.query
  // const userinfo = JSON.stringify(req.query)
  console.log(userInfo)
  // console.log(req.query)
 const sql = `select id, account, account, email, avtar from user where id=?`
 // 调用 db.query() 执行 SQL 语句
//  console.log(req.param("id"))
 db.query(sql, userinfo.id, (err, results) => {
   // 执行 SQL 语句失败
   if (err) return res.cc(err)
   // 执行 SQL 语句成功，但是查询的结果可能为空
   if (results.length !== 1) return res.cc('获取用户信息失败！')

   // 用户信息获取成功
   res.send({
     status: 0,
     message: '获取用户信息成功！',
     data: results[0],
   })
 })
}