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
  const searchParams = request.nextUrl.searchParams;
  try {
    const paginate = common.paginate(request);
    // Filters
    let is = searchParams.get("case_number")
      ? {
          case_number: {
            contains: searchParams.get("case_number"),
          },
        }
      : {};
    is = searchParams.get("case_title")
      ? { ...is, title: { contains: searchParams.get("case_title") } }
      : is;

    let where = {
      user_id: session.user.id,
      case: {
        is,
      },
    };

    records = await prisma.case_invitations.findMany({
      where,
      ...paginate,
      orderBy: [{ id: "desc" }],
      include: {
        case: {
          include: {
            case_milestones: true,
            case_documents: true,
            logs: {
              orderBy: { id: "desc" },
            },
          },
        },
      },
    });
    totalRecords = await prisma.case_invitations.count({ where });
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
