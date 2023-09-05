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
  }
) => {
  try {
    const validatedFields = await schema.validateAsync(data, {
      abortEarly: options.abortEarly,
      allowUnknown: options.allowUnknown,
    });
    return validatedFields;
  } catch (error) {
    return {
      errors: common.getErrors(error, { arrayKey: options.errorKey }),
    };
  }
};

export default validateAsync;
