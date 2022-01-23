var express = require('express');
var multer = require('multer')
var router = express.Router();
var formidable = require('formidable');  //上传图片处理的插件
var fs = require("fs");  //文件模块
var path = require('path')
const upload = multer({ dest: './public/images/wang/' })
// var context = require('../public/javascripts/context'); //环境的一些配置
//wangeditor上传图片的地址
router.use(upload.any())
router.post('/wangeditor/upload', function (req, res, next) {
    // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // console.log(req.body)
    console.log(req.body,"\n",req.files)
    // req.body 将具有文本域数据，如果存在的话
  })




module.exports = router;   //暴露接口