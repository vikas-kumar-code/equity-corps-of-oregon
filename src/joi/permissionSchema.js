const Joi = require("joi");

const permissionSchema = Joi.object({
    permissions: Joi.array().items({
        role_id: Joi.number().required(),
        route_id: Joi.number().required()
    })
})

export default permissionSchema;