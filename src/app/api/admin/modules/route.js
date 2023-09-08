import { getSession } from "@/utils/serverHelpers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const session = await getSession();
  const response = {};
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
      parent_id: 0,
      id: {
        in: routeIds,
      },
      NOT: {
        url: {
          contains: "/api",
        },
      },
    };

    // Exclude routes for Admin
    if (parseInt(session.user.role_id) === 1) {
      let excludeRoutes = ["/admin/case-invitations"];
      where = {
        parent_id: {
          lte: 0,
        },
        NOT: {
          url: {
            in: excludeRoutes,
          },
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
