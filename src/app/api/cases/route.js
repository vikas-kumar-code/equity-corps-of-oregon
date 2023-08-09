import common from "@/utils/common";
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
    // Filters
    let where = {
      status: 1,
    };
    if (request.get("case_number")) {
      where = {
        ...where,
        case_number: {
          contains: request.get("case_number"),
        },
      };
    }
    if (request.get("status")) {
      where = {
        ...where,
        status: request.get("status"),
      };
    }
    records = await prisma.cases.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
    });
    totalRecords = await prisma.cases.count({ where: where });
    // output response
    response.success = true;
    response.message = "Cases list";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
