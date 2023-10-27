import { NextResponse } from "next/server";

import common from "@/utils/common";
import sendMail from "@/utils/sendMail";

import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    let data = await request.json();

    const groupsModel = await prisma.group_members.findMany({
      where: {
        group_id: {
          in: data?.groups,
        },
      },
    });
    if(groupsModel){
      for(let i=0; i<groupsModel.length; i++){
        data.users.push(groupsModel[i].user_id)
      }
      data.users = data.users.filter((value, index, arr) => {
        return arr.indexOf(value) === index;
      });
    }

    const caseModel = await prisma.cases.findUnique({
      where: {
        id: data?.case_id,
      },
      include: {
        case_invitations: true,
      },
    });

    const caseData = await prisma.cases.findUnique({
      where: {
        id: data?.case_id,
      },
      select: {
        status: true,
      },
    });

    const usersModel = await prisma.users.findMany({
      where: {
        id: {
          in: data?.users,
        },
        role_id: {
          in: [3, 4],
        }, // Eco providers
      },
    });

    const contract = await prisma.contracts.findUnique({ where: { id: 1 } });
    if (contract) {
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
                  contract: contract.content,
                };
              }),
            });
            const userNames = createInvUsers.map((user) => user.name);
            await tx.logs.create({
              data: {
                case_id: caseModel.id,
                content: `Invitation sent to ${userNames.join(", ")}`,
              },
            });
            // Email will be sent to all requested users
            await createInvUsers.forEach(async (user) => {
              const mail = await sendMail({
                to: user.email,
                templateId: common.params.templateId.sendCaseInvitation,
                modelsData: {
                  users: user,
                  cases: caseModel,
                },
              });
              console.log(mail, "Mail dataaaaaaaaaaaaaa");
            });

            if (caseData.status < 2) {
              await prisma.cases.update({
                where: {
                  id: data?.case_id,
                },
                data: {
                  status: 1,
                },
              });
            }

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
    } else {
      response.error = true;
      response.message = "Please update contract details.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
