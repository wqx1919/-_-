// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
// console.log("edwv")

exports.getUserInfo = (req, res) => {
  console.log("this is getUserInfo")
  // 定义查询用户信息的 SQL 语句
  const sql = `select id, account, account, email, avtar from user where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.user.id, (err, results) => {
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
//获取 修改资料字段的的处理函数

exports.getUserInfoEdit = (req, res) => {
  console.log("this is getUserInfoEdit")
  // 定义查询用户信息的 SQL 语句
  const sql = `select account,email, sex, Birthday  from user where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.user.id, (err, results) => {
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
// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  // 定义待执行的 SQL 语句
  const sql = `update user set ? where id=? `
  console.log(req.body)

  // 调用 db.query() 执行 SQL 语句并传递参数
  db.query(sql, [req.body, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
    // 成功
    res.cc('更新用户信息成功！', 0)
  })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  // 根据 id 查询用户的信息
  const sql = `select * from user where id=?`
  // 执行根据 id 查询用户的信息的 SQL 语句
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('用户不存在！')
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)

    console.log(req.body.oldPwd, results[0].password)

    if (!compareResult) return res.cc('旧密码错误！')

    // 定义更新密码的 SQL 语句
    const sql = `update user set password=? where id=?`
    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      // 成功
      res.cc('更新密码成功', 0)
    })
  })
}

// 更新用户头像的处理函数
//头像上传图片的地址
var fs = require("fs");  //文件模块
exports.avatar = (req, res) => {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // console.log(req.body)
  var oldpath = req.file.path; //file就是我们刚在前台模板里面配置的后台接受的名称；
  var extnameorr = req.file.originalname; //因为multer这个时候存在我们刚路径上的，只是一个path，还没有具体的扩展名，如：2.png这样的
  var newFilename = req.file.filename;
  var tem = extnameorr.indexOf('.');
  // console.log(extnameorr)
  // // console.log(tem);
  var extname = extnameorr.substring(tem);
  // console.log("files参数："+extname+"\n")
  //新的路径由组成：原父路径 + 拓展名
  // var newpath = "./public/images/avatar/" +newFilename+ extname;
  let OldFolderPath = req.file.destination;
  var newpath = OldFolderPath + newFilename + extname;
  // var newpath = oldpath + extname;
  // var newpath =oldpath + extname;
  //改名
  let message = []
  fs.rename(oldpath, newpath, function (err) { //把之前存的图片换成真的图片的完整路径
    if (err)
      res.cc(err)
    var mypath = newpath.replace("./public", "http://127.0.0.1:8008");//http://127.0.0.1:8008是我自己设置的后台的ip名，根据环境，可以是localhost,也可以是电脑ip
    // console.log(newpath)
    message.push({ data: mypath })
    // res.send({errno:0,data:[mypath]}) //返回图片路径，让前端展示
  });

  // console.log(req.file)
  // console.log(req.body,"\n",req.files)
  // req.body 将具有文本域数据，如果存在的话
  // 1. 定义更新头像的 SQL 语句
  const sql = `update user set avtar=? where id=?`
  // 2. 调用 db.query() 执行 SQL 语句
  var mypath = newpath.replace("./public", "");
  db.query(sql, [mypath, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    message.push({ mysql: '更换头像成功！' })
    res.cc(message)
  })
}

//获取当前用户的帖子
exports.userTopic = (req, res, next) => {
  // console.log(req.query.searchKeyword)
  const SELECT_sql = "SELECT * from topic where topic_user_id=?"
  console.log(SELECT_sql)
  // console.log(req.query)
  console.log(req.user)
  db.query(SELECT_sql, req.user.id, (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // 影响的行数是否等于 0
    // if (results.length  == 0) return res.cc('当前用户无发帖记录')
    res.send({
      status: 0,
      message: '查询用户帖子成功！',
      data: results
    })
  })
}

//获取当前用户的帖子
exports.userBrief = (req, res, next) => {
  // console.log(req.query.searchKeyword)
  const SELECT_sql = "SELECT  id userId,sex,create_at  from user where id=?"
  // console.log(SELECT_sql)
  // // console.log(req.query)
  // console.log(req.user)
  db.query(SELECT_sql, req.user.id, (err, results) => {
    // 查询数据失败
    if (err) return console.log(err.message)
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // 影响的行数是否等于 0
    // if (results.length  == 0) return res.cc('当前用户无发帖记录')
    res.send({
      status: 0,
      message: '查询用户成功！',
      data: results
    })
  })
}


