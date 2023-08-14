import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendInvitationSchema } from "@/joi/casesSchema";
import common from "@/utils/common";
import sendMail from "@/utils/sendMail";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);
  let response = {};
  try {
    const data = await request.json();

    let caseModel = null;
    if (parseInt(data?.id)) {
      caseModel = await prisma.cases.findUnique({
        where: {
          id: parseInt(data?.id),
        },
        include: {
          case_invitations: {
            where: {
              status: {
                equals: 1, // Accepted
              },
            },
          },
        },
      });
    }

    if (caseModel) {
      if (usersModel) {
        if (!isAccepted) {
          await prisma.$transaction(async (tx) => {
            let activeInvitations = await tx.case_invitations.findMany({
              where: {
                case_id: data.case_id,
                user_id: {
                  in: data.users,
                },
                status: 0,
              },
            });

            let createInvUsers = usersModel;
            if (activeInvitations && activeInvitations.length > 0) {
              let activeUsers = activeInvitations.map((item) => item.id);
              createInvUsers = createInvUsers.filter(
                (item) => !activeUsers.includes(item.id)
              );
            }

            // Entry invited users
            await tx.case_invitations.createMany({
              data: createInvUsers.map((user) => {
                return {
                  case_id: data.case_id,
                  user_id: user.id,
                };
              }),
            });
            // Send mail to invite eco providers
            await usersModel.forEach(async (user) => {
              await sendMail({
                to: process.env.TEST_USER_EMAIL || user.email,
                templateId: common.params.templateId.sendCaseInvitation,
                modelsData: {
                  users: user,
                  cases: caseModel,
                },
              });
            });
            response.success = true;
            response.message = "Invitation has been sent successfully.";
          });
        } else {
          response.error = true;
          response.message =
            "This case has already been assigned an echo provider.";
        }
      } else {
        response.error = true;
        response.message = "The selected users are not valid.";
      }
    } else {
      response.error = true;
      response.message = "Selected case has been expired.";
    }
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
