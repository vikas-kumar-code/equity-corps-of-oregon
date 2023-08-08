const common = {
  //Return API full path
  apiPath: (path = "") => {
    if (path && path[0] !== "/") {
      path = "/" + path;
    }
    return process.env.NEXT_PUBLIC_API_URL + path;
  },

  // create JOI errors in custom format.
  gerErrors: async (errors) => {
    let outputErrors = {};
    if (Array.isArray(errors?.details)) {
      errors?.details.forEach((err, index) => {
        outputErrors = {
          ...outputErrors,
          [err.path.join("")]: err.message
            .replace(/[\[]/g, " ")
            .replace(/[\]"]/g, ""),
        };
      });
    } else if (errors?.message && typeof errors.message === "string") {
      outputErrors = errors?.message;
    } else if (typeof errors === "string") {
      outputErrors = errors;
    } else {
      outputErrors = "Something went wrong. Please try again.";
    }
    return await outputErrors;
  },

  paginate: (request) => {
    const pageNo = request?.nextUrl?.searchParams?.get("page") || request?.get("page") || 1;
    const recordPerPage = request?.nextUrl?.searchParams?.get("recordPerPage") || request?.get("recordPerPage") || 10;
    const pageNumber = parseInt(pageNo);
    const skip = pageNumber * recordPerPage - recordPerPage;
    return {
      skip: skip,
      take: recordPerPage,
    };
  },
};

export default common;
