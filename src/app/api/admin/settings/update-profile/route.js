import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";
import validateAsync from "@/utils/validateAsync";
import updateProfileSchema from "@/joi/updateProfileSchema";

export async function GET() {
  const response = {};
  const session = await getSession();
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        name: true,
        email: true,
      },
    });
    if (user) {
      response.success = true;
      response.record = user;
    }
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}

export async function PUT(request) {
  const response = {};
  const session = await getSession();
  const formData = await request.json();
  try {
    const validated = await validateAsync(updateProfileSchema, formData);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const user = await prisma.users.update({
        data: {
          name: validated.name,
          email: validated.email,
        },
        where: {
          id: Number(session.user.id),
        },
      });
      if (user) {
        response.success = true;
        response.message = "Profile updated successfully.";
      }
    }
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
