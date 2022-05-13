var express = require('express');
var router = express.Router();
router.get("/api",function(req,res,next){
     console.log(req)
})
module.exports = router;   //暴露接口