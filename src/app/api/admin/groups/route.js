import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  let records = [];
  let response = {};
  try {
    records = await prisma.groups.findMany({
      orderBy: [{ sequence: "asc" }],
      include: {
        group_members: {
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
      },
    });
    response.success = true;
    response.records = records;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
