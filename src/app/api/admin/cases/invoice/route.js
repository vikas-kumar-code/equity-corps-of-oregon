import common from "@/utils/common";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  let records = [];
  let totalRecords = 0;
  let response = {};
  const searchParams = request.nextUrl.searchParams;
  try {
    const paginate = common.paginate(request);
    let where = {
      //status: 1,
    };

    if (searchParams.get("case_id")) {
      where = {
        ...where,
        case: {
          is: {
            id: searchParams.get("case_id"),
          },
        },
      };
    }

    if (searchParams.get("case_number")) {
      where = {
        ...where,
        case: {
          is: {
            case_number: searchParams.get("case_number"),
          },
        },
      };
    }

    if (searchParams.get("case_title")) {
      where = {
        ...where,
        case: {
          is: {
            title: searchParams.get("case_title"),
          },
        },
      };
    }

    totalRecords = await prisma.case_invoices.count({ where });

    records = await prisma.case_invoices.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
    });

    // output response
    response.success = true;
    response.message = "Case invoices";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
