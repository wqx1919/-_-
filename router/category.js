
const express = require('express')
const router = express.Router()

// 导入分类路由处理函数对应的模块
const category = require('../router_handler/category')
router.get('/getcategory', category.getcategory)
router.get('/getcategory_topic', category.getcategory_topic)
router.post('/addNewCategorTopic', category.addNewCategorTopic)
router.get('/getCategorybookName', category.getCategorybookName)
module.exports = router
