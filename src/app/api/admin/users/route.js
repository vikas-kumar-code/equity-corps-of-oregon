import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import common from "@/utils/common";
export async function GET(request) {
  let records = [];
  let totalRecords = 0;
  let response = {};
  const searchParams = request.nextUrl.searchParams;
  try {
    const paginate = common.paginate(searchParams);
    // Filters
    let where = {
      NOT: {
        id: 1,
      },
    };
    if (searchParams.get("name")) {
      where = {
        ...where,
        name: {
          contains: searchParams.get("name"),
        },
      };
    }
    if (searchParams.get("email")) {
      where = {
        ...where,
        email: {
          contains: searchParams.get("email"),
        },
      };
    }
    records = await prisma.users.findMany({
      where,
      ...paginate,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        on_board_status: true,
        created_at: true,
        role: true,
      },
      orderBy: [{ id: "desc" }],
    });
    totalRecords = await prisma.users.count({ where });
    // output response
    response.success = true;
    response.message = "Users List";
    response.records = records;
    response.totalRecords = totalRecords;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
