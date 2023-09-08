import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(request) {
  const response = {};
  const data = await request.json();
  const id = parseInt(data.id);
  try {
    if (id) {
      const deleted = await prisma.email_templates.delete({
        where: { id },
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
