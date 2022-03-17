
const express = require('express')
const router = express.Router()

// 导入thumbs 路由处理函数对应的模块
const thumbs = require('../router_handler/thumbs')

router.get('/AllTopicThumbs', thumbs.AllTopicThumbs)
router.get('/Allthumbs', thumbs.Allthumbs)
router.get('/getthumbs', thumbs.getthumbs)
router.get('/getUnthumbs', thumbs.getthumbs)
router.get('/getisthumbs', thumbs.getisthumbs)
router.post('/postaddthumbs', thumbs.postaddthumbs)
router.post('/thumbsdemo', thumbs.thumbsdemo)
module.exports = router
