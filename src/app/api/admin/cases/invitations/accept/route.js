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
      caseModel = await prisma.cases.findUnique({
        where: {
          id: parseInt(data?.id),
        },
        include: {
          case_invitations: {
            where: {
              status: {
                equals: 1, // it means already accepted
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
        await tx.case_invitations.update({
          data: {
            status: 2,
          },
          where: {
            case_id: {
              equals: caseModel.id,
            },
          },
        });

        // First update one with accepted.
        await tx.case_invitations.update({
          data: {
            status: 1,
          },
          where: {
            case_id: caseModel.id,
            user_id: caseModel.user_id,
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
