const { default: common } = require("./common");

/* 
  This function is used to validate form fields.
*/
const validateAsync = async (
  schema,
  data,
  defaultOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    removeString: "",
  }
) => {
  let options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
    removeString: "",
    ...defaultOptions,
  };
  try {
    const validatedFields = await schema.validateAsync(data, {
      abortEarly: options?.abortEarly,
      allowUnknown: options?.allowUnknown,
      stripUnknown: options?.stripUnknown,
    });
    return validatedFields;
  } catch (error) {
    return {
      errors: common.getErrors(error, {
        removeString: options.removeString,
      }),
    };
  }
};

export default validateAsync;
