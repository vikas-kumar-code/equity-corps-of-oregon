
import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
export async function GET(request) {
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
