import common from "@/app/utils/common";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request) {
  let records = [];
  let totalRecords = 0;
  let response = {};
  request = request.nextUrl.searchParams;
  try {
    const paginate = common.paginate(request);
    let where = {
      //status: 1,
    };
    if (request.get("question")) {
      where = {
        ...where,
        question: {
          contains: request.get("question"),
        },
      };
    }
    records = await prisma.questions.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
    });
    totalRecords = await prisma.questions.count({ where: where });
    // output response
    response.success = true;
    response.message = "Questions list";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
