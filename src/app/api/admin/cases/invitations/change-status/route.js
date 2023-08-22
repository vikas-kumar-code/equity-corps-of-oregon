import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    let caseInvitation = null;
    const status = [0, 2]; // 1=> pending, 2=> cancelled

    if (data?.id) {
      caseInvitation = await prisma.case_invitations.findUnique({
        where: {
          id: parseInt(data?.id),
        },
      });
    }

    if (caseInvitation) {      
      if (status.includes(parseInt(data?.status))) {
        await prisma.$transaction(async (tx) => {
          const updateInvitation = await tx.case_invitations.update({
            data: {
              status: parseInt(data?.status),
            },
            where: {
              id: caseInvitation.id,
            },
          });
          response.success = true;
          response.message = "Invitation status has been changed.";
        });
      } else {
        response.error = true;
        response.message = "Invalid status submission.";
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
