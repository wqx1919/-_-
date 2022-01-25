// const expressJoi = require('@escook/express-joi')
// const { register_schema,reg_login_schema } = require('../schema/user')
// const user =require("../routerhanler/user")
// // const { reg_login_schema } = require('../schema/user')
// module.exports = function(app) {
//     app.get('/', function(req, res, next) {
//         res.render('index', { title: 'Express' });
//     });
//     app.use("/ueditor", require("./ueditor"));
//     app.use("/api", require("./topic"));
//     // const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
//     app.use("/api/register", expressJoi(register_schema),user.register);
//     app.use("/api/login", expressJoi(reg_login_schema),user.login);
//     // app.use("/", require("./qidian"));
// }