import { NextResponse } from "next/server";
import { getSession } from "@/utils/serverHelpers";
import prisma from "@/utils/prisma";
import Joi from "joi";
import common from "@/utils/common";

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
    const fields = await schema.validateAsync(data, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

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
              first_name: fields.first_name,
              last_name: fields.last_name,
              status: 1,
            },
            where: {
              id: caseInvitation.id,
            },
          });
          if (updateInvitation) {
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
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
