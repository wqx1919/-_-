
const express = require('express')
const router = express.Router()

// 导入follow 路由处理函数对应的模块
const follow = require('../router_handler/follow')
router.get('/getfollow', follow.getfollow)
router.get('/getisfollow', follow.getisfollow)
router.post('/postaddfollow', follow.postaddfollow)

router.get('/getUserCategory', follow.getUserCategory)

router.get('/getFollowCategory', follow.getFollowCategory)


module.exports = router
