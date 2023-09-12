import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  let records = [];  
  let response = {};
  const searchParams = request.nextUrl.searchParams;
  
  try {
    let where = {
      //status: 1,
    };
    if (searchParams.get("question")) {
      where = {
        ...where,
        question: {
          contains: searchParams.get("question"),
        },
      };
    }
    records = await prisma.questions.findMany({
      where,
      orderBy: [{ sequence: "asc" }],
    });    
    // output response
    response.success = true;
    response.message = "Questions list";
    response.records = records;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
