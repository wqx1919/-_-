// 导入定义验证规则的包
const { any } = require('joi');
const joi = require('joi')

// 定义用户名和密码的验证规则
const account = joi.string().alphanum().min(1).max(10).required().error(new Error('用户名必填，且值只能是包含 a-zA-Z0-9 的字符串位数是0-10'))
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required().error(new Error('密码必填，且是6-12位的'))

var schema = joi.object().keys({
  password: joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.empty":
            err.message = "Value should not be empty!";
            break;
          case "string.pattern":
            err.message = `密码必须二到6位`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

});

// 定义 id, nickname, email 的验证规则
// const id = joi.number().integer().min(1).required()
const id = joi.string().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()
const sex = joi.number().valid('男', '女').required()
const datetime = joi.date().min('1-1-1974').max('now').required().error(new Error('日期格式错误'))
// const datetime= {
//   joi.date().format("MM/DD/YYYY").raw().required().max(<a specific date value>).min(<Another Date Value>).messages(errorMessages),
//   joi.any().valid('01/01/1901', '12/12/2020')
// }



// console.log(joi.date())
// 定义验证 avatar 头像的验证规则
const avatar = joi.string().dataUri().required()
// console.log(datetime)
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    account,
    password,
  },
}
exports.register_schema = {
  body: {
    account,
    password,
    id,
    email: user_email,
    // create_at: datetime,
    // Birthday: datetime,
  },
}
// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  // 需要对 req.body 里面的数据进行验证
  body: {
    sex,
    email: user_email,
    // Birthday:datetime
    // Birthday:datetime
  },
}

// 验证规则对象 - 更新密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password).error(new Error("新旧密码不能一样")),
  },
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}
