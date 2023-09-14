import { NextResponse } from "next/server";

import Joi from "joi";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

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

    const validated = await validateAsync(schema, data);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      // Create a new question with options
      const addQuestion = await prisma.questions.create({
        data: {
          question: validated.question,
          options: {
            create: validated.options.map((opt, index) => {
              return { option: opt, status: index + 1 === validated.answer };
            }),
          },
        },
      });
      if (addQuestion) {
        response.success = true;
        response.message = "New question added successfully.";
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
