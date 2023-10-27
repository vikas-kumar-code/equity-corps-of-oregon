import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  const response = {};
  try {
    let data = await request.json();
    const user_id = Number(data.user_id);
    const group_id = Number(data.group_id);
    
    if (user_id && group_id) {
      const groupModel = await prisma.groups.findUnique({
        where: {
          id: group_id,
        },
        include: { group_members: true },
      });

      if (groupModel && groupModel.group_members.length > 0) {
        if (groupModel.group_members.find((item) => item.user_id === user_id)) {
          response.error = true;
          response.message = "This member has already been added.";
          return NextResponse.json(response);
        }
      }

      const addMember = await prisma.group_members.create({
        data: {
          group_id,
          user_id,
        },
      });

      if(addMember){
        response.success = true;
        response.message = 'A member has been added successfully.';
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
