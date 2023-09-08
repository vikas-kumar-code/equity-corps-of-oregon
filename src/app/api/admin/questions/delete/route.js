import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(request) {
  const response = {};
  const data = await request.json();
  let id = parseInt(data.id);
  try {
    if (id) {
      const deleted = await prisma.questions.delete({
        where: { id },
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
