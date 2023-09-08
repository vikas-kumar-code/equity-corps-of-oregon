import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(request) {
  const response = {};
  const req = await request.json();
  let deletedId = Number(req.id);
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
