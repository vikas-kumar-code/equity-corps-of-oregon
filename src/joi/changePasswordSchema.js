const Joi = require("joi");
const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string()
    .required(),
  confirm_password: Joi.any()
    .valid(Joi.ref("new_password"))
    .required()
    .messages({
      "any.only": "Confirm password doest not match",
    }),
});

export default changePasswordSchema;
