import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import common from "@/utils/common";

export async function PUT(request, data) {
  let response = {};
  const prisma = new PrismaClient();
  const questionId = Number(data.params.id) || null;

  try {
    if (questionId) {
      let updateData = await request.json();
      // Validation
      const schema = Joi.object({
        question: Joi.string().max(400).required(),
        options: Joi.array()
          .items(Joi.string().max(400).label("Option"))
          .min(2)
          .max(10)
          .required(),
        answer: Joi.number().min(1).required().messages({
          "number.base": "Select a correct answer.",
        }),
      });
      updateData = await schema.validateAsync(updateData, {
        abortEarly: false,
      });
      // Create a new question with options
      await prisma.options.deleteMany({
        where: {
          question_id: questionId,
        },
      });
      const question = await prisma.questions.update({
        where: { id: questionId },
        data: {
          question: updateData.question,
          options: {
            create: updateData.options.map((opt, index) => {
              return { option: opt, status: index + 1 === updateData.answer };
            }),
          },
        },
      });
      if (updateData) {
        response.success = true;
        response.message = "Question udpated successfully.";
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
