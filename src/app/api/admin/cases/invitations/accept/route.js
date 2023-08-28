import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession } from "@/utils/serverHelpers";

import prisma from "@/utils/prisma";

export async function POST(request) {
  const session = await getSession();  
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
              user_id: session.user.id,
            },
          },
        },
      });
    }

    console.log(caseModel);

    if (caseModel) {
      if (caseModel?.case_invitations.length > 0) {
        if (caseModel?.case_invitations[0].status === 0) {
          await prisma.$transaction(async (tx) => {
                             
            const updateInvitation = await tx.case_invitations.update({
              data: {
                status: 1,
              },
              where: {
                id: caseModel.case_invitations[0].id,
              },
            });            
            response.success = true;
            response.message = "Invitation has been accepted successfully.";
          });
        } else {
          response.error = true;
          response.message = "You can not accept case.";
        }
      } else {
        response.error = true;
        response.message = "Your invitation not found.";
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
