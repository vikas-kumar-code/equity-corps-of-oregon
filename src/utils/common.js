const pathJoin = (...parts) => {
  return parts.join("/").replace(/\/+/g, "/");
};

const params = {
  templateId: {
    sendCaseInvitation: 1,
    forgotPassword: 2,
    attorneyOnBoard: 3,
  },
};

const common = {
  params: params,
  pathJoin: pathJoin,
  //return API full path
  apiPath: (path = "") => {
    return process.env.NEXT_PUBLIC_API_URL + "/" + pathJoin("api", path);
  },
  //return app path
  basePath: (path = "") => {
    return pathJoin(process.cwd(), path);
  },
  //return public path
  publicPath: (path = "") => {
    return pathJoin(process.cwd(), "public", path);
  },
  downloadLink: (path) => {
    return pathJoin(process.cwd(), "api", "admin", "download", path);
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
  exclude: (modelData, keys) => {
    return Object.fromEntries(
      Object.entries(modelData).filter(([key]) => !keys.includes(key))
    );
  },
};

export default common;
