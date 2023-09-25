const Joi = require("joi");

const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().max(50).required(),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password must match",
    }),
  verification_code: Joi.number().integer().required(),
});

export default resetPasswordSchema;
