const expressJoi = require('@escook/express-joi')
const { register_schema,reg_login_schema } = require('../schema/user')
const user =require("../router_handler/user")
// const { reg_login_schema } = require('../schema/user')
module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    app.use("/ueditor", require("../router_handler/ueditor"));
    // app.use("/", require("./qidian"));
}