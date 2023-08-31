import { NextResponse } from "next/server";

import Joi from "joi";
import common from "@/utils/common";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  const data = await request.json();
  console.log(data.content);
  try {
    // Validation
    const schema = Joi.object({
      content: Joi.string().required(),
    });
    const fields = await schema.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const contract = await prisma.contracts.upsert({
      where: {
        id: 1,
      },
      update: {
        content: fields.content,
      },
      create: {
        content: fields.content,
      },
    });
    if (contract) {
      response.success = true;
      response.message = "Contract udpated successfully.";
    } else {
      response.error = true;
      response.message = "Something went wrong. please try again.";
    }
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
