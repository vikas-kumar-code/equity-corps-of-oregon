import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import common from "@/utils/common";
import Joi from "joi";

import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    const schema = Joi.object({
      registration: Joi.object().required(),
      attorney_answers: Joi.object().required(),
    });
    const fields = await schema.validateAsync(data, { abortEarly: true });
    await prisma.$transaction(async (tx) => {
      await tx.users.create({
        data: {
          ...fields.registration,
          languages_supports: fields?.registration?.languages_supports.join(','),
          attorney_answers: Object.entries(fields.attorney_answers).map(
            (ans) => {
              return {
                question_id: Number(ans[0]),
                answer_id: Number(ans[1]),
              };
            }
          ),
        },
      });
      response.success = true;
      response.message = "Registration submitted successfully.";
    });
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
