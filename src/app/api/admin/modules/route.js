import { getSession } from "@/utils/serverHelpers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request) {
  const session = await getSession();
  let response = {};
  try {
    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
    });
    const permissions = await prisma.permissions.findMany({
      where: {
        role_id: user.role_id,
      },
    });
    let routeIds = permissions.map((item) => item.route_id);
    let where = {
      parent_id: {
        lte: 0,
      },
      id: {
        in: routeIds,
      },
    };

    if (parseInt(session.user.role_id) === 1) {
      where = {
        parent_id: {
          lte: 0,
        },
      };
    }

    const records = await prisma.routes.findMany({
      where,
    });
    // output response
    response.success = true;
    response.message = "Modules";
    response.records = records;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
