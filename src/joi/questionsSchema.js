const Joi = require('joi')

const questionSchema = Joi.object({
    registration: Joi.object().required(),
    attorney_answers: Joi.object().required(),
  });

export default questionSchema;