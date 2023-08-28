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
    where = {
      ...where,
      case_invitations: {
        some: {
          user_id: {
            equals: session.user.id,
          },
        },
      },
    };
    records = await prisma.cases.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
      include: {
        case_invitations: {
          where: {
            user_id: session.user.id,
          },
        },
      },
    });
    totalRecords = await prisma.cases.count({ where: where });
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
