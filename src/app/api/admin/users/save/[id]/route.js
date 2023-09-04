import { NextResponse } from "next/server";
import Joi from "joi";
import prisma from "@/utils/prisma";
import common from "@/utils/common";
import { hash } from "bcrypt";

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
    user: common.exclude(user, excludeFields),
  });
}

export async function PUT(request, data) {
  const user = await request.json();
  const userSchema = Joi.object({
    name: Joi.required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    confirm_password: Joi.ref("password"),
    status: Joi.number().required(),
    role_id: Joi.number(),
  });

  try {
    const record = await userSchema.validateAsync(user, { stripUnknown: true });
    if (record) {
      let response;
      if (record.password) {
        response = await prisma.users.update({
          data: {
            name: record.name,
            email: record.email,
            password: await hash(record.password, 10),
            status: record.status,
            role_id: record.role_id,
          },
          where: {
            id: Number(data.params.id),
          },
        });
      } else {
        response = await prisma.users.update({
          data: {
            name: record.name,
            email: record.email,
            status: record.status,
            role_id: record.role_id,
          },
          where: {
            id: Number(data.params.id),
          },
        });
      }
      if (response) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: true });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
}
