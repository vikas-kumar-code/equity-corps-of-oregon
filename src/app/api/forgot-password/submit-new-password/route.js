import { NextResponse } from "next/server";
import resetPasswordSchema from "@/joi/resetPasswordSchema";
import { hash } from "bcrypt";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    const validated = await validateAsync(resetPasswordSchema, data);
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
        if (userModel.code_valid_till) {
          if (new Date() <= new Date(userModel.code_valid_till)) {
            if (
              Number(userModel.verification_code) ===
              Number(validated.verification_code)
            ) {
              const user = await prisma.users.update({
                where: {
                  email: validated.email,
                },
                data: {
                  verification_code: null,
                  code_valid_till: null,
                  password: await hash(validated.password, 10),
                },
              });
              if (user) {
                response.success = true;
                response.message = "Your password has been successfully reset.";
              } else {
                response.error = true;
                response.message = "Something went wrong. please try again.";
              }
            } else {
              response.error = true;
              response.message = {
                verification_code: "Verification code is invalid.",
              };
            }
          } else {
            response.error = true;
            response.message = {
              verification_code: "Verification code has been expired.",
            };
          }
        } else {
          response.error = true;
          response.message = "Invalid submission.";
        }
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
