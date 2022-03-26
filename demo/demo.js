const Joi = require("@hapi/joi");

const createProfileSchema = Joi.object().keys({
  password: Joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "any.required": `"password" is a required field`
    })
});

const validationResult = createProfileSchema.validate(
  { password: 123456 },
  { abortEarly: false }
);
const u = Joi.string().pattern(/^[\S]{6,12}$/).required().messages({
    "string.base": `"name" sh`,
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"sex" is a required field`
  })
  const u2 = u.validate(
    { name: '123456' ,email:'',sex:'9'},
    { abortEarly: false }
  );
const expressJoi = require('@escook/express-joi')
const results = expressJoi(createProfileSchema)
console.log(u2.error);
console.log(validationResult.error);