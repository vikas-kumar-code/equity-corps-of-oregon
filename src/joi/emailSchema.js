const Joi = require("joi");

const emailSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});

export default emailSchema;
