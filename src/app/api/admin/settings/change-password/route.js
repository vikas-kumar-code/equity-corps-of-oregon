import { NextResponse } from "next/server";
import Joi from "joi";
import { compare, hash } from "bcrypt";

import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";
import validateAsync from "@/utils/validateAsync";
import changePasswordSchema from "@/joi/changePasswordSchema";
export async function PUT(request) {
  const response = {};
  const data = await request.json();
  try {
    const record = await validateAsync(changePasswordSchema, data);
    if (record.errors) {
      response.error = true;
      response.message = response.errors;
    } else {
      const session = await getSession();
      const user = await prisma.users.findUnique({
        where: {
          id: Number(session.user.id),
        },
      });
      if (user) {
        const isPasswordValid = await compare(
          record.current_password,
          user.password
        );
        if (isPasswordValid) {
          const user = await prisma.users.update({
            data: {
              password: await hash(record.new_password, 10),
            },
            where: {
              id: Number(session.user.id),
            },
          });
          if (user) {
            response.success = true;
            response.message = "Password changed successfully.";
          }
        } else {
          response.error = true;
          response.message = {
            current_password: "Currnet password is invalid.",
          };
        }
      }
    }
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
