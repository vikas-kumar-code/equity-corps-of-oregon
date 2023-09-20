const Joi = require("joi");

const maxMilestones = 4;
const maxDocuments = 5;

const casesSchema = Joi.object({
  title: Joi.string().max(255).required(),
  case_number: Joi.string().required(),
  maximum_compensation: Joi.number().min(1).required(),
  description: Joi.string().optional().allow(null,""," "),
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
});

const casesSchemaForm1 = Joi.object({
  title: Joi.string().max(255).required(),
  case_number: Joi.string().required(),
  maximum_compensation: Joi.number().min(1).required(),  
  description: Joi.string().optional().allow(null,""," "),
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

const invoiceSchema = Joi.object({
  due_on: Joi.date().required(),
  particulars: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().min(0).required().label("Amount"),
      })
    )
    .min(1)
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
  invoiceSchema,
  invoicePaymentSchema,
};
