// ...........别的原有的配置，忽略。。。。
//新加：
const express = require("express");
// var index = require('./router/index');
// var index = require('./router/j');
// var router = require("./router/index");
// var router = require("./router/comment");

const path = require('path');
const cors = require('cors')
const joi = require('joi')
const app =express();

app.use(cors())
app.post('/test',(req,res)=>{
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
  // app.all('*', function(req, res, next) {
  //   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  //   // res.setHeader('Access-Control-Allow-Headers', '*');
  //     // res.writeHead(200,{'Content-Type': "image/gif", 'Access-Control-Allow-Origin': 'null'});
  //     res.header("Access-Control-Allow-Origin", "*"); //为了跨域保持session，所以指定地址，不能用*
  //     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //     res.header('Access-Control-Allow-Headers', 'Content-Type','Application/json');
  //     res.header('Access-Control-Allow-Credentials', true); //是否允许发送cookie
  //     next();
  // });

// // 允许跨域
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials","true");
//   if(req.method === "OPTIONS") res.send(200);
//   else  next();
// });
// app.all('*', function(req, res, next) {
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   // res.setHeader('Access-Control-Allow-Headers', '*');
//     // res.writeHead(200,{'Content-Type': "image/gif", 'Access-Control-Allow-Origin': 'null'});
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //为了跨域保持session，所以指定地址，不能用*
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', true); //是否允许发送cookie
//     next();
// });
// app.all('*', function(req, res, next) {  
//   res.header("Access-Control-Allow-Origin", "*");  
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");  
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//   res.header("X-Powered-By",' 3.2.1')  
//   res.header("Content-Type", "application/json;charset=utf-8");  
//   next();  
// });  
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './public')));
// // app.use("/index",index);
// router(app); 
// // app.use("/ueditor",ueditor);

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// // 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

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
// console.log(1)
// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知的错误
  res.cc(err)
})
app.listen(8008,()=>{
    console.log("http://127.0.0.1:8008 端口已经启动")
})

// module.exports = app;
