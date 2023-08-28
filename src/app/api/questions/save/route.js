import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import common from "@/utils/common";
import Joi from "joi";

const prisma = new PrismaClient();

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    const schema = Joi.object({
      registration: Joi.array().required(),
      answers: Joi.array().required(),
    });
    const fields = await schema.validateAsync(data, { abortEarly: true });
    await prisma.$transaction(async (tx) => {
      await tx.users.create({
        data: {
          ...fields.registration,
          attorney_answers: fields.attorney_answers.map((item) => {
            return {
              question_id: item.question_id,
              answer_id: item.answer_id,
            };
          }),
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
