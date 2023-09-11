import common from "@/utils/common";
import { getSession } from "@/utils/serverHelpers";

import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request) {
  const session = await getSession();
  let response = {};
  const params = request.nextUrl.searchParams;
  try {
    if (params.get("id") && parseInt(params.get("id"))) {
      const caseModel = await prisma.cases.findUnique({
        where: {
          id: parseInt(params.get("id")),
        },
        include: {
          case_invitations: {
            where: {
              user_id: session.user.id,              
            },
          },
        },
      });
      if (caseModel && caseModel?.case_invitations[0]?.status === 1) {
        response.success = true;
        response.message = "Document signed successfully.";
      } else {
        response.success = false;
        response.message = "Document sign is pending.";
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
