import { NextResponse } from "next/server";

import common from "@/utils/common";
import emailSchema from "@/joi/emailSchema";
import moment from "moment";
import sendMail from "@/utils/sendMail";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    const validated = await validateAsync(emailSchema, data);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const userModel = await prisma.users.findUnique({
        where: {
          email: validated.email,
        },
      });
      if (userModel) {
        const user = await prisma.users.update({
          where: {
            email: validated.email,
          },
          data: {
            verification_code: String(getRndInteger(1000, 9999)),
            code_valid_till: moment().add(15, "minutes"),
          },
        });
        await sendMail({
          to: userModel.email,
          templateId: common.params.templateId.forgotPassword,
          modelsData: {
            users: user,
          },
        });
        response.success = true;
        response.message = "Registration submitted successfully.";
      } else {
        response.error = true;
        response.message = { email: "This email is not registered with us." };
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
