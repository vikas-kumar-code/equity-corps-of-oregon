const common = {
  //Return API full path
  apiPath: (path = "") => {
    if (path && path[0] !== "/") {
      path = "/" + path;
    }
    return process.env.NEXT_PUBLIC_API_URL + "/api" + path;
  },
  //Return public path
  basePath: (path = "") => {
    if (path && path[0] !== "/") {
      path = "/" + path;
    }
    return process.cwd() + path;
  },
  //Return public path
  publicPath: (path = "") => {
    if (path && path[0] !== "/") {
      path = "/" + path;
    }
    return process.cwd() + "/public" + path;
  },

  // create JOI errors in custom format.
  getErrors: (errors, options = { arrayKey: false }) => {
    let outputErrors = {};
    if (Array.isArray(errors?.details)) {
      errors?.details.forEach((err, index) => {
        outputErrors = {
          ...outputErrors,
          [options.arrayKey ? err.path.join("") : err.path[0]]: err.message
            .replace(/\[[^\]]*\]/g, "")
            .replace(/\./g, " ")
            .replace(/"/g, "")
            .replace(/_/g, " "),
        };
      });
    } else if (errors?.message && typeof errors.message === "string") {
      outputErrors = errors?.message;
    } else if (typeof errors === "string") {
      outputErrors = errors;
    } else {
      outputErrors = "Something went wrong. Please try again.";
    }
    return outputErrors;
  },

  // This function returns prisma pgination properties
  paginate: (request) => {
    const pageNo =
      request?.nextUrl?.searchParams?.get("page") || request?.get("page") || 1;
    const recordPerPage =
      request?.nextUrl?.searchParams?.get("recordPerPage") ||
      request?.get("recordPerPage") ||
      10;
    const pageNumber = parseInt(pageNo);
    const skip = pageNumber * recordPerPage - recordPerPage;
    return {
      skip: skip,
      take: recordPerPage,
    };
  },
};

export default common;
