const { type } = require('os')
const db = require('../db/index')
// 新加评论
exports.addtopic_comment = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    // const content =  req.body.content
    // const sql = `select * from comment where id=? `
    let sql=""
    // console.log(req.body.type==="comment")
    if(req.body.type==="comment"){
        sql = `insert into comment set ?`
    }
    else{
     sql = `insert into reply set ?`
    }
    const data ={}
    //   // 调用 db.query() 执行 SQL 语句
      console.log(req.body)
    //   console.log(req.user.id)
    delete req.body['type']
      db.query(sql, {...req.body,from_user_id:req.user.id }, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 判断影响的行数
        if (results.affectedRows !== 1) return res.cc('新增评论失败！')
        // 成功
        res.cc('新增评论成功', 0)
      })
  
  }
// 删除评论分类的处理函数
exports.deletecommentById = (req, res) => {
    // 定义标记删除的 SQL 语句
    let sql=""
    if(req.query.type==='comment'){
        sql = `update comment set status=0 where id=?`
    }
    else{
     sql = `update reply set status=0 where id=?`
    }
    delete req.body['type']
    // console.log(req.query)

    // console.log(req.body)
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.query.id, (err, results) => {
        // console.log(sql)
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除评论失败！')
        res.cc('删除评论成功！', 0)
    })
}
//头像上传图片的地址
var fs = require("fs");  //文件模块
exports.addcomentfile=(req, res)=> {
  // console.log(req.file)
    // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // console.log(req.body)
    var oldpath = req.file.path; //file就是我们刚在前台模板里面配置的后台接受的名称；
    var extnameorr = req.file.originalname; //因为multer这个时候存在我们刚路径上的，只是一个path，还没有具体的扩展名，如：2.png这样的
    var newFilename =  req.file.filename;
    var tem = extnameorr.indexOf('.');
    // console.log(extnameorr)
    // // console.log(tem);
    var  extname =extnameorr.substring(tem);
    // console.log("files参数："+extname+"\n")
    //新的路径由组成：原父路径 + 拓展名
    // var newpath = "./public/images/avatar/" +newFilename+ extname;
    let OldFolderPath = req.file.destination;
    var newpath = OldFolderPath +newFilename+ extname;
    // var newpath = oldpath + extname;
    // var newpath =oldpath + extname;
    //改名
    let message=[]
    fs.rename(oldpath, newpath, function(err) { //把之前存的图片换成真的图片的完整路径
        if(err)
        res.cc(err)
        var mypath = newpath.replace("./public","http://127.0.0.1:8008");//context.ip是我自己设置的后台的ip名，根据环境，可以是localhost,也可以是电脑ip
        // console.log(newpath)
       message.push({data:mypath})
        res.send({errno:0,data:[mypath]}) //返回图片路径，让前端展示
    });

    // console.log(req.file)
    // console.log(req.body,"\n",req.files)
    // req.body 将具有文本域数据，如果存在的话
     // 1. 定义更新头像的 SQL 语句
      // const sql = `update user set avtar=? where id=?`
      // // 2. 调用 db.query() 执行 SQL 语句
      // var mypath = newpath.replace("./public","");
      // db.query(sql, [mypath, req.user.id], (err, results) => {
      //   // 执行 SQL 语句失败
      //   if (err) return res.cc(err)
      //   // 影响的行数是否等于 1
      //   if (results.affectedRows !== 1) return res.cc('上传图片失败！')
      //   // 成功
      //   message.push({mysql:'上传图片成功！'})
      //   res.cc(message)
      // })
  }

  