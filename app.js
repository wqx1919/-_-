// ...........别的原有的配置，忽略。。。。
//新加：
const express = require("express");
// var index = require('./router/index');
// var index = require('./router/j');
var router = require("./router/index");
const path = require('path');
const app =express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //为了跨域保持session，所以指定地址，不能用*
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true); //是否允许发送cookie
    next();
});
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './public')));
// app.use("/index",index);
router(app); 
// app.use("/ueditor",ueditor);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(8008,()=>{
    console.log("8008端口已经启动")
})

module.exports = app;
