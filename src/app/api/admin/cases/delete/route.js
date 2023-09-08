import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import fs from "fs";
import path from "path";

export async function DELETE(request) {
  const response = {};
  const data = await request.json();
  const id = parseInt(data.id);
  try {
    if (id) {
      const docs = await prisma.cases.findUnique({
        where: { id },
        include: {
          case_documents: true,
        },
      });

      const deleted = await prisma.cases.delete({
        where: { id },
      });

      if (deleted) {
        if (Array.isArray(docs.case_documents)) {
          docs.case_documents.forEach((doc) => {
            const filePath = path.join(
              process.cwd(),
              "public",
              "uploads",
              "case_documents",
              doc.file_name
            );
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          });
        }
        response.success = true;
        response.message = "Case has been deleted successfully.";
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
