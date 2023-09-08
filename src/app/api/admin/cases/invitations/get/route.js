import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const response = {};
  const searchParams = request.nextUrl.searchParams;
  try {
    const caseInvitaion = await prisma.case_invitations.findUnique({
      where: {
        id: parseInt(searchParams.get('id')),
      },
    });
    response.success = true;
    response.message = "Case invitation details";
    response.record = caseInvitaion;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
