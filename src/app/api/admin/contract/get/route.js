import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path');
  revalidatePath(path)
  let response = {};
  try {
    const contract = await prisma.contracts.findUnique({
      where: {
        id: 1,
      },
    });
    response.success = true;
    response.message = "Contract Content";
    response.record = contract;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
