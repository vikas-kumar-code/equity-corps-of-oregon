import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(request) {
  const response = {};
  const req = await request.json();
  const deletedId = Number(req.id);
  try {
    if (deletedId) {
      const deleted = await prisma.email_templates.delete({
        where: {
          id: deletedId,
        },
      });
      if (deleted) {
        response.success = true;
        response.message = "Template has been deleted successfully.";
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
