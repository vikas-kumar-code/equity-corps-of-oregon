import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { hash } from "bcrypt";

export async function POST(request) {
  const prisma = new PrismaClient();
  const user = await request.json();
  const userSchema = Joi.object({
    name: Joi.required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    confirm_password: Joi.ref("password"),
    status: Joi.number().required(),
    role_id: Joi.number(),
  });

  try {
    const record = await userSchema.validateAsync(user);
    if (record) {
      const response = await prisma.users.create({
        data: {
          name: record.name,
          email: record.email,
          password: await hash(record.password, 10),
          status: record.status,
          role_id: record.role_id,
          /* role: {
            create: {
              name: "VK Role",
              status: 1,
            },
          }, */
        },
      });
      if (response) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: true });
      }
    }
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json({
        error: true,
        message: { email: "Email already exists." },
      });
    }
    return NextResponse.json({ error: true, message: err.message });
  }
}
