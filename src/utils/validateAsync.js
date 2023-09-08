const { default: common } = require("./common");

/* 
  This function is used to validate form fields.
*/
const validateAsync = async (
  schema,
  data,
  options = {
    errorKey: false,
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
  }
) => {
  try {
    const validatedFields = await schema.validateAsync(data, {
      abortEarly: options?.abortEarly ? options?.abortEarly : false,
      allowUnknown: options?.allowUnknown ? options?.allowUnknown : true,
      stripUnknown: options?.stripUnknown ? options?.stripUnknown : false,
    });
    return validatedFields;
  } catch (error) {
    return {
      errors: common.getErrors(error, { arrayKey: options.errorKey }),
    };
  }
};

export default validateAsync;
