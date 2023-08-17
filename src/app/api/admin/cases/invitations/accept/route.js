import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import common from "@/utils/common";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);
  let response = {};
  try {
    const data = await request.json();
    let caseModel = null;
    if (data?.id) {
      // Find case by id
      caseModel = await prisma.cases.findUnique({
        where: {
          id: parseInt(data?.id),
        },
        include: {
          case_invitations: {
            where: {
              status: {
                equals: 1, // select accepted case invitation
              },
            },
          },
        },
      });
    }

    if (caseModel && caseModel?.case_invitations.length <= 0) {
      await prisma.$transaction(async (tx) => {
        console.log("here-----");
        // First update all with expired.
        await tx.case_invitations.updateMany({
          data: {
            status: 2,
          },
          where: {
            case_id: {
              equals: caseModel.id,
            },
          },
        });

        // update accepted by id.
        const caseInvUserId = await tx.case_invitations.findFirst({
          where: {
            case_id: caseModel.id,
            user_id: caseModel.user_id,
          },
        });
        await tx.case_invitations.update({
          data: {
            status: 1,
          },
          where: {
            id: caseInvUserId.id,
          },
        });

        response.success = true;
        response.message = "Invitation has been accepted successfully.";
      });
    } else {
      response.error = true;
      response.message = "Selected case has been expired.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
