const Joi = require("joi");

const updateProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export default updateProfileSchema;
