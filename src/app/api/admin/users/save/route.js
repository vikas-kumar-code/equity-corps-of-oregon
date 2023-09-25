import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/utils/prisma";
import addUpdateUserSchema from "@/joi/addUpdateUserSchema";
import validateAsync from "@/utils/validateAsync";

export async function POST(request) {
  const response = {};
  const formData = await request.json();
  try {
    const validated = await validateAsync(addUpdateUserSchema, formData);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const newUser = await prisma.users.create({
        data: {
          name: validated.name,
          email: validated.email,
          password: await hash(validated.password, 10),
          status: validated.status,
          role_id: validated.role_id,
          on_board_status: 2,
          verified: validated.verified,
        },
      });
      if (newUser) {
        response.success = true;
        response.message = "New user added successfully.";
      } else {
        response.error = true;
        response.message = "Something went wrong..! please try again.";
      }
    }
  } catch (err) {
    if (err.code === "P2002") {
      response.error = true;
      response.message = { email: "Email already exists." };
    }
  }
  return NextResponse.json(response);
}
