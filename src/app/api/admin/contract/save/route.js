import { NextResponse } from "next/server";

import Joi from "joi";
import common from "@/utils/common";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  const data = await request.json();
  try {
    // Validation
    const schema = Joi.object({
      content: Joi.string().required(),
    });
    const fields = await schema.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const contract = await prisma.contracts.findUnique({ where: { id: 1 } });
    if (contract) {
      await prisma.contracts.update({
        where: {
          id: 1,
        },
        data: {
          content: fields.content,
        },
      });
    } else {
      await prisma.contracts.create({
        data: {
          content: fields.content,
        },
      });
    }

    response.success = true;
    response.message = "Contract udpated successfully.";
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
