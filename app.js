// ...........别的原有的配置，忽略。。。。
//新加：
const express = require("express");

const path = require('path');
const cors = require('cors')
const joi = require('joi')
const app = express();

app.use(cors())
app.post('/test', (req, res) => {
  res.send("test")
})
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './public')));

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api|admin/] }))

// // 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用管理员信息的路由模块
const admin = require('./router/admin')
app.use('/admin', admin)

// // 导入并使用用户评论模块
const comment = require('./router/comment')
app.use('/', comment)
// // 导入并使用书评帖子路由模块
const topic = require('./router/topic')
app.use('/api', topic)
// // 导入并使用关注路由模块
const follow = require('./router/follow')
app.use('/my', follow)

// // 导入并使用点赞路由模块
const thumbs = require('./router/thumbs')
app.use('/my', thumbs)

// // 导入并使用用户路由模块
const category = require('./router/category')
app.use('/api', category)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 身份认证失败后的错误
  console.log(err.code)
  if (err.code === 'invalid_token') return res.cc('登录已过期,请重新登入！')
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)

  // 未知的错误
  res.cc(err)
})
app.listen(8008, () => {
  console.log("http://127.0.0.1:8008 端口已经启动")
})

// module.exports = app;
