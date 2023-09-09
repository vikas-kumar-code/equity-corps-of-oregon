import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import emailTemplateSchema from "@/joi/emailTemplateSchema";

export async function PUT(request, data) {
  let response = {};
  const recordId = Number(data.params.id) || null;
  try {
    if (recordId) {
      const formData = await request.json();
      const validated = await validateAsync(emailTemplateSchema, formData);
      if (validated.errors) {
        response.error = true;
        response.message = validated.errors;
      } else {
        const result = await prisma.email_templates.update({
          where: { id: recordId },
          data: {
            subject: validated.subject,
            from_email: validated.from_email,
            from_label: validated.from_label,
            content: validated.content,
          },
        });
        if (result) {
          response.success = true;
          response.message = "Template udpated successfully.";
        }
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
