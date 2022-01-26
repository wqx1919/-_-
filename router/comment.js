// const expressJoi = require('@escook/express-joi')
// const { register_schema,reg_login_schema } = require('../schema/user')
// const user =require("../router_handler/user")
// // const { reg_login_schema } = require('../schema/user')
// module.exports = function(app) {
//     app.get('/', function(req, res, next) {
//         res.render('index', { title: 'Express' });
//     });
//     app.use("/ueditor", require("../router_handler/ueditor"));
//     // app.use("/", require("./qidian"));
// }
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const topic = require('../router_handler/ueditor')
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema,register_schema } = require('../schema/user')

router.post('/wangeditor/upload', topic.comment)
// router.post('/SELECT_topic', topic.topic)
// console.log("1333")

module.exports = router
