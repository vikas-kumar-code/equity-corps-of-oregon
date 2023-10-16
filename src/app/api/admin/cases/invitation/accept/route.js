import { NextResponse } from "next/server";
import { getSession } from "@/utils/serverHelpers";
import prisma from "@/utils/prisma";
import Joi from "joi";
import validateAsync from "@/utils/validateAsync";

export async function POST(request) {
  const session = await getSession();
  let response = {};
  try {
    const data = await request.json();
    let caseInvitation = null;

    const schema = Joi.object({
      first_name: Joi.string().max(100).required(),
      last_name: Joi.string().max(100).required(),
    });

    const validated = await validateAsync(schema, data, {
      stripUnknown: true,
    });
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      if (data?.id) {
        // Find case by id
        caseInvitation = await prisma.case_invitations.findUnique({
          where: {
            id: parseInt(data?.id),
            user_id: session.user.id,
          },
          include: {
            case: true,
          },
        });
      }

      if (caseInvitation) {
        if (caseInvitation.status === 0) {
          await prisma.$transaction(async (tx) => {
            const updateInvitation = await tx.case_invitations.update({
              data: {
                first_name: validated.first_name,
                last_name: validated.last_name,
                status: 1,
              },
              where: {
                id: caseInvitation.id,
              },
            });
            if (updateInvitation) {
              // Updating case status 
              
              await tx.cases.update({
                where: {
                  id: caseInvitation?.case?.id,
                },
                data:{
                  status: 2
                }
              });

              response.success = true;
              response.message = "Invitation has been accepted successfully.";

              //  delete all pending invitations
              if (caseInvitation?.case) {
                await tx.case_invitations.deleteMany({
                  where: {
                    case_id: caseInvitation?.case?.id,
                    status: 0,
                  },
                });
                await tx.logs.create({
                  data: {
                    case_id: caseInvitation?.case?.id,
                    content:
                      "Case invitation accepted by " +
                      validated.first_name +
                      " " +
                      validated.last_name,
                  },
                });
              }
            } else {
              response.error = true;
              response.message = "Something went wrong. please try again.";
            }
          });
        } else {
          response.error = true;
          response.message = "You can not accept case.";
        }
      } else {
        response.error = true;
        response.message = "Record not found.";
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
