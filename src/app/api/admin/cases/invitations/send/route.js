import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendInvitationSchema } from "@/joi/casesSchema";
import common from "@/utils/common";
import sendMail from "@/utils/sendMail";

const prisma = new PrismaClient();

export async function POST(request) {
  let response = {};
  try {
    const data = await sendInvitationSchema.validateAsync(
      await request.json(),
      {
        abortEarly: false,
      }
    );
    const caseModel = await prisma.cases.findUnique({
      where: {
        id: data.case_id,
      },
      include: {
        case_invitations: true,
      },
    });
    const usersModel = await prisma.users.findMany({
      where: {
        id: {
          in: data.users,
        },
        role_id: 3, // Eco providers
      },
    });

    if (caseModel) {
      if (usersModel) {
        await prisma.$transaction(async (tx) => {
          // Select already exists invitations for given case_id
          let activeInvitations = await tx.case_invitations.findMany({
            where: {
              case_id: data.case_id,
              user_id: {
                in: data.users,
              },              
            },
          });

          let createInvUsers = usersModel;
          // Filter new users
          if (activeInvitations && activeInvitations.length > 0) {
            let activeUsers = activeInvitations.map((item) => item.user_id);
            createInvUsers = createInvUsers.filter(
              (item) => !activeUsers.includes(item.id)
            );
          }

          // Add Entry of only new users
          await tx.case_invitations.createMany({
            data: createInvUsers.map((user) => {
              return {
                case_id: data.case_id,
                user_id: user.id,
              };
            }),
          });
          
          // Email will be sent to all requested users
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
        response.message = "The selected users are not valid.";
      }
    } else {
      response.error = true;
      response.message = "Selected case not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
