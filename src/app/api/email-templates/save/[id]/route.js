import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import common from "@/utils/common";

export async function PUT(request, data) {
  let response = {};
  const prisma = new PrismaClient();
  const recordId = Number(data.params.id) || null;

  try {
    if (recordId) {
      let updateData = await request.json();
      // Validation
      const schema = Joi.object({
        id: Joi.number().required(),
        subject: Joi.string().required(),
        from_email: Joi.string().required(),
        from_label: Joi.string().required(),
        content: Joi.string().required()
      });
      const data = await schema.validateAsync(updateData, {
        abortEarly: false,
      });

      const result = await prisma.email_templates.update({
        where: { id: recordId },
        data: {
          subject: data.subject,
          from_email: data.from_email,
          from_label: data.from_label,
          content: data.content
        },
      });
      if (result) {
        response.success = true;
        response.message = "Template udpated successfully.";
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = await common.gerErrors(error);
  }
  return NextResponse.json(response);
}
