const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const topic = require('../router_handler/topic')
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema,register_schema } = require('../schema/user')

router.post('/SELECT_topic', topic.gettopic)
router.post('/gettopic_comment', topic.gettopic_comment)
router.post('/ReplyDetail', topic.ReplyDetail)

router.post('/addCategoryTpoic', topic.addCategoryTpoic)
router.get('/searchTopic', topic.searchTopic)
//更新帖子
router.post('/updateTopic', topic.updateTopic)
//根据id获取帖子
router.get('/getTopicById', topic.getTopicById)

//根据id获取帖子
router.post('/delteTopicById', topic.delteTopicById)

// console.log("1333")

module.exports = router