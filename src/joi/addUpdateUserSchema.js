const Joi = require("joi");

const addUpdateUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional(),
  confirm_password: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required(),
});

const addUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required().label('role'),
});

const updateUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional(),
  confirm_password: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required().label('role'),
});

export default addUpdateUserSchema;
export { addUserSchema, updateUserSchema };
