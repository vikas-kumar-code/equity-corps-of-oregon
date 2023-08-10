import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, data) {
  let response = {};
  try {
    const record = await prisma.email_templates.findUnique({
      where: {
        id: Number(data.params.id),
      }
    });
    if (record) {
      response.success = true;
      response.data = record;
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
