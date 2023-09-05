import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import fs from "fs";
import path from "path";

export async function DELETE(request, data) {
  let response = {};
  let deletedId = Number(data.params.id);
  try {
    if (deletedId) {
      const docs = await prisma.cases.findUnique({
        where: {
          id: deletedId,
        },
        include: {
          case_documents: true,
        },
      });

      const deleted = await prisma.cases.delete({
        where: {
          id: deletedId,
        },
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
