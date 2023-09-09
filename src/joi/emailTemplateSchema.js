const Joi = require("joi");

const emailTemplateSchema = Joi.object({
  subject: Joi.string().required(),
  from_email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  from_label: Joi.string().required(),
  content: Joi.string().required(),
});

export default emailTemplateSchema;
