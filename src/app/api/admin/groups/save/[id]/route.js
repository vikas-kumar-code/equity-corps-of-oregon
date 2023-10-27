import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function PUT(request, data) {
  let response = {};
  const recordId = Number(data.params.id);
  try {
    if (recordId) {
      const fields = await request.json();
      if (fields?.name) {
        const updateGroup = await prisma.groups.update({
          where: { id: recordId },
          data: {
            name: fields.name,
            description: fields?.description || "",
          },
        });
        if (updateGroup) {
          response.success = true;
          response.message = "Group udpated successfully.";
        }
      } else {
        response.error = true;
        response.message = "Group name can not be empty.";
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
