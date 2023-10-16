const Joi = require("joi");

const maxMilestones = 4;
const maxDocuments = 200;

const casesSchema = Joi.object({
  title: Joi.string().max(255).required(),
  case_number: Joi.string().required(),
  hourly_rate: Joi.number().min(0).optional().allow("",null),
  maximum_compensation: Joi.number().min(1).required(),
  description: Joi.string().optional().allow(null, "", " "),
  status: Joi.number().integer().default(1),
  milestones: Joi.array()
    .items(
      Joi.object({
        milestone_date: Joi.date().required(),
        comment: Joi.string().max(200).required(),
      })
    )
    .min(1)
    .max(maxMilestones)
    .required(),
  documents: Joi.array()
    .items(
      Joi.object({
        document_name: Joi.string().max(200).required(),
        file_name: Joi.string().max(200).required(),
        uploaded_file: Joi.string().optional(),
        uploaded_on: Joi.date().required(),
      })
    )
    .min(1)
    .max(maxDocuments)
    .required(),

      // clients: Joi.array()
      //   .items(
      //     Joi.object({
      //       first_name: Joi.string().optional(),
      //       laste_name: Joi.string().optional(),
      //       dob: Joi.date().optional()
      //     })
      //   )
      //   .min(1)
      //   .required(),
});

const casesSchemaForm1 = Joi.object({
  title: Joi.string().max(255).required(),
  case_number: Joi.string().required(),
  hourly_rate: Joi.number().min(0).optional().allow(""),
  maximum_compensation: Joi.number().min(1).required(),
  hourly_rate: Joi.number().optional().allow(null, "", " "),
  description: Joi.string().optional().allow(null, "", " "),
});

const casesSchemaForm2 = Joi.object({
  milestones: Joi.array()
    .items(
      Joi.object({
        milestone_date: Joi.date().required(),
        comment: Joi.string().max(200).required(),
      })
    )
    .min(1)
    .max(maxMilestones)
    .required(),
});

const casesSchemaForm3 = Joi.object({
  documents: Joi.array()
    .items(
      Joi.object({
        document_name: Joi.string().max(100).required(),
        file_name: Joi.string().max(200).required(),
        uploaded_file: Joi.string().optional(),
        uploaded_on: Joi.date().required(),
      })
    )
    .min(1)
    .max(maxDocuments)
    .required(),
});

function caseClientsValidation(fields) {
  let errs = {};
  fields?.clients?.forEach((item, index) => {
    if (!item?.first_name) {
      errs["clients" + index + "first_name"] =
        "First Name is not allowed to be empty.";
    }
    if (!item?.last_name) {
      errs["clients" + index + "last_name"] =
        "Last Name is not allowed to be empty.";
    }
    if (!item?.dob) {
      errs["clients" + index + "dob"] = "DOB can not be blank.";
    }
  });
  if (Object.entries(errs).length > 0) {
    return {
      error: Object.entries(errs).length > 0,
      messages: errs,
    };
  } else {
    return fields;
  }
}

const invoicePaymentSchema = Joi.object({
  total_amount: Joi.number().min(0).required().label("amount"),
});

export default casesSchema;

export {
  casesSchemaForm1,
  casesSchemaForm2,
  casesSchemaForm3,
  caseClientsValidation,
  invoicePaymentSchema,
};
