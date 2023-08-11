import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(request) {
  try {
    const query = request.nextUrl.searchParams;
    let searchRecords = [];
    if (query.get("search-type")) {
      let where = {};
      if (query.get("name")) {
        where = {
          ...where,
          name: {
            contains: query.get("name"),
          },
        };
      }
      if (query.get("email")) {
        where = {
          ...where,
          email: {
            contains: query.get("email"),
          },
        };
      }
      if (query.get("search-type") == "asyc-select-eco-providers") {
        console.log('asfdasdf');
        where = { ...where, role_id: 3 };
        searchRecords = await prisma.users.findMany({
          take: 20, 
          where: { ...where },
        });
      }
    }
    return NextResponse.json({
      success: true,
      message: "Users search list",
      data: searchRecords,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
