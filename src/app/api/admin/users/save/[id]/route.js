import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import common from "@/utils/common";
import { hash } from "bcrypt";
import addUpdateUserSchema from "@/joi/addUpdateUserSchema";
import validateAsync from "@/utils/validateAsync";

const excludeFields = ["password", "verification_code", "code_valid_till"];

export async function GET(request, data) {
  const user = await prisma.users.findUnique({
    where: {
      id: Number(data.params.id),
    },
    include: {
      attorney_answers: {
        include: {
          question: true,
          answer: true,
        },
      },
    },
  });
  return NextResponse.json({
    success: true,
    user: common.excludeColumns(user, excludeFields),
  });
}

export async function PUT(request, data) {
  const response = {};
  const formData = await request.json();
  try {
    const validated = await validateAsync(addUpdateUserSchema, formData);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      let updateUser;
      if (validated.password) {
        updateUser = await prisma.users.update({
          data: {
            name: validated.name,
            email: validated.email,
            password: await hash(validated.password, 10),
            status: validated.status,
            role_id: validated.role_id,
            verified: validated.verified,
          },
          where: {
            id: Number(data.params.id),
          },
        });
      } else {
        updateUser = await prisma.users.update({
          data: {
            name: validated.name,
            email: validated.email,
            status: validated.status,
            role_id: validated.role_id,
            verified: validated.verified,
          },
          where: {
            id: Number(data.params.id),
          },
        });
      }
      if (updateUser) {
        response.success = true;
        response.message = "User updated successfully.";
      } else {
        response.success = true;
        response.message = "Something went wrong..! please try again.";
      }
    }
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
