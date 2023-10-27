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
    // Filters
    let where = {};
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
        status: Number(request.get("status")),
      };
    }
    if (request.get("title")) {
      where = {
        ...where,
        title: {
          contains: request.get("title"),
        },
      };
    }
    if (request.get("eco_provider")) {
      where = {
        ...where,
        case_invitations: {
          some: {
            user: {
              is: {
                id: parseInt(request.get("eco_provider")),
              },
            },
          },
        },
      };
    }

    // if (request.get("reviewer")) {
    //   where = {
    //     ...where,
    //     case_invitations: {
    //       some: {
    //         user: {
    //           is: {
    //             id: parseInt(request.get("reviewer")),
    //           },
    //         },
    //       },
    //     },
    //   };
    // }
    records = await prisma.cases.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
      include: {
        case_invitations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        case_invoices: {
          where: {
            status: {
              gte: 1,
            },
          },
        },
        case_milestones: true,
        logs: true,
        case_documents: true,
      },
    });
    totalRecords = await prisma.cases.count({ where });
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
