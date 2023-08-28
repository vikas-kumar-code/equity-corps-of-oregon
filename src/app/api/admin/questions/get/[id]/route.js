import { NextResponse } from "next/server";


import prisma from "@/utils/prisma";

export async function GET(request, data) {
  let response = {};
  try {
    const record = await prisma.questions.findUnique({
      where: {
        id: Number(data.params.id),
      },
      include: {
        options: true,
      },
    });
    let answer = '';
    record.options.forEach((opt, index) => {
      if (opt.status) {
        answer = index + 1;
      }
    });
    if (record) {
      response.success = true;
      response.data = {
        question: record.question,
        options: record.options.map((opt) => opt.option),
        answer: answer,
      };
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
