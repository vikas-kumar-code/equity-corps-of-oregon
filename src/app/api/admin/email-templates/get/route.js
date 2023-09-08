import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request) {
  const response = {};
  const data = await request.json();
  const id = parseInt(data.id);
  try {
    const record = await prisma.email_templates.findUnique({
      where: { id },
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
