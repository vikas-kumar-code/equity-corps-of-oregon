import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    if (data?.id) {
      const caseInvitation = await prisma.case_invitations.delete({
        where: {
          id: parseInt(data?.id),
        },
      });
      response.success = true;
      response.message = "Invitation cancelled successfully.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
