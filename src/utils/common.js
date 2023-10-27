const pathJoin = (...parts) => {
  return parts.join("/").replace(/\/+/g, "/");
};

const params = {
  templateId: {
    sendCaseInvitation: 1,
    forgotPassword: 2,
    attorneyOnBoard: 3,
    invoiceForApproval: 4,
  },
  recordPerPage: 20,
  allowedExtensions: ["docx", "doc", "xl", "xls", "jpg", "jpeg", "png", "pdf"],
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
  getErrors: (errors, options = { removeString: "" }) => {
    let outputErrors = {};
    if (Array.isArray(errors?.details)) {
      errors?.details.forEach((err, index) => {
        outputErrors = {
          ...outputErrors,
          [err.path.join("")]:
            err.message
              .replace(/\[[^\]]*\]/g, "")
              .replace(/\./g, " ")
              .replace(/"/g, "")
              .replace(/_/g, " ")
              .replace(options.removeString, "") + ".",
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
    let recordPerPage = params.recordPerPage;
    let pageNumber = 1;
    let skip = 0;
    try {
      pageNumber = parseInt(
        request?.nextUrl?.searchParams?.get("page") ||
          request?.get("page") ||
          pageNumber
      );
      recordPerPage = parseint(
        request?.nextUrl?.searchParams?.get("recordPerPage") ||
          request?.get("recordPerPage") ||
          recordPerPage
      );
    } catch {}
    skip = pageNumber * recordPerPage - recordPerPage;
    return {
      skip: skip,
      take: recordPerPage,
    };
  },
  // Exclude columns from record.
  excludeColumns: (modelData, keys) => {
    return Object.fromEntries(
      Object.entries(modelData).filter(([key]) => !keys.includes(key))
    );
  },
  sn: (searchParams, index = 0) => {
    return (
      parseInt(searchParams?.get("page") || 1) *
        parseInt(params.recordPerPage) -
      parseInt(params.recordPerPage) +
      Number(index + 1)
    );
  },
  currencyFormat: (number, fixed = 0) => {
    if (number) {
      return number
        ? `$${Number(number).toLocaleString("en-US", {
            minimumFractionDigits: fixed,
          })}`
        : "";
    } else {
      return "$0.00";
    }
  },
  currencyToNumber: (currency) => {
    return (currency || "").replace(/[^0-9.]/g, "");
  },
  parseDecimalInput: (value = "") => {
    return value.replace(/[^0-9.]|(\.(?=.*\.))/g, "");
  },
};

export default common;
