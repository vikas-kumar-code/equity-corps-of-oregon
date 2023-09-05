import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request, data) {
  const deleted = await prisma.users.delete({
    where: {
      id: Number(data.params.id),
    },
  });
  if (deleted) {
    return NextResponse.json({
      success: true,
      message: "User has been deleted successfully.",
    });
  } else {
    return NextResponse.json({
      error: true,
      message: "Record not found.",
    });
  }
}
