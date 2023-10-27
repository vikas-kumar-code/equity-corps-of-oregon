import { getSession } from "@/utils/serverHelpers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const response = {};
  try {
    const session = await getSession();
    let modules = null;
    let records = [];

    const adminModules = [
      "/admin/dashboard",
      "/admin/cases",
      "/admin/questions",
      "/admin/users",
      "/admin/email-templates",
      "/admin/roles",
      "/admin/groups",
      "/admin/settings",
    ];

    const ecoProviderModules = [
      // "/admin/dashboard",
      "/admin/case-invitations",
      "/admin/settings",
    ];

    const reviewerModules = [
      // "/admin/dashboard",
      "/admin/case-invitations",
      "/admin/settings",
    ];

    // Exclude routes for Admin
    if (parseInt(session.user.role_id) === 1) {
      modules = adminModules;
    } else if (parseInt(session.user.role_id) === 3) {
      modules = ecoProviderModules;
    }else if (parseInt(session.user.role_id) === 4) {
      modules = reviewerModules;
    }

    if (modules) {
      records = await prisma.routes.findMany({
        where: {
          url: { in: modules },
        },
      });
    }

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

export const dynamic = 'force-dynamic'
