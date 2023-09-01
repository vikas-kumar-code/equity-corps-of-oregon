import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/utils/prisma";
import sendMail from "@/utils/sendMail";
import common from "@/utils/common";

/* 
  This function is used for on board attorney.
  This function generates a 10 digit random password and sends it to the user's email id.
  Once the user is logged in, on-boarding process will be completed.

  This function is also being used to resend on-board email.
*/
export async function POST(request) {
  const data = await request.json();
  const response = {};
  const { userId, resend } = data;
  try {
    if (userId) {
      const user = await prisma.users.findUnique({
        where: {
          id: parseInt(userId),
        },
      });
      if (user) {
        if (user.on_board_status !== 2) {
          if (user.status === 1) {
            const generatedPassword = generateRandomPassword(10);
            const userUpdate = await prisma.users.update({
              where: {
                id: parseInt(userId),
              },
              data: {
                password: await hash(generatedPassword, 10),
                on_board_status: 1,
              },
            });
            if (userUpdate) {
              const onBoardEmail = await sendMail({
                to: user.email,
                templateId: common.params.templateId.attorneyOnBoard,
                modelsData: {
                  users: user,
                  password: generatedPassword,
                },
              });

              if (onBoardEmail == true) {
                response.success = true;
                if (resend) {
                  response.message =
                    "On board mail have been sent back to the user.";
                } else {
                  response.message = "On board mail sent to user's email";
                }
              } else {
                response.error = true;
                response.message = onBoardEmail;//"Failed to send mail.";
              }
            } else {
              response.error = true;
              response.message = "Something went wrong. please try again.";
            }
          } else {
            response.error = true;
            response.message = "Please change the user's status. set 'Active'";
          }
        } else {
          response.error = true;
          response.message = "User is already on-boarded.";
        }
      } else {
        response.error = true;
        response.message = "Record not found.";
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

const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};
