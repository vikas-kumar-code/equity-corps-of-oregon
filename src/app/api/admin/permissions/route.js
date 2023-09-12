import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  let response = {};
  try {
    const routes = await prisma.routes.findMany({
      where: {
        parent_id: 0,
      },
      include: {
        children: true,
      },
    });

    response.success = true;
    response.message = "Questions list";
    response.records = routes;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
