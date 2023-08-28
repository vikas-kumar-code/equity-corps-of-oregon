import { NextResponse } from "next/server";

import Joi from "joi";
import common from "@/utils/common";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    let data = await request.json();
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
    data = await schema.validateAsync(data, { abortEarly: false });
    // Create a new question with options
    const addQuestion = await prisma.questions.create({
      data: {
        question: data.question,
        options: {
          create: data.options.map((opt, index) => {
            return { option: opt, status: index+1 === data.answer };
          }),
        },
      },
    });
    if (addQuestion) {
      response.success = true;
      response.message = "New question added successfully.";
    }
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
