import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import emailTemplateSchema from "@/joi/emailTemplateSchema";

export async function POST(request) {
  let response = {};
  try {
    let data = await request.json();
    const validated = await validateAsync(emailTemplateSchema, data);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const result = await prisma.email_templates.create({
        data: {
          subject: validated.subject,
          from_email: validated.from_email,
          from_label: validated.from_label,
          content: validated.content,
        },
      });
      if (result) {
        response.success = true;
        response.message = "Template added successfully.";
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
