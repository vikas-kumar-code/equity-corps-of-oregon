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

    prisma.$transaction(async (tx)=>{
      await tx.attorney_answers.create({
        
      })
    })

    // const registration = await prisma.questions.create({
    //   data: {
    //     question: data.question,
    //     options: {
    //       create: data.options.map((opt, index) => {
    //         return { option: opt, status: index + 1 === data.answer };
    //       }),
    //     },
    //   },
    // });
    // if (addQuestion) {
    //   response.success = true;
    //   response.message = "New question added successfully.";
    // }
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
