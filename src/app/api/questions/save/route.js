import { NextResponse } from "next/server";
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
    const userModel = await prisma.users.findUnique({
      where: {
        email: fields.registration.email,
      },
    });

    if (userModel) {
      response.error = true;
      response.message =
        "User is already registered with this email. Please try a different email.";
    } else {
      await prisma.$transaction(async (tx) => {
        const practice_areas = fields.registration.practice_areas.map(
          (item) => item.value
        );
        const languages_supports = fields.registration.languages_supports.map(
          (item) => item.value
        );
        await tx.users.create({
          data: {
            ...fields.registration,
            languages_supports: languages_supports.join(", "),
            attorney_answers: {
              create: Object.entries(fields.attorney_answers).map((ans) => {
                return {
                  question_id: Number(ans[0]),
                  answer_id: Number(ans[1]),
                };
              }),
            },
            practice_areas: practice_areas.join(", "),
            role_id: 2,
            status: 0,
            name:
              fields.registration?.first_name +
              " " +
              fields.registration?.last_name,
          },
        });
        response.success = true;
        response.message = "Registration submitted successfully.";
      });
    }
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
