import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request, data) {
  let response = {};
  try {
    let deletedId = Number(data.params.id);
    if (deletedId) {
      const deleted = await prisma.group_members.delete({
        where: {
          id: deletedId,
        },
      });
      if (deleted) {
        response.success = true;
        response.message = "A member has been removed successfully.";
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
