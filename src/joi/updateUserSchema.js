const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    confirm_password: Joi.ref("password"),
    status: Joi.number().required(),
    role_id: Joi.number(),
  });

  export default userSchema;