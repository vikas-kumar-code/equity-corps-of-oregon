import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import common from "@/utils/common";
import emailSchema from "@/joi/emailSchema";
import moment from "moment";
import sendMail from "@/utils/sendMail";

const prisma = new PrismaClient();

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    const fields = await emailSchema.validateAsync(data, {
      allowUnknown: true,
      abortEarly: true,
    });
    const userModel = await prisma.users.findUnique({
      where: {
        email: fields.email,
      },
    });
    if (userModel) {
      const user = await prisma.users.update({
        where: {
          email: fields.email,
        },
        data: {
          verification_code: String(getRndInteger(1000, 9999)),
          code_valid_till: moment().add(15, "minutes"),
        },
      });
      await sendMail({
        to: "mitizdeveloper@gmail.com", //userModel.email,
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
  } catch (error) {
    response.error = true;
    response.message = await common.getErrors(error);
  }
  return NextResponse.json(response);
}
