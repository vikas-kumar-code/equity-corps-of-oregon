const { default: common } = require("./common");

/* 
  This function is used to validate form fields.
*/
const validateAsync = async (schema, data, options = {}) => {
  try {
    const validatedFields = await schema.validateAsync(data, {
      abortEarly: false,
      allowUnknown: true,
      ...options,
    });
    return validatedFields;
  } catch (error) {
    return {
      errors: common.getErrors(error),
    };
  }
};

export default validateAsync;
