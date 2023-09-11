import common from "@/utils/common";

import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
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
    if (request.get("subject")) {
      where = {
        ...where,
        subject: {
          contains: request.get("subject"),
        },
      };
    }
    records = await prisma.email_templates.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
    });
    totalRecords = await prisma.email_templates.count({ where });
    // output response
    response.success = true;
    response.message = "Email Template list";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
