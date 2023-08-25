import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// ----
const prisma = new PrismaClient();
export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: "Question list",
    records: await prisma.questions.findMany({
      where: {
        status: true,
      },
      orderBy: [{ sequence: "asc" }],
      include: {
        options: true,
      },
    }),
  });
}

export async function PUT(request) {
  return NextResponse.json({
    success: true,
    message: "Question list",
    records: await prisma.questions.findMany({
      where: {
        status: true,
      },
      orderBy: [{ id: "desc" }],
      include: {
        options: true,
      },
    }),
  });
}
