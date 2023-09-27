const Joi = require("joi");

const addUpdateUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().optional(),
  confirm_password: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required(),
  verified: Joi.number().min(0).max(1).required(),
});

const addUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required().label('role'),
  verified: Joi.number().min(0).max(1).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().optional(),
  confirm_password: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Confirm password doest not match",
  }),
  status: Joi.number().required(),
  role_id: Joi.number().required().label('role'),
  verified: Joi.number().min(0).max(1).required(),
});

export default addUpdateUserSchema;
export { addUserSchema, updateUserSchema };
