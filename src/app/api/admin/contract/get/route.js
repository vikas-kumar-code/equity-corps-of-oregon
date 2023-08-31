import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
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
