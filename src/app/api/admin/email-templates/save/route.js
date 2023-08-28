import { NextResponse } from "next/server";

import Joi from "joi";
import common from "@/utils/common";

export async function POST(request) {
  let response = {};
  import prisma from "@/utils/prisma";
  try {
    let data = await request.json();
    const schema = Joi.object({
      subject: Joi.string().required(),
      from_email: Joi.string().required(),
      from_label: Joi.string().required(),
      content: Joi.string().required()
    });
    data = await schema.validateAsync(data, { abortEarly: false });
    // Create a new question with options
    const result = await prisma.email_templates.create({
      data: {
        subject: data.subject,
        from_email: data.from_email,
        from_label: data.from_label,
        content: data.content
      },
    });
    if (result) {
      response.success = true;
      response.message = "Template added successfully.";
    }
  } catch (error) {
    response.error = true;
    response.message = await common.gerErrors(error);
  }
  return NextResponse.json(response);
}
