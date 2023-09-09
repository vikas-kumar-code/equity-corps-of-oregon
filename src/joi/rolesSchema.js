const Joi = require('joi')

const rolesSchema = Joi.object({
    name: Joi.required(),
    status: Joi.number().required(),
})

export default rolesSchema;