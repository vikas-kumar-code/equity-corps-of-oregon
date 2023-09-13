const Joi = require("joi");

const permissionSchema = Joi.object({
    routesId: Joi.array().length(1).messages({
        required: 'Please select atleast one permission',
      }),
})

export default permissionSchema;