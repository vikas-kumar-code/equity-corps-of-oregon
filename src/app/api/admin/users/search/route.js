import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
export async function GET(request) {
  let where = {};
  if (request.nextUrl.searchParams.get("keyword")) {
    where = {
      ...where,
      name: {
        contains: request.nextUrl.searchParams.get("keyword"),
      },
    };
  }
  if (request.nextUrl.searchParams.get("role_id")) {
    where = {
      ...where,
      role_id: { in: JSON.parse(request.nextUrl.searchParams.get("role_id")) },
    };
  }

  const records = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: { ...where },
    orderBy: [{ name: "asc" }],
  });
  return NextResponse.json({
    success: true,
    records: JSON.stringify(records, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    ),
  });
}
