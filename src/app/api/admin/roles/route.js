import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path');
  const records = await prisma.roles.findMany({
    orderBy: [{ id: "desc" }],
  });
  return NextResponse.json({
    success: true,
    records: records,
  });
}

export const dynamic = 'force-dynamic'
