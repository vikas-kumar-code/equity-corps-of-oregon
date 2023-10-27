const Joi = require("joi");

const maxMilestones = 4;
const maxDocuments = 200;

const casesSchema = Joi.object({
  title: Joi.string().max(255).required(),
  case_number: Joi.string().required(),
  hourly_rate: Joi.number().min(0).optional().allow("", null),
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

  clients: Joi.array()
    .items(
      Joi.object({
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        dob: Joi.string().optional().allow("", null),
      })
    )
    .min(1)
    .required(),
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
  clients: Joi.array()
    .items(
      Joi.object({
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        dob: Joi.date().optional().allow("", null),
      })
    )    
    .min(1)
    .required(),
});

const casesSchemaForm3 = Joi.object({
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

const casesSchemaForm4 = Joi.object({
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

const invoicePaymentSchema = Joi.object({
  total_amount: Joi.number().min(0).required().label("amount"),
});

export default casesSchema;

export {
  casesSchemaForm1,
  casesSchemaForm2,
  casesSchemaForm3,
  casesSchemaForm4,  
  invoicePaymentSchema,
};
