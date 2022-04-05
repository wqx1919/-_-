const express = require('express')
const router = express.Router()
// 导入路由处理函数模块
const admin_handler = require('../router_handler/admin')
router.post('/AdminBan', admin_handler.AdminBan)
router.get('/AdminUser', admin_handler.AdminUser)

router.get('/AdminMessage', admin_handler.AdminMessage)
router.get('/AdminIsReason', admin_handler.AdminIsReason)
router.post('/AdminAddUnblock', admin_handler.AdminAddUnblock)


module.exports = router
