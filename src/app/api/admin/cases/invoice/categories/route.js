import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  let response = {};
  try {
    response.records = await prisma.invoice_categories.findMany();
    response.success = true;
    response.message = "Invoice categories";
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
// for git push 
