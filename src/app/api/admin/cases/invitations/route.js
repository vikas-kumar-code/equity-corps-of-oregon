import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import common from "@/utils/common";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  let records = [];
  let totalRecords = 0;
  let response = {};
  request = request.nextUrl.searchParams;
  try {
    const paginate = common.paginate(request);
    // Filters
    let where = {
      user_id: session.user.id,
    };
    /* if (request.get("case_number")) {
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
    } */
    where = {
      ...where,
    };
    records = await prisma.case_invitations.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
      include: {
        case: {
          include: {
            case_milestones: true,
            case_documents: true
          }
        },
      },
    });
    totalRecords = await prisma.case_invitations.count({ where: where });
    // output response
    response.success = true;
    response.message = "Case invitations list";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
