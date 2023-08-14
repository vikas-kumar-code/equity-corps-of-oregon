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
    });
    const usersModel = await prisma.users.findMany({
      where: {
        id: {
          in: data.users,
        },
        role_id: 3,
      },
    });
    if (caseModel) {
      if (usersModel) {
        await prisma.$transaction(async (tx) => {
          // Entry invited users
          await tx.case_invitations.createMany({
            data: usersModel.map((user) => {
              return {
                case_id: data.case_id,
                user_id: user.id,
              };
            }),
          });
          // Send mail to invite eco providers
          await usersModel.forEach(async (user) => {
            await sendMail({
              to: "vishalkumarmx@gmail.com",
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
      response.message = "Selected case is not valid.";
    }
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
