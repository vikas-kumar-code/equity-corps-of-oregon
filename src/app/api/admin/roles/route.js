import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const records = await prisma.roles.findMany({
    orderBy: [{ id: "desc" }],
  });
  return NextResponse.json({
    success: true,
    records: records,
  });
}
