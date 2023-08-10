import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function DELETE(request, data) {
  const prisma = new PrismaClient();
  let response = {};
  let deletedId = Number(data.params.id);
  try {
    if (deletedId) {
      const deleted = await prisma.questions.delete({
        where: {
          id: deletedId,
        },
      });
      if (deleted) {
        response.success = true;
        response.message = "Question has been deleted successfully.";
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
