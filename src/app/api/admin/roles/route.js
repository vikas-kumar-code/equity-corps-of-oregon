import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path');
  revalidatePath(path)
  const records = await prisma.roles.findMany({
    orderBy: [{ id: "desc" }],
  });
  return NextResponse.json({
    success: true,
    records: records,
  });
}
