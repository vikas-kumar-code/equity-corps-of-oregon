const Joi = require("joi");

const permissionSchema = Joi.object({
    routesId: Joi.array().length(1)
})

export default permissionSchema;