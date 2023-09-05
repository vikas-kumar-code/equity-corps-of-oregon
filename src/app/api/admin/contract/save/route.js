import { NextResponse } from "next/server";
import Joi from "joi";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

export async function POST(request) {
  let response = {};
  const data = await request.json();
  try {
    // Validation
    const schema = Joi.object({
      content: Joi.string().required(),
    });
    const fields = await validateAsync(schema, await request.json());
    if (fields.errors) {
      response.error = true;
      response.message = fields.errors;
    } else {
      const udpatedData = await prisma.contracts.upsert({
        where: {
          id: 1,
        },
        update: {
          content: data.content,
        },
        create: {
          content: data.content,
        },
      });
      response.success = true;
      response.message = "Contract udpated successfully.";
      response.data = udpatedData;
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
